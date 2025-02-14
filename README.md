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

<Role>As a senior developer specializing in debugging, your role is to meticulously analyze the codebase, pinpoint the root cause of the issue, and implement an effective solution."

Here's how I improved it:

Stronger verbs: "Analyze" is fine, but "meticulously analyze" emphasizes thoroughness. "Pinpoint" is more precise than "identify." "Implement" is more active than "fix."
Clarity: I rephrased slightly to improve the flow and clarity.
Conciseness: I removed the unnecessary "it."
Professional tone: The overall language is more polished and professional.<Role>

<Bug>

Error: supabase.from is not a function
at Module.generateMetadata (rsc://React/Server/C:%5CUsers%5Cdomi%5CDesktop%5Cnext-playground%5Cproject-templl-v3%5C.next%5Cserver%5Cchunks%5Cssr%5C%5Broot%20of%20the%20server%5D**7d1e82._.js?2:94:55)
at resolveErrorDev (http://localhost:3000/\_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3662:65)
at getOutlinedModel (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3367:28)
at parseModelString (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3446:52)
at Array.<anonymous> (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3864:51)
at JSON.parse (<anonymous>)
at resolveConsoleEntry (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3745:32)
at processFullStringRow (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3841:17)
at processFullBinaryRow (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3812:9)
at progress (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3932:102)
Error: supabase.from is not a function
at generateJsonLd (rsc://React/Server/C:%5CUsers%5Cdomi%5CDesktop%5Cnext-playground%5Cproject-templl-v3%5C.next%5Cserver%5Cchunks%5Cssr%5C%5Broot%20of%20the%20server%5D**7d1e82._.js?0:162:44)
at StackLayout (rsc://React/Server/C:%5CUsers%5Cdomi%5CDesktop%5Cnext-playground%5Cproject-templl-v3%5C.next%5Cserver%5Cchunks%5Cssr%5C%5Broot%20of%20the%20server%5D\_\_7d1e82._.js?1:210:26)
at resolveErrorDev (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3662:65)
at processFullStringRow (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3824:23)
at processFullBinaryRow (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3812:9)
at progress (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:3932:102)
</Bug>

<Analysis>
</Analysis>

<Fix>
Write Clean Code

Follow coding conventions: Adhere to the existing coding style and conventions of the project. This ensures consistency and readability.
Use meaningful names: Choose descriptive names for variables, functions, and classes that clearly convey their purpose.
Write clear and concise code: Avoid unnecessary comments or overly complex logic. Strive for code that is self-explanatory.
Break down large functions: If a function is too long or complex, break it down into smaller, more manageable functions.
Avoid code duplication: If you find yourself repeating code, extract it into a reusable function or component.
</Fix>
