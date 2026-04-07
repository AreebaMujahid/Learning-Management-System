import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourse } from '../services/createcourse';
import toast from 'react-hot-toast'; 
import type  { CreateCourseInput } from '../services/createcourse';

export const useAddCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseInput) => createCourse(data),
    onMutate: () => {
      toast.loading('Uploading course and processing video...', { id: 'course-upload' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course created successfully!', { id: 'course-upload' });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message;
      const errorMessage = Array.isArray(message) ? message[0] : (message || "Something went wrong");
      toast.error(errorMessage, { id: 'course-upload' });
      console.error("Course upload failed:", errorMessage);
    }
  });
};