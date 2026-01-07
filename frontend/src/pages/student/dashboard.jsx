import { useState } from 'react';
import { Search, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import JobCard from '../../components/JobCard';
import { useQuery } from '@tanstack/react-query';
import { fetchAllJobs } from '../../controllers/api.controller';
import LoadingSnippet from '../../components/LoadingSnippet';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
  } = useQuery({
    queryKey: ["AllJobs"],
    queryFn: fetchAllJobs,
  });

    if (jobsLoading) {
    return <LoadingSnippet />;
  }

  if (jobsError) {
    return toast.error(jobsError?.message);
  }

  const formatPay = (pay) => {
    return pay ? `${(pay / 1000).toFixed(0)}k/m` : 'Negotiable';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-2 mt-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Find Your Job</h1>
          <p className="text-lg text-gray-600">Discover opportunities that match your passion</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
              Search Jobs
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filter Jobs</h3>
                <button className="text-blue-600 text-sm hover:underline">Clear All</button>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="font-medium mb-4">Job Type</h4>
                  <div className="space-y-3">
                    {['Remote', 'Full-Time', 'Part-Time', 'Contract', 'Internship'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-3 rounded text-blue-600" />
                        <span className="text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Salary Range</h4>
                  <div className="flex items-center gap-4">
                    <input type="number" placeholder="Min Salary" className="w-full px-3 py-2 border rounded-lg" />
                    <input type="number" placeholder="Max Salary" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Showing {jobs.length} jobs</p>
              <div className="flex gap-2">
                <button className="p-2 border rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-2 border rounded-lg bg-blue-50 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isSaved={''}
                  onSave={''}
                  formatPay={formatPay}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}