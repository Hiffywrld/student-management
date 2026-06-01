'use client';

import { useState } from 'react';
import { useStudents } from '@/lib/contexts/student-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AddStudentModal from '@/components/modals/add-student-modal';
import StudentTable from '@/components/tables/student-table';

export default function AdminDashboard() {
  const { students } = useStudents();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      label: 'Total Students',
      value: students.length,
      icon: '👥',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Average CGPA',
      value: (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2),
      icon: '📊',
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Courses',
      value: new Set(students.flatMap((s) => s.courses.map((c) => c.id))).size,
      icon: '📚',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage students, teachers, and system settings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg text-2xl`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Management */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-primary">Student Management</CardTitle>
            <CardDescription>Add, edit, and remove students from the system</CardDescription>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary/90"
          >
            + Add Student
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <svg
              className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              type="text"
              placeholder="Search students by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <StudentTable students={filteredStudents} isAdmin={true} />
        </CardContent>
      </Card>

      {showAddModal && <AddStudentModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
