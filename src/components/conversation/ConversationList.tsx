import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/types';
import { cn } from '@/lib/utils';
import { MessageSquare, Clock, AlertCircle } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  const getChannelIcon = (channel: string) => {
    const icons: Record<string, string> = {
      whatsapp: '💬',
      facebook: '👤',
      instagram: '📷',
      email: '✉️',
      phone: '📞',
      website: '🌐',
    };
    return icons[channel] || '💬';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'bg-destructive text-destructive-foreground',
      high: 'bg-warning text-warning-foreground',
      medium: 'bg-info text-info-foreground',
      low: 'bg-muted text-muted-foreground',
    };
    return colors[priority] || 'bg-muted';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      waiting: 'bg-warning',
      in_progress: 'bg-success',
      resolved: 'bg-muted',
      escalated: 'bg-destructive',
    };
    return colors[status] || 'bg-muted';
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-4">
        {conversations.map((conversation) => {
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          const isSelected = selectedId === conversation.id;

          return (
            <div
              key={conversation.id}
              onClick={() => onSelect(conversation)}
              className={cn(
                'cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md',
                isSelected
                  ? 'border-primary bg-accent'
                  : 'border-border bg-card hover:bg-card-hover'
              )}
            >
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.patient.avatar} />
                  <AvatarFallback>
                    {conversation.patient.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">
                        {conversation.patient.name}
                      </h3>
                      <span className="text-lg">
                        {getChannelIcon(conversation.channel)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={cn('text-xs', getPriorityColor(conversation.priority))}
                      >
                        {conversation.priority}
                      </Badge>
                      <div
                        className={cn(
                          'h-2 w-2 rounded-full',
                          getStatusColor(conversation.status)
                        )}
                      />
                    </div>
                  </div>

                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {lastMessage?.content}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      {conversation.waitingTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{conversation.waitingTime}min</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{conversation.messages.length}</span>
                      </div>
                    </div>
                    <span>
                      {new Date(conversation.updatedAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {conversation.tags && conversation.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {conversation.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}