import AttendanceTable from '@/components/employee/AttendanceTable';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold dark:text-white">Permission Request</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage employee attendance and leave requests
        </p>
      </div>
      <AttendanceTable />
    </div>
  );
} 