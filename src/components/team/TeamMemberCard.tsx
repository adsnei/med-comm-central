import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AttendantMetrics } from '@/types';
import { cn } from '@/lib/utils';
import {
  Clock,
  MessageSquare,
  TrendingUp,
  Star,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TeamMemberCardProps {
  member: AttendantMetrics;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      online: 'bg-status-online',
      busy: 'bg-status-busy',
      away: 'bg-status-away',
      offline: 'bg-status-offline',
    };
    return colors[status] || 'bg-status-offline';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      online: 'Disponível',
      busy: 'Ocupado',
      away: 'Ausente',
      offline: 'Offline',
    };
    return labels[status] || status;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="bg-gradient-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/api/avatar/${member.id}`} />
                <AvatarFallback>
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card',
                  getStatusColor(member.status)
                )}
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <Badge variant="outline" className="mt-1">
                {getStatusLabel(member.status)}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver perfil</DropdownMenuItem>
              <DropdownMenuItem>Histórico de atendimentos</DropdownMenuItem>
              <DropdownMenuItem>Alterar status</DropdownMenuItem>
              <DropdownMenuItem>Enviar mensagem</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageSquare className="mr-1 h-3 w-3" />
              Atendimentos
            </div>
            <p className="text-2xl font-bold text-foreground">
              {member.attendancesToday}
            </p>
            <p className="text-xs text-muted-foreground">
              {member.currentAttendances} em andamento
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              Tempo médio
            </div>
            <p className="text-2xl font-bold text-foreground">
              {member.avgResponseTime}min
            </p>
            <p className="text-xs text-success">-12% vs média</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                Taxa de resolução
              </span>
              <span className="font-semibold">{member.resolutionRate}%</span>
            </div>
            <Progress value={member.resolutionRate} className="mt-2 h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-muted-foreground">
                <Star className="mr-1 h-3 w-3" />
                Satisfação
              </span>
              <span className="font-semibold">{member.satisfactionScore}/5</span>
            </div>
            <Progress value={member.satisfactionScore * 20} className="mt-2 h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
}