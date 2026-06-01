'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  subject: string;
  phone?: string;
  status: string;
}

interface TeacherContextType {
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => Promise<void>;
  updateTeacher: (id: string, data: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  getTeacherById: (id: string) => Teacher | undefined;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);
const API_BASE = '/api/teachers';

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTeachers(data.map((t: any) => ({ ...t, id: String(t.id) })));
    } catch (err) {
      console.error('Error fetching teachers:', err);
    }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });
      if (!res.ok) throw new Error('Failed to add teacher');
      await fetchTeachers();
    } catch (err) {
      console.error('Error adding teacher:', err);
    }
  };

  const updateTeacher = async (id: string, updatedData: Partial<Teacher>) => {
    try {
      const existing = teachers.find(t => t.id === id);
      const merged = { ...existing, ...updatedData };
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });
      if (!res.ok) throw new Error('Failed to update teacher');
      await fetchTeachers();
    } catch (err) {
      console.error('Error updating teacher:', err);
    }
  };

  const deleteTeacher = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete teacher');
      await fetchTeachers();
    } catch (err) {
      console.error('Error deleting teacher:', err);
    }
  };

  const getTeacherById = (id: string) => teachers.find(t => t.id === id);

  return (
    <TeacherContext.Provider value={{ teachers, addTeacher, updateTeacher, deleteTeacher, getTeacherById }}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeachers() {
  const context = useContext(TeacherContext);
  if (!context) throw new Error('useTeachers must be used within TeacherProvider');
  return context;
}