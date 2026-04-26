import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  courseSchema,
  type CourseFormValues,
} from "../features/courses/schemas/addcourse.schema";
import { useAddCourse } from "../features/courses/hooks/add-course";
import { Video, Upload } from "lucide-react";
import { useState } from "react";
import { CourseCategory } from "../enums/course-category";
export const AddCourseDashboard = () => {
  const { mutate, isPending } = useAddCourse();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
  });

  const videoFile = watch("video");

  const onSubmit = (data: CourseFormValues) => {
    console.log("Form Data:", data);
    mutate(data);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("video", file, { shouldValidate: true });
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Side: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">General Information</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Course Title</label>
                <input
                  {...register("title")}
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg ${errors.title ? "border-red-500" : "border-slate-200"}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>

                <textarea
                  {...register("description")}
                  rows={4}
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg ${
                    errors.description ? "border-red-500" : "border-slate-200"
                  }`}
                  placeholder="Enter course description..."
                />

                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    {...register("category")}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="">Select Category</option>

                    {Object.values(CourseCategory).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Price ($)</label>
                  <input
                    type="number"
                    {...register("price")}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side: Video Upload */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Video Content</h2>

            <label className="cursor-pointer border-2 border-dashed border-indigo-200 bg-indigo-50 rounded-xl p-8 flex flex-col items-center">
              <input
                type="file"
                hidden
                accept="video/*"
                onChange={handleVideoChange}
              />
              <Video className="text-indigo-600 mb-2" size={32} />
              <span className="text-sm font-medium">
                {videoFile ? videoFile.name : "Upload Intro Video"}
              </span>
            </label>
            {errors.video && (
              <p className="text-red-500 text-xs mt-2 text-center">
                {errors.video.message as string}
              </p>
            )}

            {/* Preview Section */}
            {videoPreview && (
              <div className="mt-4 aspect-video rounded-lg overflow-hidden border">
                <video
                  src={videoPreview}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
          >
            {isPending ? "Processing..." : "Create Course"}
          </button>
        </div>
      </form>
    </main>
  );
};
