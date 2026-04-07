export const CourseCategory = {
  DEVELOPMENT: 'Development',
  DESIGN: 'Design',
  MARKETING: 'Marketing',
  BUSINESS: 'Business',
} as const;
export type CourseCategory = typeof CourseCategory[keyof typeof CourseCategory];