'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { RequestError } from '@/types/supabase';
import { Search, Loader2, ArrowUpDown, Check } from 'lucide-react';
import { toast } from 'sonner';

const PAGE_SIZE = 10;

const RequestErrorsGrid = () => {
  const [data, setData] = useState<RequestError[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof RequestError>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const supabase = createClientComponentClient();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('requesterrors')
        .select('*', { count: 'exact' })
        .eq('active', 1);

      // Apply search filter
      if (searchTerm) {
        query = query.or(
          `casenumber.ilike.%${searchTerm}%,region.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`
        );
      }

      // Apply sorting
      query = query.order(sortColumn, { ascending: sortDirection === 'asc' });

      // Apply pagination
      query = query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setData(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchTerm, sortColumn, sortDirection]);

  const handleUpdateActive = async (id: number) => {
    try {
      const { error: updateError } = await supabase
        .from('requesterrors')
        .update({ active: 0 })
        .eq('id', id);

      if (updateError) throw updateError;

      toast.success('Record marked as done');
      // Refresh the data
      fetchData();
    } catch (err) {
      toast.error('Failed to update record');
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSort = (column: keyof RequestError) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const columns: { key: keyof RequestError; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'region', label: 'Region' },
    { key: 'type', label: 'Type' },
    { key: 'casenumber', label: 'Case Number' },
    { key: 'sourcefilename', label: 'Source File' },
    { key: 'errormessage', label: 'Error Message' },
    { key: 'created_at', label: 'Created At' },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by case number, region, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/50 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Data Grid */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">
                      {column.key === 'created_at' 
                        ? new Date(row[column.key]).toLocaleString()
                        : row[column.key]}
                    </td>
                  ))}
                  <td className="px-4 py-4 text-sm text-right">
                    <button
                      onClick={() => handleUpdateActive(row.id)}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900"
                    >
                      <Check className="h-4 w-4" />
                      Mark as Done
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {data.length > 0 ? page * PAGE_SIZE + 1 : 0} to {Math.min((page + 1) * PAGE_SIZE, totalCount)} of{' '}
          {totalCount} results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={(page + 1) * PAGE_SIZE >= totalCount}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestErrorsGrid; 