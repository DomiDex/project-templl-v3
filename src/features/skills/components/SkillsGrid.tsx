'use client';

import { useEffect } from 'react';
import SkillCard from './SkillCard';
import { toast } from 'sonner';
import SkillSelector from './SkillSelector';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useSkillsStore } from '../stores/useSkillsStore';

interface SkillsGridProps {
  userId: string;
}

export default function SkillsGrid({ userId }: SkillsGridProps) {
  const {
    userSkills,
    loading,
    fetchUserSkills,
    addSkill,
    removeSkill,
    updateSkillOrder,
  } = useSkillsStore();

  useEffect(() => {
    if (userId) {
      fetchUserSkills(userId).catch((error) => {
        console.error('Error fetching skills:', error);
        toast.error('Failed to load skills');
      });
    }
  }, [userId, fetchUserSkills]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = userSkills.findIndex((skill) => skill.id === active.id);
      const newIndex = userSkills.findIndex((skill) => skill.id === over.id);

      const newSkills = arrayMove(userSkills, oldIndex, newIndex);
      updateSkillOrder(userId, newSkills);
    }
  };

  const handleAddSkill = async (skillId: string) => {
    try {
      await addSkill(userId, skillId);
      toast.success('Skill added successfully');
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    console.log('SkillsGrid handling remove for skill:', skillId);
    if (!userId || !skillId) {
      console.error('Missing userId or skillId');
      return;
    }

    try {
      await removeSkill(userId, skillId);
    } catch (error) {
      console.error('Error in handleRemoveSkill:', error);
      toast.error('Failed to remove skill');
    }
  };

  if (loading) {
    return (
      <div className='flex gap-4 flex-wrap'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='animate-pulse bg-gray-200 dark:bg-gray-700 h-12 w-32 rounded-full'
          />
        ))}
      </div>
    );
  }

  if (userSkills.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg'>
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
            No Skills Added Yet
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            Add your first skill to showcase your expertise
          </p>
          <SkillSelector
            onSelect={handleAddSkill}
            existingSkills={userSkills}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext
          items={userSkills}
          strategy={horizontalListSortingStrategy}
        >
          <div className='flex flex-wrap gap-2'>
            {userSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onRemove={() => handleRemoveSkill(skill.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <SkillSelector onSelect={handleAddSkill} existingSkills={userSkills} />
    </div>
  );
}
