import apiClient from "../../../configs/axios";
export interface CreateCourseInput {
  title: string;
  description: string;
  category: string;
  price: number;
  video: File;
}

export const createCourse = async (data: CreateCourseInput) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('category', data.category);
  formData.append('price', data.price.toString());
  formData.append('video', data.video);
  const response = await apiClient.post('/courses/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
      console.log(`Upload progress: ${percentCompleted}%`);
    },
  });

  return response.data;
};