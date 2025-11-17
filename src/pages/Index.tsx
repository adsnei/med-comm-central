import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  HeadphonesIcon, 
  MessageSquare,
  Activity,
  ArrowRight,
  CheckCircle,
  LogIn
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, signOut } = useAuth();
  
  const userTypes = [
    {
      title: 'Gerente',
      description: 'Dashboard completo com métricas, gestão de equipe e monitoramento em tempo real',
      icon: Users,
      path: '/manager',
      color: 'bg-gradient-primary',
      features: ['Analytics em tempo real', 'Gestão de equipe', 'Relatórios detalhados']
    },
    {
      title: 'Atendente',
      description: 'Interface unificada para gerenciar todas as conversas em múltiplos canais',
      icon: HeadphonesIcon,
      path: '/attendant',
      color: 'bg-gradient-health',
      features: ['Inbox unificado', 'Respostas rápidas', 'Histórico de pacientes']
    },
    {
      title: 'Paciente',
      description: 'Chat direto com a clínica para agendamentos e atendimento rápido',
      icon: MessageSquare,
      path: '/patient',
      color: 'bg-info',
      features: ['Chat em tempo real', 'Agendamento online', 'Histórico de consultas']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
              <Activity className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Sistema Omnichannel MedOmni
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Plataforma integrada de atendimento médico que unifica todos os canais de comunicação
            em uma única interface inteligente
          </p>
          
          <div className="mt-8 flex gap-4 justify-center">
            {user ? (
              <Button onClick={signOut} variant="outline" size="lg">
                Sair
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/auth">
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar / Criar Conta
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {userTypes.map((type) => (
            <Card key={type.path} className="overflow-hidden transition-all hover:shadow-xl">
              <div className={`h-2 ${type.color}`} />
              <div className="p-6">
                <div className={`mb-4 inline-flex rounded-lg p-3 ${type.color}`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">{type.title}</h2>
                <p className="mb-4 text-muted-foreground">{type.description}</p>
                
                <div className="mb-6 space-y-2">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="mr-2 h-4 w-4 text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={type.path}>
                  <Button className="w-full group">
                    Acessar como {type.title}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-card p-8 text-center shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-foreground">
            Arquitetura do Sistema
          </h3>
          <div className="grid gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Integração Omnichannel</p>
                <p className="text-sm text-muted-foreground">WhatsApp, Facebook, Instagram, E-mail</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Fila Inteligente</p>
                <p className="text-sm text-muted-foreground">Distribuição automática de atendimentos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Analytics em Tempo Real</p>
                <p className="text-sm text-muted-foreground">Métricas e KPIs atualizados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;