'use client';

import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface StudentDetailsModalProps {
  student: Student;
  onClose: () => void;
}

export default function StudentDetailsModal({
  student,
  onClose,
}: StudentDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{student.email}</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-lg">
              ×
            </Button>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Roll Number</p>
              <p className="text-lg font-bold text-foreground mt-1">{student.rollNumber}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">CGPA</p>
              <p className="text-lg font-bold text-primary mt-1">{student.cgpa.toFixed(2)}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-lg font-bold text-foreground mt-1">{student.courses.length}</p>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Enrolled Courses</h3>
            {student.courses.length === 0 ? (
              <p className="text-muted-foreground text-sm">No courses enrolled</p>
            ) : (
              <div className="space-y-2">
                {student.courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {course.credits} credits
                      </p>
                      {course.grade && (
                        <p className="font-bold text-primary">{course.grade}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
