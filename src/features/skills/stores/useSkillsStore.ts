import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { z } from 'zod';
import { toast } from 'sonner';

// Zod schemas for validation
const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().nullable(),
});

const UserSkillSchema = z.object({
  id: z.string(),
  skill_id: z.string(),
  user_id: z.string(),
  display_order: z.number(),
  endorsement_count: z.number(),
  skills: SkillSchema,
});

type UserSkill = z.infer<typeof UserSkillSchema>;

interface SkillsState {
  userSkills: UserSkill[];
  loading: boolean;
  fetchUserSkills: (userId: string) => Promise<void>;
  addSkill: (userId: string, skillId: string) => Promise<void>;
  removeSkill: (userId: string, skillId: string) => Promise<void>;
  updateSkillOrder: (userId: string, skills: UserSkill[]) => Promise<void>;
}

export const useSkillsStore = create<SkillsState>((set, get) => {
  const supabase = createClient();

  return {
    userSkills: [],
    loading: false,

    fetchUserSkills: async (userId: string) => {
      if (!userId) {
        console.error('No userId provided');
        return;
      }

      try {
        set({ loading: true });
        console.log('Fetching skills for user:', userId);

        const { data, error } = await supabase
          .from('user_skills')
          .select(
            `
            id,
            skill_id,
            user_id,
            display_order,
            endorsement_count,
            skills (
              id,
              name,
              category
            )
          `
          )
          .eq('user_id', userId)
          .order('display_order');

        if (error) {
          console.error('Supabase error details:', error);
          toast.error(`Failed to fetch skills: ${error.message}`);
          return;
        }

        if (!data) {
          set({ userSkills: [] });
          return;
        }

        const validatedData = z.array(UserSkillSchema).safeParse(data);

        if (!validatedData.success) {
          console.error('Validation error:', validatedData.error);
          toast.error('Data validation failed');
          return;
        }

        set({ userSkills: validatedData.data });
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      } finally {
        set({ loading: false });
      }
    },

    addSkill: async (userId: string, skillId: string) => {
      const { userSkills } = get();
      try {
        // Check if maximum skills limit is reached
        if (userSkills.length >= 5) {
          toast.error('Maximum limit of 5 skills reached');
          return;
        }

        const maxOrder =
          userSkills.length > 0
            ? Math.max(...userSkills.map((s) => s.display_order))
            : -1;

        const { data, error } = await supabase
          .from('user_skills')
          .insert({
            user_id: userId,
            skill_id: skillId,
            display_order: maxOrder + 1,
            endorsement_count: 0,
          })
          .select(
            `
            id,
            skill_id,
            user_id,
            display_order,
            endorsement_count,
            skills (
              id,
              name,
              category
            )
          `
          )
          .single();

        if (error) {
          toast.error(`Failed to add skill: ${error.message}`);
          return;
        }

        const validatedSkill = UserSkillSchema.parse(data);
        set({ userSkills: [...userSkills, validatedSkill] });
      } catch (error) {
        console.error('Error in addSkill:', error);
        toast.error('Failed to add skill');
      }
    },

    removeSkill: async (userId: string, skillId: string) => {
      try {
        console.log('Removing skill:', { userId, skillId });

        // Direct delete attempt with logging
        const { data, error } = await supabase
          .from('user_skills')
          .delete()
          .eq('id', skillId)
          .select();

        console.log('Delete response:', { data, error });

        if (error) {
          console.error('Delete error:', error);
          toast.error('Failed to delete skill');
          return;
        }

        // Log the affected rows
        if (data && Array.isArray(data)) {
          console.log('Deleted rows:', data.length);
        }

        // Update local state
        const { userSkills } = get();
        const updatedSkills = userSkills.filter(
          (skill) => skill.id !== skillId
        );
        console.log('Updated skills:', updatedSkills);

        set({ userSkills: updatedSkills });
        toast.success('Skill deleted');
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('Failed to delete skill');
      }
    },

    updateSkillOrder: async (userId: string, skills: UserSkill[]) => {
      try {
        // Update local state immediately for smooth UI
        set({ userSkills: skills });

        // Prepare the updates with new display_order values
        const updates = skills.map((skill, index) => ({
          id: skill.id,
          user_id: userId,
          display_order: index,
          skill_id: skill.skill_id,
          endorsement_count: skill.endorsement_count,
        }));

        // Update all skills in a single transaction
        const { error } = await supabase.from('user_skills').upsert(updates, {
          onConflict: 'id',
          ignoreDuplicates: false,
        });

        if (error) {
          console.error('Error updating skill order:', error);
          toast.error('Failed to save skill order');
          // Fetch the original order if update fails
          await fetchUserSkills(userId);
          return;
        }

        toast.success('Skill order updated');
      } catch (error) {
        console.error('Error in updateSkillOrder:', error);
        toast.error('Failed to update skill order');
        // Fetch the original order if update fails
        await fetchUserSkills(userId);
      }
    },
  };
});
