import LoginLogout from './LoginLogout';
import SettingsLink from './SettingsLink';
import SubmitAccountButton from './SubmitAccountButton';

export default function SignInSystem() {
  return (
    <div className='flex items-center gap-2'>
      <SettingsLink />
      <div className='flex items-center gap-2 bg-purple-200 dark:bg-purple-800 p-1 rounded-md'>
        <LoginLogout />
        <SubmitAccountButton />
      </div>
    </div>
  );
}
