import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send,
  Paperclip,
  Phone,
  Calendar,
  FileText,
  HelpCircle,
  Home,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'patient' | 'clinic';
  timestamp: Date;
}

export default function PatientChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Bem-vindo ao atendimento da Clínica MedOmni. Como posso ajudá-lo hoje?',
      sender: 'clinic',
      timestamp: new Date('2024-01-20T10:00:00'),
    },
    {
      id: '2',
      content: 'Olá, gostaria de agendar uma consulta com cardiologista',
      sender: 'patient',
      timestamp: new Date('2024-01-20T10:01:00'),
    },
    {
      id: '3',
      content: 'Claro! Temos disponibilidade para consulta com Dr. Silva nas seguintes datas:\n- Segunda, 22/01 às 14h\n- Terça, 23/01 às 10h\n- Quinta, 25/01 às 16h\n\nQual horário seria melhor para você?',
      sender: 'clinic',
      timestamp: new Date('2024-01-20T10:02:00'),
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message,
        sender: 'patient',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate clinic response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Recebi sua mensagem! Um atendente irá responder em breve.',
          sender: 'clinic',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }
  };

  const quickActions = [
    { icon: Calendar, label: 'Agendar Consulta', color: 'bg-primary' },
    { icon: FileText, label: 'Resultados de Exames', color: 'bg-success' },
    { icon: Phone, label: 'Falar com Atendente', color: 'bg-info' },
    { icon: HelpCircle, label: 'Tirar Dúvidas', color: 'bg-warning' },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Home className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Clínica MedOmni</h1>
              <p className="text-sm text-muted-foreground">Atendimento Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-status-online/10 text-status-online">
              <div className="mr-1 h-2 w-2 rounded-full bg-status-online" />
              Online
            </Badge>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/api/patient-avatar" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="flex h-[600px] flex-col overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b bg-gradient-card p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/api/clinic-avatar" />
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">Atendimento MedOmni</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Tempo médio de resposta: 2 min</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex',
                        msg.sender === 'patient' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[70%] rounded-2xl px-4 py-2',
                          msg.sender === 'patient'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={cn(
                            'mt-1 text-xs',
                            msg.sender === 'patient'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          )}
                        >
                          {msg.timestamp.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend}>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-foreground">Ações Rápidas</h3>
              <div className="grid gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start"
                  >
                    <div
                      className={cn(
                        'mr-3 flex h-8 w-8 items-center justify-center rounded-lg',
                        action.color
                      )}
                    >
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    {action.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Recent Information */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-foreground">Informações Recentes</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Próxima Consulta</p>
                    <p className="text-sm text-muted-foreground">
                      25/01 às 14h - Dr. Silva (Cardiologia)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Exames Disponíveis</p>
                    <p className="text-sm text-muted-foreground">
                      2 resultados prontos para visualização
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Último Atendimento</p>
                    <p className="text-sm text-muted-foreground">
                      15/01 - Consulta de rotina
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}