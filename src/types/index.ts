import { SupabaseClient } from '@supabase/supabase-js';

// Base entity type with common fields
interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Entity Types
export type Profile = {
  id: string;
  username: string | null;
  path: string | null;
  description: string | null;
  profile_image_url: string | null;
  email: string | null;
  phone: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  x_url: string | null;
  github_url: string | null;
  updated_at: string;
  created_at: string;
};

export interface Stack extends BaseEntity {
  stack_name: string;
  path: string;
  meta_description: string | null;
  long_description: string | null;
  icon: string | null;
  og_image: string | null;
}

export interface Category extends BaseEntity {
  category_name: string;
  path: string;
  meta_description: string | null;
  long_description: string | null;
  icon: string | null;
  og_image: string | null;
  stack_id: string | null;
}

export interface Template extends BaseEntity {
  template_name: string;
  path: string;
  category_id: string | null;
  stack_id: string | null;
  user_id: string;
  featured: boolean;
  template_link: string | null;
  meta_title: string | null;
  meta_description: string | null;
  long_description: string | null;
  og_image_url: string | null;
  thumbnail_image_url: string | null;
}

export interface Project extends BaseEntity {
  project_name: string;
  path: string;
  stack_id: string | null;
  user_id: string;
  project_link: string | null;
  meta_title: string | null;
  meta_description: string | null;
  long_description: string | null;
  og_image_url: string | null;
}

export interface Service extends BaseEntity {
  service_name: string;
  path: string;
  stack_id: string | null;
  user_id: string;
  project_id: string | null;
  template_id: string | null;
  featured: boolean;
  price: number;
  meta_title: string | null;
  meta_description: string | null;
  long_description: string | null;
  og_image_url: string | null;
}

export interface ProjectCount extends BaseEntity {
  user_id: string;
  project_count: number;
}

export interface ServiceCount extends BaseEntity {
  user_id: string;
  service_count: number;
}

// Database schema types
export type Tables = {
  profiles: {
    Row: Profile;
    Insert: Omit<Profile, 'created_at' | 'updated_at'>;
    Update: Partial<Omit<Profile, 'id'>>;
  };
  stacks: {
    Row: Stack;
    Insert: Omit<Stack, 'id' | 'created_at' | 'updated_at'> & {
      path?: string;
      stack_name: string;
    };
    Update: Partial<Omit<Stack, 'id' | 'path'>>;
  };
  categories: {
    Row: Category;
    Insert: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'path'>;
    Update: Partial<Omit<Category, 'id' | 'path'>>;
  };
  templates: {
    Row: Template;
    Insert: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'path'>;
    Update: Partial<Omit<Template, 'id' | 'path'>>;
  };
  projects: {
    Row: Project;
    Insert: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'path'>;
    Update: Partial<Omit<Project, 'id' | 'path'>>;
  };
  services: {
    Row: Service;
    Insert: Omit<Service, 'id' | 'created_at' | 'updated_at' | 'path'>;
    Update: Partial<Omit<Service, 'id' | 'path'>>;
  };
  project_counts: {
    Row: ProjectCount;
    Insert: Omit<ProjectCount, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<ProjectCount, 'id'>>;
  };
  service_counts: {
    Row: ServiceCount;
    Insert: Omit<ServiceCount, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<ServiceCount, 'id'>>;
  };
};

export type Schema = {
  public: {
    Tables: Tables;
  };
};

export type SupabaseDatabase = SupabaseClient<Schema>;

// Helper types for database results
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;

// Helper types for form inputs
export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type StackFormData = Omit<
  Stack,
  'id' | 'created_at' | 'updated_at' | 'path'
>;
export type CategoryFormData = Omit<
  Category,
  'id' | 'created_at' | 'updated_at' | 'path'
>;
export type TemplateFormData = Omit<
  Template,
  'id' | 'created_at' | 'updated_at' | 'path'
>;
export type ProjectFormData = Omit<
  Project,
  'id' | 'created_at' | 'updated_at' | 'path'
>;
export type ServiceFormData = Omit<
  Service,
  'id' | 'created_at' | 'updated_at' | 'path'
>;
