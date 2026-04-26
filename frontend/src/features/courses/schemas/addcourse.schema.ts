import * as z from "zod";
import { CourseCategory } from "../../../enums/course-category"; 

export const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description should be detailed"),
  category: z.nativeEnum(CourseCategory),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  video: z.any().refine((file) => file instanceof File, "Intro video is required"),
});

export type CourseFormValues = z.input<typeof courseSchema>;