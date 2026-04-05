import React from "react";
import {
  Eye,
  Edit3,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

const CoursesList = () => {
  // Dummy Data for Preview
  const courses = [
    {
      id: 1,
      title: "Mastering NestJS Backend",
      category: "Development",
      price: "$49",
      students: 120,
      thumb:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&h=225&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Advanced GraphQL & Apollo",
      category: "Development",
      price: "$59",
      students: 85,
      thumb:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&h=225&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Advanced GraphQL & Apollo",
      category: "Development",
      price: "$59",
      students: 85,
      thumb:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&h=225&auto=format&fit=",
    },
    {
      id: 4,
      title: "Advanced GraphQL & Apollo",
      category: "Development",
      price: "$59",
      students: 85,
      thumb:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&h=225&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "UI/UX Design Essentials",
      category: "Design",
      price: "$39",
      students: 210,
      thumb:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&h=225&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
            <p className="text-slate-500 text-sm">
              Manage and monitor your course performance.
            </p>
          </div>
          <button className="flex items-center justify-center space-x-2 bg-brand-10 hover:opacity-90 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-100 font-medium">
            <Plus size={18} /> <span>Add New Course</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-10/20"
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <Filter size={18} /> <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumb}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-brand-50 uppercase">
                  {course.category}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5">
                <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-brand-10 font-bold text-lg">
                    {course.price}
                  </span>
                  <span className="text-slate-400">
                    {course.students} Students
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-50">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 hover:bg-brand-10 hover:text-white text-slate-600 py-2 rounded-lg transition-colors text-sm font-medium border border-slate-100">
                    <Eye size={16} /> <span>View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-600 py-2 rounded-lg transition-colors text-sm font-medium border border-slate-100">
                    <Edit3 size={16} /> <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="mt-10 flex items-center justify-center space-x-2">
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 bg-brand-10 text-white rounded-lg font-medium shadow-sm shadow-indigo-200">
            1
          </button>
          <button className="w-10 h-10 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
            2
          </button>
          <button className="w-10 h-10 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
            3
          </button>
          <span className="text-slate-400 px-2">...</span>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
