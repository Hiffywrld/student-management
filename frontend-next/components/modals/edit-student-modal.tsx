'use client';
import { useState } from 'react';
import { useStudents } from '@/lib/contexts/student-context';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface EditStudentModalProps {
  student: Student;
  onClose: () => void;
}

export default function EditStudentModal({ student, onClose }: EditStudentModalProps) {
  const { updateStudent } = useStudents();
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    rollNumber: student.rollNumber,
    cgpa: student.cgpa.toString(),
    parentEmail: student.parentEmail || '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cgpa = parseFloat(formData.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 4.0) {
      setError('CGPA must be between 0 and 4.0');
      return;
    }
    setSaving(true);
    await updateStudent(student.id, {
      name: formData.name,
      email: formData.email,
      rollNumber: formData.rollNumber,
      cgpa,
      parentEmail: formData.parentEmail,
    });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Edit Student</h2>
            <p className="text-muted-foreground text-sm">Update student details below</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Roll Number</label>
              <Input value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CGPA (0.0 - 4.0)</label>
              <Input type="number" step="0.01" min="0" max="4"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Parent Email (optional)</label>
              <Input type="email" placeholder="parent@example.com"
                value={formData.parentEmail}
                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })} />
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-2 rounded">{error}</div>
            )}
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}