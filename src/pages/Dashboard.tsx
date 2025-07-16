
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Star, 
  Heart, 
  FileText, 
  Bell, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  // Simular dados do usuário - em produção viria do contexto de autenticação
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = localStorage.getItem('userType') || 'client';

  const mockContracts = [
    {
      id: 1,
      service: 'Desenvolvimento de Website',
      client: 'Maria Silva',
      provider: 'João Santos',
      status: 'em_andamento',
      price: 1200,
      deadline: '2024-02-15',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      service: 'Design de Logo',
      client: 'Pedro Costa',
      provider: 'Ana Design',
      status: 'concluido',
      price: 350,
      deadline: '2024-01-20',
      createdAt: '2024-01-05'
    }
  ];

  const mockServices = [
    {
      id: 1,
      title: 'Desenvolvimento Web Responsivo',
      category: 'Tecnologia',
      price: 1200,
      status: 'ativo',
      views: 145,
      favorites: 23,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Consultoria em SEO',
      category: 'Marketing',
      price: 500,
      status: 'pausado',
      views: 89,
      favorites: 12,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop'
    }
  ];

  const mockFavorites = [
    {
      id: 1,
      title: 'Design Gráfico Profissional',
      provider: 'Maria Santos',
      price: 350,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Aulas de Inglês',
      provider: 'John Teacher',
      price: 80,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop'
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: 'contract',
      title: 'Nova proposta recebida',
      message: 'Você recebeu uma nova proposta para o serviço "Desenvolvimento Web"',
      date: '2024-01-15',
      read: false
    },
    {
      id: 2,
      type: 'rating',
      title: 'Nova avaliação',
      message: 'Você recebeu uma avaliação de 5 estrelas de Maria Silva',
      date: '2024-01-14',
      read: true
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'ativo': { label: 'Ativo', variant: 'default' as const },
      'pausado': { label: 'Pausado', variant: 'secondary' as const },
      'em_andamento': { label: 'Em Andamento', variant: 'default' as const },
      'concluido': { label: 'Concluído', variant: 'outline' as const },
      'cancelado': { label: 'Cancelado', variant: 'destructive' as const }
    };
    return statusMap[status] || { label: status, variant: 'default' as const };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Olá, {user.name || 'Usuário'}!
              </h1>
              <p className="text-gray-600">
                {userType === 'provider' ? 'Prestador de Serviços' : 'Cliente'}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">R$ 2.450</h3>
                <p className="text-sm text-gray-600">Ganhos Totais</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{mockContracts.length}</h3>
                <p className="text-sm text-gray-600">Contratos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">4.8</h3>
                <p className="text-sm text-gray-600">Avaliação</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">12</h3>
                <p className="text-sm text-gray-600">Concluídos</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="contracts">Contratos</TabsTrigger>
            {userType === 'provider' && <TabsTrigger value="services">Meus Serviços</TabsTrigger>}
            {userType === 'client' && <TabsTrigger value="favorites">Favoritos</TabsTrigger>}
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>

          {/* Contratos */}
          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>Meus Contratos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockContracts.map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{contract.service}</h3>
                          <p className="text-gray-600">
                            {userType === 'provider' ? `Cliente: ${contract.client}` : `Prestador: ${contract.provider}`}
                          </p>
                        </div>
                        <Badge variant={getStatusBadge(contract.status).variant}>
                          {getStatusBadge(contract.status).label}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Valor: R$ {contract.price}</span>
                        <span>Prazo: {new Date(contract.deadline).toLocaleDateString('pt-BR')}</span>
                        <Link to={`/contracts/${contract.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meus Serviços (apenas para prestadores) */}
          {userType === 'provider' && (
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Meus Serviços</CardTitle>
                    <Link to="/services/new">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Serviço
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {mockServices.map((service) => (
                      <Card key={service.id} className="overflow-hidden">
                        <div className="relative">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-40 object-cover"
                          />
                          <Badge 
                            className="absolute top-2 right-2"
                            variant={getStatusBadge(service.status).variant}
                          >
                            {getStatusBadge(service.status).label}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{service.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{service.category}</p>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold text-blue-600">R$ {service.price}</span>
                            <div className="flex space-x-2 text-sm text-gray-600">
                              <span>{service.views} visualizações</span>
                              <span>{service.favorites} ♥</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit className="w-4 h-4 mr-1" />
                              Editar
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Favoritos (apenas para clientes) */}
          {userType === 'client' && (
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Favoritos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockFavorites.map((favorite) => (
                      <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <img 
                          src={favorite.image} 
                          alt={favorite.title}
                          className="w-full h-40 object-cover"
                        />
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{favorite.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">por {favorite.provider}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">R$ {favorite.price}</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm">{favorite.rating}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Link to={`/services/${favorite.id}`} className="flex-1">
                              <Button size="sm" className="w-full">Ver Serviço</Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              <Heart className="w-4 h-4 text-red-500 fill-current" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Notificações */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'} transition-colors`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <Bell className="w-4 h-4 text-blue-600 mr-2" />
                            <h3 className="font-semibold">{notification.title}</h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{notification.message}</p>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
