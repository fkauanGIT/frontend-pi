
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText, 
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ContractDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - em produção viria da API
  const contract = {
    id: parseInt(id || '1'),
    service: {
      title: 'Desenvolvimento de Website Responsivo',
      description: 'Criação de site moderno e responsivo para empresa',
      category: 'Tecnologia'
    },
    client: {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8e4?w=150&h=150&fit=crop&crop=face'
    },
    provider: {
      id: 2,
      name: 'João Santos',
      email: 'joao@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    status: 'em_andamento',
    price: 1200,
    createdAt: '2024-01-10',
    deadline: '2024-02-15',
    description: 'Preciso de um site responsivo para minha empresa de consultoria. O site deve ter as páginas: Home, Sobre, Serviços e Contato.',
    requirements: [
      'Design moderno e responsivo',
      'Otimização para SEO',
      'Integração com redes sociais',
      'Formulário de contato funcional'
    ]
  };

  const messages = [
    {
      id: 1,
      sender: 'client',
      senderName: 'Maria Silva',
      content: 'Olá João! Estou ansiosa para ver como o projeto está evoluindo.',
      timestamp: '2024-01-12T10:30:00Z',
      read: true
    },
    {
      id: 2,
      sender: 'provider',
      senderName: 'João Santos',
      content: 'Oi Maria! O projeto está indo muito bem. Já finalizei o design das páginas principais e estou começando a programação.',
      timestamp: '2024-01-12T14:15:00Z',
      read: true
    },
    {
      id: 3,
      sender: 'client',
      senderName: 'Maria Silva',
      content: 'Perfeito! Você poderia me enviar uma prévia para eu dar uma olhada?',
      timestamp: '2024-01-13T09:00:00Z',
      read: true
    },
    {
      id: 4,
      sender: 'provider',
      senderName: 'João Santos',
      content: 'Claro! Vou preparar um link de demonstração e te envio ainda hoje.',
      timestamp: '2024-01-13T11:30:00Z',
      read: false
    }
  ];

  const getStatusInfo = (status: string) => {
    const statusMap = {
      'pendente': { 
        label: 'Pendente', 
        variant: 'secondary' as const, 
        icon: Clock,
        description: 'Aguardando confirmação'
      },
      'em_andamento': { 
        label: 'Em Andamento', 
        variant: 'default' as const, 
        icon: AlertCircle,
        description: 'Projeto em desenvolvimento'
      },
      'concluido': { 
        label: 'Concluído', 
        variant: 'outline' as const, 
        icon: CheckCircle,
        description: 'Projeto finalizado com sucesso'
      },
      'cancelado': { 
        label: 'Cancelado', 
        variant: 'destructive' as const, 
        icon: AlertCircle,
        description: 'Contrato cancelado'
      }
    };
    return statusMap[status] || statusMap['pendente'];
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      // Simular envio de mensagem
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada com sucesso."
      });
      
      setNewMessage('');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      // Simular atualização de status
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Status atualizado!",
        description: `O contrato foi marcado como ${getStatusInfo(newStatus).label.toLowerCase()}.`
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        variant: "destructive"
      });
    }
  };

  const statusInfo = getStatusInfo(contract.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Contrato #{contract.id}
            </h1>
            <Badge variant={statusInfo.variant} className="text-sm px-3 py-1">
              <StatusIcon className="w-4 h-4 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
          <p className="text-gray-600">{statusInfo.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Detalhes do Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">{contract.service.title}</h3>
                <Badge variant="outline" className="mb-4">{contract.service.category}</Badge>
                <p className="text-gray-700 mb-4">{contract.description}</p>
                
                <h4 className="font-semibold mb-2">Requisitos:</h4>
                <ul className="space-y-1">
                  {contract.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Mensagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'client' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className={`text-xs mt-1 ${
                          message.sender === 'client' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.senderName} • {new Date(message.timestamp).toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-4" />

                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={loading || !newMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contract Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Contrato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Valor:</span>
                  <span className="text-2xl font-bold text-green-600">R$ {contract.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Criado em:</span>
                  <span>{new Date(contract.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Prazo:</span>
                  <span>{new Date(contract.deadline).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle>Participantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Client */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={contract.client.avatar} 
                    alt={contract.client.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{contract.client.name}</p>
                    <p className="text-sm text-gray-600">Cliente</p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Provider */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={contract.provider.avatar} 
                    alt={contract.provider.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{contract.provider.name}</p>
                    <p className="text-sm text-gray-600">Prestador</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {contract.status === 'em_andamento' && (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateStatus('concluido')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Concluído
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContractDetail;
