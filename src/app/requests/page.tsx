import RequestErrorsGrid from '@/components/requests/RequestErrorsGrid';

export default function RequestsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold dark:text-white">Request & Reminders</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage and track request errors and reminders
        </p>
      </div>
      <RequestErrorsGrid />
    </div>
  );
} 