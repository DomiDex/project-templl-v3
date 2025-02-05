## To Do List

- [*] Add a new project form
- [*] Add a new service form
- [*] Add a new template form
- [*] Add a new profile form
- [ ] display new project, service, template in the account page
- [ ] edit project, service, template in the account page
- [ ] delete project, service, template in the account page
- [ ] create all the main pages

## Database Types

```typescript
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

export type Tables = {
  profiles: {
    Row: Profile;
    Insert: Omit<Profile, 'created_at' | 'updated_at'>;
    Update: Partial<Omit<Profile, 'id'>>;
  };
};

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;

export type Schema = {
  public: {
    Tables: Tables;
  };
};

export type SupabaseDatabase = SupabaseClient<Schema>;

// Helper type for form inputs
export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
```

when using the service count, make sure to check if the user is pro or not.
if the user is pro, then the service count should be unlimited.
if the user is not pro, then the service count should be limited to the service limit.
set the service count to the service limit if the user is not pro.
change the text to the following:
You can publish 2 more projects

1/3 projects
