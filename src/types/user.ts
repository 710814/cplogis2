export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  department: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
} 