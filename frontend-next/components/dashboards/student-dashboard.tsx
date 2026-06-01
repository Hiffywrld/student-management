'use client';

import { useStudents } from '@/lib/contexts/student-context';
import { useAuth } from '@/lib/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentDashboard() {
  const { students } = useStudents();
  const { user } = useAuth();

  // For this demo, we'll show the first student's data (in a real app, would match user ID)
  const myData = students[2] || students[0];

  if (!myData) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">No student data found</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome, {user?.name}! Here&apos;s your academic overview</p>
      </div>

      {/* Profile Card */}
      <Card className="border border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Student Information</p>
              <h2 className="text-3xl font-bold text-foreground mt-2">{myData.name}</h2>
              <p className="text-lg text-muted-foreground mt-1">{myData.email}</p>
              <p className="text-accent mt-4 font-semibold">Roll Number: {myData.rollNumber}</p>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground">Current CGPA</p>
                <p className="text-4xl font-bold text-primary mt-2">{myData.cgpa.toFixed(2)}</p>
                <div className="w-full bg-border rounded-full h-2 mt-3">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(myData.cgpa / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Courses</p>
                <p className="text-3xl font-bold text-primary mt-2">{myData.courses.length}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 p-4 rounded-lg text-2xl">📚</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Credits</p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {myData.courses.reduce((sum, c) => sum + c.credits, 0)}
                </p>
              </div>
              <div className="bg-green-100 text-green-600 p-4 rounded-lg text-2xl">⭐</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">A Grade Count</p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {myData.courses.filter((c) => c.grade?.includes('A')).length}
                </p>
              </div>
              <div className="bg-purple-100 text-purple-600 p-4 rounded-lg text-2xl">🏆</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-primary">My Courses</CardTitle>
          <CardDescription>Enrolled courses and grades</CardDescription>
        </CardHeader>
        <CardContent>
          {myData.courses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No courses enrolled yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myData.courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{course.code}</p>
                      <p className="text-xs text-muted-foreground mt-2">{course.credits} credits</p>
                    </div>
                    {course.grade && (
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold">
                        {course.grade}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
