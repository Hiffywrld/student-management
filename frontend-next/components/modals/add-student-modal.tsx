'use client';

import { useState } from 'react';
import { useStudents } from '@/lib/contexts/student-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddStudentModalProps {
  onClose: () => void;
}

export default function AddStudentModal({ onClose }: AddStudentModalProps) {
  const { addStudent } = useStudents();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    cgpa: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.rollNumber || !formData.cgpa) {
      setError('All fields are required');
      return;
    }

    const cgpa = parseFloat(formData.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 4.0) {
      setError('CGPA must be between 0 and 4.0');
      return;
    }

    addStudent({
      name: formData.name,
      email: formData.email,
      rollNumber: formData.rollNumber,
      cgpa,
      courses: [],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Add New Student</h2>
            <p className="text-muted-foreground text-sm">Enter student details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="john@student.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Roll Number</label>
              <Input
                placeholder="CSE001"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CGPA (0.0 - 4.0)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder="3.5"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-2 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Add Student
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
