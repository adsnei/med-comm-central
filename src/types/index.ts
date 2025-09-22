export type UserRole = 'manager' | 'attendant' | 'patient';

export type ChannelType = 'whatsapp' | 'facebook' | 'instagram' | 'email' | 'phone' | 'website';

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export type AttendanceStatus = 'waiting' | 'in_progress' | 'resolved' | 'escalated';

export type AttendantStatus = 'online' | 'busy' | 'away' | 'offline';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status?: AttendantStatus;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  lastContact?: Date;
  totalContacts: number;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'patient' | 'attendant';
  status: MessageStatus;
  channel: ChannelType;
}

export interface Conversation {
  id: string;
  patient: Patient;
  attendant?: User;
  channel: ChannelType;
  status: AttendanceStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  waitingTime?: number;
  tags?: string[];
}

export interface DashboardMetrics {
  totalAttendances: number;
  avgResponseTime: number;
  resolutionRate: number;
  satisfactionScore: number;
  attendancesInProgress: number;
  attendancesWaiting: number;
  attendancesResolved: number;
  attendancesByChannel: Record<ChannelType, number>;
}

export interface AttendantMetrics {
  id: string;
  name: string;
  status: AttendantStatus;
  attendancesToday: number;
  avgResponseTime: number;
  resolutionRate: number;
  satisfactionScore: number;
  currentAttendances: number;
}