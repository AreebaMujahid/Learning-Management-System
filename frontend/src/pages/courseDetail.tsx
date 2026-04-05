import React, { useState } from "react";
import {
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  FileText,
  Star,
  Clock,
} from "lucide-react";

const CourseDetail = () => {
  // Dummy Playlist Data
  const playlist = [
    {
      id: 1,
      title: "Introduction to NestJS",
      duration: "05:20",
      completed: true,
    },
    {
      id: 2,
      title: "Setting up MongoDB with Mongoose",
      duration: "12:45",
      completed: true,
    },
    {
      id: 3,
      title: "Creating your first Controller",
      duration: "15:10",
      completed: false,
    },
    {
      id: 4,
      title: "Advanced Dependency Injection",
      duration: "20:30",
      completed: false,
    },
    {
      id: 5,
      title: "Authentication with JWT",
      duration: "25:00",
      completed: false,
    },
  ];

  const [activeVideo, setActiveVideo] = useState(playlist[2]); // Default active video

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* LEFT SECTION: Video Player & Info */}
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Main Video Player Area */}
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white">
            <div className="w-full h-full flex items-center justify-center bg-slate-900 group relative">
              {/* Actual Video Tag will go here */}
              <PlayCircle
                size={80}
                className="text-white/20 group-hover:text-brand-10 transition-colors cursor-pointer"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h2 className="text-lg font-semibold">{activeVideo.title}</h2>
              </div>
            </div>
          </div>

          {/* Course Metadata */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-brand-10/10 text-brand-10 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                Development
              </span>
              <div className="flex items-center text-slate-400 text-sm">
                <Clock size={16} className="mr-1" /> 12 Hours Total
              </div>
              <div className="flex items-center text-amber-500 text-sm font-bold">
                <Star size={16} className="mr-1 fill-amber-500" /> 4.9 (2.3k
                reviews)
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
              Mastering NestJS: From Zero to Advanced Backend
            </h1>

            <p className="text-slate-600 leading-relaxed mb-8">
              In this comprehensive module, we dive deep into the world of
              NestJS. You will learn how to build scalable, enterprise-level
              applications using TypeScript, GraphQL, and MongoDB. We cover
              everything from basic routing to advanced microservices
              architecture.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-3">
                <FileText className="text-brand-10 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-700">Course Resources</h4>
                  <p className="text-xs text-slate-500">
                    Download source code and PDF guides.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-3">
                <CheckCircle2 className="text-green-500 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-700">
                    Certificate Included
                  </h4>
                  <p className="text-xs text-slate-500">
                    Get certified after completing all tutorials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Playlist Sidebar */}
      <aside className="w-full lg:w-[400px] bg-white border-l border-slate-200 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h3 className="text-xl font-bold text-slate-800">Course Content</h3>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-brand-10 w-2/5 h-full rounded-full"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            40% Completed (2/5 Lessons)
          </p>
        </div>

        <div className="divide-y divide-slate-50">
          {playlist.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className={`p-5 flex items-start space-x-4 cursor-pointer transition-all hover:bg-slate-50 group ${
                activeVideo.id === video.id
                  ? "bg-brand-10/5 border-l-4 border-brand-10"
                  : ""
              }`}
            >
              <div className="mt-1">
                {video.completed ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <PlayCircle
                    size={20}
                    className={`${activeVideo.id === video.id ? "text-brand-10" : "text-slate-300"}`}
                  />
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`text-sm font-semibold mb-1 ${activeVideo.id === video.id ? "text-brand-10" : "text-slate-700"}`}
                >
                  {video.title}
                </h4>
                <div className="flex items-center text-[11px] text-slate-400 font-medium">
                  <Clock size={12} className="mr-1" /> {video.duration}
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-slate-300 group-hover:translate-x-1 transition-transform"
              />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default CourseDetail;
