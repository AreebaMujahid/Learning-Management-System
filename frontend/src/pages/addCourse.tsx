import React from "react";
import {
  Layout,
  Upload,
  Video,
  BookOpen,
  User,
  DollarSign,
} from "lucide-react";
import type { CreateCourseInput } from "../features/auth/services/createcourse";
import { useAddCourse } from "../features/auth/hooks/add-course";
import { useRef, useState } from "react";
import { CourseCategory } from "../enums/course-category";
const AddCourseDashboard = () => {
  const { mutate, isPending } = useAddCourse();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [courseData, setCourseData] = useState<{
    title: string;
    description: string;
    category: CourseCategory;
    price: number;
    mentor: string;
  }>({
    title: "",
    description: "",
    category: CourseCategory.DEVELOPMENT,
    price: 0,
    mentor: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // 2. Video Selection Handler
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please upload an intro video");
      return;
    }
    const payload: CreateCourseInput = {
      ...courseData,
      video: videoFile,
    };

    mutate(payload, {
      onSuccess: () => {
        alert("Course Created Successfully!");
        // Reset form if needed
      },
    });
  };
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden md:block">
        <div className="text-2xl font-bold text-indigo-600 mb-10">
          LMS Admin
        </div>
        <nav className="space-y-4">
          <div className="flex items-center space-x-3 text-slate-600 p-2 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
            <Layout size={20} /> <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 text-indigo-600 bg-indigo-50 p-2 rounded-lg font-medium">
            <BookOpen size={20} /> <span>Courses</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-600 p-2 hover:bg-indigo-50 rounded-lg cursor-pointer">
            <User size={20} /> <span>Mentors</span>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">
              Add New Course
            </h1>
            <p className="text-slate-500 text-sm">
              Upload your videos and fill in the course details.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Course Details Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-semibold mb-4 text-slate-700">
                  General Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Course Title
                    </label>
                    <input
                      type="text"
                      required
                      value={courseData.title}
                      onChange={(e) =>
                        setCourseData({ ...courseData, title: e.target.value })
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g. Mastering NestJS"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={courseData.description}
                      onChange={(e) =>
                        setCourseData({
                          ...courseData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="What will students learn?"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">
                        Category
                      </label>
                      <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                        value={courseData.category}
                        onChange={(e) =>
                          setCourseData({
                            ...courseData,
                            category: e.target.value as CourseCategory,
                          })
                        }
                      >
                        {Object.values(CourseCategory).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        required
                        value={courseData.price}
                        onChange={(e) =>
                          setCourseData({
                            ...courseData,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-semibold mb-4 text-slate-700">
                  Video Content
                </h2>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleVideoChange}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-indigo-200 bg-indigo-50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <Video size={24} />
                  </div>
                  <span className="text-sm font-medium text-indigo-700">
                    {videoFile ? videoFile.name : "Upload Video"}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    MP4 or MKV (Max 5 mins)
                  </span>
                </div>

                {/* Auto-Thumbnail Preview Placeholder */}
                <div className="mt-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Preview
                  </span>
                  <div className="mt-2 aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden relative group">
                    {videoPreview ? (
                      <video
                        src={videoPreview}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <span className="text-xs italic text-slate-400">
                        Video preview will appear here
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                      <button className="text-white text-sm bg-indigo-600 px-4 py-1.5 rounded-full">
                        Preview Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-200"
              >
                {isPending ? "Uploading Course..." : "Create Course"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCourseDashboard;
