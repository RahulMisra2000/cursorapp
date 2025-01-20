import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold dark:text-white">Profile Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>
      <ProfileForm />
    </div>
  );
} 