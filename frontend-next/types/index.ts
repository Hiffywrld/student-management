export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  cgpa: number;
  courses: Course[];
  parentEmail?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
}

export interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  getStudentById: (id: string) => Student | undefined;
}
