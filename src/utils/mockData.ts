import { Conversation, DashboardMetrics, AttendantMetrics, Patient, User, Message } from '@/types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    birthDate: '1985-03-15',
    lastContact: new Date('2024-01-20T10:30:00'),
    totalContacts: 5,
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '(21) 97654-3210',
    cpf: '987.654.321-00',
    birthDate: '1978-07-22',
    lastContact: new Date('2024-01-20T09:15:00'),
    totalContacts: 3,
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(31) 96543-2109',
    cpf: '456.789.123-00',
    birthDate: '1992-11-08',
    lastContact: new Date('2024-01-20T11:45:00'),
    totalContacts: 8,
  },
];

export const mockAttendants: User[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    email: 'carlos@clinica.com',
    role: 'attendant',
    status: 'online',
  },
  {
    id: '2',
    name: 'Patrícia Lima',
    email: 'patricia@clinica.com',
    role: 'attendant',
    status: 'busy',
  },
  {
    id: '3',
    name: 'Roberto Ferreira',
    email: 'roberto@clinica.com',
    role: 'attendant',
    status: 'away',
  },
];

export const mockManager: User = {
  id: 'manager1',
  name: 'Dr. Fernando Mendes',
  email: 'fernando@clinica.com',
  role: 'manager',
  status: 'online',
};

const generateMessages = (): Message[] => [
  {
    id: '1',
    content: 'Olá, gostaria de agendar uma consulta',
    timestamp: new Date('2024-01-20T10:00:00'),
    sender: 'patient',
    status: 'read',
    channel: 'whatsapp',
  },
  {
    id: '2',
    content: 'Olá! Claro, posso ajudar com o agendamento. Qual especialidade você precisa?',
    timestamp: new Date('2024-01-20T10:02:00'),
    sender: 'attendant',
    status: 'delivered',
    channel: 'whatsapp',
  },
  {
    id: '3',
    content: 'Preciso de um cardiologista',
    timestamp: new Date('2024-01-20T10:03:00'),
    sender: 'patient',
    status: 'read',
    channel: 'whatsapp',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    patient: mockPatients[0],
    attendant: mockAttendants[0],
    channel: 'whatsapp',
    status: 'in_progress',
    priority: 'high',
    messages: generateMessages(),
    createdAt: new Date('2024-01-20T10:00:00'),
    updatedAt: new Date('2024-01-20T10:30:00'),
    waitingTime: 2,
    tags: ['agendamento', 'cardiologia'],
  },
  {
    id: '2',
    patient: mockPatients[1],
    attendant: mockAttendants[1],
    channel: 'facebook',
    status: 'waiting',
    priority: 'medium',
    messages: generateMessages(),
    createdAt: new Date('2024-01-20T09:00:00'),
    updatedAt: new Date('2024-01-20T09:15:00'),
    waitingTime: 5,
    tags: ['exames', 'resultados'],
  },
  {
    id: '3',
    patient: mockPatients[2],
    channel: 'instagram',
    status: 'waiting',
    priority: 'urgent',
    messages: generateMessages(),
    createdAt: new Date('2024-01-20T11:30:00'),
    updatedAt: new Date('2024-01-20T11:45:00'),
    waitingTime: 15,
    tags: ['urgente', 'dor'],
  },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalAttendances: 127,
  avgResponseTime: 3.5,
  resolutionRate: 89.5,
  satisfactionScore: 4.7,
  attendancesInProgress: 8,
  attendancesWaiting: 5,
  attendancesResolved: 114,
  attendancesByChannel: {
    whatsapp: 45,
    facebook: 28,
    instagram: 22,
    email: 18,
    phone: 10,
    website: 4,
  },
};

export const mockAttendantMetrics: AttendantMetrics[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    status: 'online',
    attendancesToday: 23,
    avgResponseTime: 2.8,
    resolutionRate: 92.3,
    satisfactionScore: 4.8,
    currentAttendances: 3,
  },
  {
    id: '2',
    name: 'Patrícia Lima',
    status: 'busy',
    attendancesToday: 31,
    avgResponseTime: 3.2,
    resolutionRate: 88.7,
    satisfactionScore: 4.6,
    currentAttendances: 5,
  },
  {
    id: '3',
    name: 'Roberto Ferreira',
    status: 'away',
    attendancesToday: 18,
    avgResponseTime: 4.1,
    resolutionRate: 85.2,
    satisfactionScore: 4.5,
    currentAttendances: 0,
  },
];