import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourse } from '../services/createcourse';
import { toast } from "sonner";
import type  { CreateCourseInput } from '../services/createcourse';
import {courseSchema, type CourseFormValues } from '../schemas/addcourse.schema';

export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseFormValues) => {
      const parsedData = courseSchema.parse(data);

  return createCourse(parsedData);
    },
    onMutate: () => {
      toast.loading('Uploading course and processing video...', { id: 'course-upload' });
    },
    onSuccess: () => {
      console.log("SUCCESS HIT");
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course Added successfully!', { id: 'course-upload' });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message;
      const errorMessage = Array.isArray(message) ? message[0] : (message || "Something went wrong");
      toast.error(errorMessage, { id: 'course-upload' });
      console.error("Course upload failed:", errorMessage);
    }
  });
};