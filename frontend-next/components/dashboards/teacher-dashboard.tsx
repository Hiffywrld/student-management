'use client';

import { useState } from 'react';
import { useStudents } from '@/lib/contexts/student-context';
import { useAuth } from '@/lib/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StudentTable from '@/components/tables/student-table';

export default function TeacherDashboard() {
  const { students } = useStudents();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgCGPA = students.length > 0
    ? (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2)
    : '0.00';

  const totalEnrollments = students.reduce((sum, s) => sum + s.courses.length, 0);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome, {user?.name}! Manage your students and courses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Students Under You</p>
                <p className="text-3xl font-bold text-primary mt-2">{students.length}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 p-4 rounded-lg text-2xl">👥</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Average CGPA</p>
                <p className="text-3xl font-bold text-primary mt-2">{avgCGPA}</p>
              </div>
              <div className="bg-green-100 text-green-600 p-4 rounded-lg text-2xl">📊</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Enrollments</p>
                <p className="text-3xl font-bold text-primary mt-2">{totalEnrollments}</p>
              </div>
              <div className="bg-purple-100 text-purple-600 p-4 rounded-lg text-2xl">📚</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-primary">Your Students</CardTitle>
          <CardDescription>View and manage your students&apos; information</CardDescription>
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <StudentTable students={filteredStudents} isAdmin={false} />
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-primary">Top Performers</CardTitle>
          <CardDescription>Students with highest CGPA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students
              .sort((a, b) => b.cgpa - a.cgpa)
              .slice(0, 5)
              .map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                    {student.cgpa.toFixed(2)}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
