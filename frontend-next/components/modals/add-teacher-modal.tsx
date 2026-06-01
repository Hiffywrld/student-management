'use client';
import { useState } from 'react';
import { useTeachers } from '@/lib/contexts/teacher-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddTeacherModalProps {
  onClose: () => void;
}

export default function AddTeacherModal({ onClose }: AddTeacherModalProps) {
  const { addTeacher } = useTeachers();
  const [formData, setFormData] = useState({
    name: '', email: '', employeeId: '',
    subject: '', phone: '', status: 'Active',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.email || !formData.employeeId || !formData.subject) {
      setError('Name, email, employee ID and subject are required');
      return;
    }
    setSaving(true);
    await addTeacher(formData);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Add New Teacher</h2>
            <p className="text-muted-foreground text-sm">Enter teacher details below</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input placeholder="Dr. John Smith" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="teacher@school.com" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Employee ID</label>
              <Input placeholder="TCH001" value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input placeholder="Mathematics" value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone (optional)</label>
              <Input placeholder="+234 800 000 0000" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select className="w-full border rounded-md px-3 py-2 text-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-2 rounded">{error}</div>
            )}
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={saving}>
                {saving ? 'Adding...' : 'Add Teacher'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}