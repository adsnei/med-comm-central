import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/metrics/MetricCard';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardMetrics, mockAttendantMetrics } from '@/utils/mockData';
import {
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  Activity,
  PhoneCall,
  Mail,
  Globe,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function ManagerDashboard() {
  const hourlyData = [
    { hour: '08h', atendimentos: 12 },
    { hour: '09h', atendimentos: 25 },
    { hour: '10h', atendimentos: 38 },
    { hour: '11h', atendimentos: 32 },
    { hour: '12h', atendimentos: 18 },
    { hour: '13h', atendimentos: 15 },
    { hour: '14h', atendimentos: 28 },
    { hour: '15h', atendimentos: 35 },
    { hour: '16h', atendimentos: 30 },
    { hour: '17h', atendimentos: 22 },
  ];

  const channelData = [
    { name: 'WhatsApp', value: 45, color: 'hsl(142, 71%, 45%)' },
    { name: 'Facebook', value: 28, color: 'hsl(211, 75%, 48%)' },
    { name: 'Instagram', value: 22, color: 'hsl(330, 70%, 50%)' },
    { name: 'E-mail', value: 18, color: 'hsl(38, 92%, 50%)' },
    { name: 'Telefone', value: 10, color: 'hsl(199, 89%, 48%)' },
    { name: 'Website', value: 4, color: 'hsl(280, 60%, 50%)' },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="manager" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do sistema de atendimento
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total de Atendimentos"
              value={mockDashboardMetrics.totalAttendances}
              subtitle="Hoje"
              icon={MessageSquare}
              trend={{ value: 12, isPositive: true }}
              variant="primary"
            />
            <MetricCard
              title="Tempo Médio de Resposta"
              value={`${mockDashboardMetrics.avgResponseTime}min`}
              subtitle="Últimas 24h"
              icon={Clock}
              trend={{ value: 8, isPositive: false }}
              variant="success"
            />
            <MetricCard
              title="Taxa de Resolução"
              value={`${mockDashboardMetrics.resolutionRate}%`}
              subtitle="Esta semana"
              icon={TrendingUp}
              trend={{ value: 5, isPositive: true }}
              variant="warning"
            />
            <MetricCard
              title="Satisfação"
              value={mockDashboardMetrics.satisfactionScore}
              subtitle="De 5.0"
              icon={Activity}
              trend={{ value: 2, isPositive: true }}
            />
          </div>

          {/* Charts Row */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            {/* Hourly Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Atendimentos por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="hour" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                      }}
                    />
                    <Bar 
                      dataKey="atendimentos" 
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Channel Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Status Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card className="border-l-4 border-l-status-online">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Em Andamento</p>
                    <p className="text-3xl font-bold text-foreground">
                      {mockDashboardMetrics.attendancesInProgress}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-status-online" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-status-busy">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Em Espera</p>
                    <p className="text-3xl font-bold text-foreground">
                      {mockDashboardMetrics.attendancesWaiting}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-status-busy" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-status-offline">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolvidos</p>
                    <p className="text-3xl font-bold text-foreground">
                      {mockDashboardMetrics.attendancesResolved}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-status-offline" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Desempenho da Equipe
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockAttendantMetrics.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}