'use client';

import { useStudents } from '@/lib/contexts/student-context';
import { useAuth } from '@/lib/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ParentDashboard() {
  const { students } = useStudents();
  const { user } = useAuth();

  // For demo purposes, show the first student as child
  const childData = students[0] || null;

  if (!childData) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">No child data found</p>
      </div>
    );
  }

  const getGradeColor = (grade?: string) => {
    if (!grade) return 'bg-gray-100 text-gray-700';
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-orange-100 text-orange-700';
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Parent Portal</h1>
        <p className="text-muted-foreground mt-2">Hello, {user?.name}! Monitor your child&apos;s progress</p>
      </div>

      {/* Child Profile */}
      <Card className="border border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Your Child</p>
              <h2 className="text-3xl font-bold text-foreground mt-2">{childData.name}</h2>
              <p className="text-lg text-muted-foreground mt-1">{childData.email}</p>
              <p className="text-accent mt-4 font-semibold">Roll Number: {childData.rollNumber}</p>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground">Current CGPA</p>
                <p className="text-4xl font-bold text-primary mt-2">{childData.cgpa.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {childData.cgpa >= 3.7
                    ? '🌟 Excellent Performance'
                    : childData.cgpa >= 3.3
                    ? '👍 Good Performance'
                    : childData.cgpa >= 3.0
                    ? '✓ Average Performance'
                    : '⚠️ Needs Improvement'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Enrolled Courses</p>
                <p className="text-3xl font-bold text-primary mt-2">{childData.courses.length}</p>
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
                  {childData.courses.reduce((sum, c) => sum + c.credits, 0)}
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
                <p className="text-muted-foreground text-sm">Avg Course Grade</p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {childData.courses.length > 0
                    ? (
                        childData.courses.filter((c) => c.grade).length /
                        childData.courses.length * 100
                      ).toFixed(0)
                    : '0'}
                  %
                </p>
              </div>
              <div className="bg-purple-100 text-purple-600 p-4 rounded-lg text-2xl">📈</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Breakdown */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-primary">Course Performance</CardTitle>
          <CardDescription>Your child&apos;s grades and course details</CardDescription>
        </CardHeader>
        <CardContent>
          {childData.courses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No courses enrolled yet</p>
          ) : (
            <div className="space-y-3">
              {childData.courses.map((course) => (
                <div key={course.id} className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{course.name}</h3>
                      <div className="flex gap-3 mt-2">
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {course.code}
                        </span>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {course.credits} credits
                        </span>
                      </div>
                    </div>
                    {course.grade && (
                      <div className={`px-4 py-2 rounded-lg font-bold text-sm ${getGradeColor(course.grade)}`}>
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

      {/* Performance Summary */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-primary">Performance Summary</CardTitle>
          <CardDescription>Quick insights about your child&apos;s academic progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="font-semibold text-green-900">Strength: {childData.courses.filter((c) => c.grade?.includes('A')).length} A grades</span>
            <span className="text-green-600">✓</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="font-semibold text-blue-900">Total Courses: {childData.courses.length}</span>
            <span className="text-blue-600">📚</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
            <span className="font-semibold text-purple-900">Credits Completed: {childData.courses.reduce((sum, c) => sum + c.credits, 0)}</span>
            <span className="text-purple-600">⭐</span>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground text-center">
        For more detailed information or concerns, please contact the school administration.
      </p>
    </div>
  );
}
