export const UserRole = {
  LEARNER: 'learner',
  MENTOR: 'mentor',
} as const;
export type CourseCategory = typeof UserRole[keyof typeof UserRole];