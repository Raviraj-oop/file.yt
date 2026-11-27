import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

const fields = [
  { label: 'Name *', name: 'name', type: 'text', placeholder: 'Your name' },
  { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'your@email.com' },
  { label: 'Phone *', name: 'phone', type: 'tel', placeholder: '10-digit phone number', maxLength: 10 },
  { label: 'Years of Experience', name: 'experience', type: 'text', placeholder: 'Years of experience' },
];

const roles = ['Fresher', 'Working Professional – IT', 'Working Professional – Non-IT', 'Student / Graduate'];

/**
 * Syllabus request form. Off by default (see SHOW in InternshipProgram).
 * There is no endpoint behind it yet, so it says so instead of promising a download.
 */
const SyllabusModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const toast = useToast();
  const [form, setForm] = useState<Record<string, string>>({});
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('This form is not connected yet. Please call or email us for the syllabus.', 'info');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Download Syllabus">
      <form onSubmit={onSubmit} className="space-y-3">
        {fields.map(({ label, name, ...rest }) => (
          <label key={name} className="block text-sm font-semibold text-ink-900">
            {label}
            <input {...rest} name={name} required={label.endsWith('*')} value={form[name] || ''} onChange={onChange} className="field mt-1.5 font-normal" />
          </label>
        ))}
        <label className="block text-sm font-semibold text-ink-900">
          Current Job Role *
          <select name="jobRole" required value={form.jobRole || ''} onChange={onChange} className="field mt-1.5 font-normal">
            <option value="">Select job role</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <Button type="submit" size="lg" className="w-full">Register Now</Button>
      </form>
    </Modal>
  );
};

export default SyllabusModal;
