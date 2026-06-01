'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, StudentContextType } from '@/types';

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const API_BASE = '/api/students';

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);

  // Fetch all students from backend
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      // Convert id from number to string to match frontend type
      const mapped = data.map((s: any) => ({
        ...s,
        id: String(s.id),
        courses: s.courses || [],
      }));
      setStudents(mapped);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student: Omit<Student, 'id'>) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
      if (!res.ok) throw new Error('Failed to add student');
      await fetchStudents();
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete student');
      await fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const updateStudent = async (id: string, updatedData: Partial<Student>) => {
    try {
      const existing = students.find((s) => s.id === id);
      const merged = { ...existing, ...updatedData };
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });
      if (!res.ok) throw new Error('Failed to update student');
      await fetchStudents();
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const getStudentById = (id: string) => students.find((s) => s.id === id);

  const value: StudentContextType = {
    students,
    addStudent,
    deleteStudent,
    updateStudent,
    getStudentById,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}