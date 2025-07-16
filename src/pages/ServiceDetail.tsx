
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, MapPin, Clock, Shield, User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ServiceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - em produção viria da API
  const service = {
    id: parseInt(id || '1'),
    title: 'Desenvolvimento de Website Responsivo',
    description: 'Desenvolvimento completo de websites modernos e responsivos utilizando as melhores tecnologias do mercado. Inclui design personalizado, otimização para dispositivos móveis, integração com redes sociais e sistema de gerenciamento de conteúdo.',
    provider: {
      id: 1,
      name: 'João Silva',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 47,
      completedProjects: 156,
      responseTime: '2 horas',
      memberSince: '2022'
    },
    category: 'Tecnologia',
    price: 1200,
    rating: 4.8,
    reviewCount: 24,
    location: 'São Paulo, SP',
    deliveryTime: '7-14 dias',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop'
    ],
    features: [
      'Design responsivo para todos os dispositivos',
      'Otimização para mecanismos de busca (SEO)',
      'Integração com redes sociais',
      'Painel administrativo incluído',
      'Suporte técnico por 30 dias',
      'Certificado SSL gratuito'
    ]
  };

  const reviews = [
    {
      id: 1,
      user: 'Maria Oliveira',
      rating: 5,
      comment: 'Excelente trabalho! João entregou exatamente o que foi prometido e ainda antes do prazo.',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Carlos Santos',
      rating: 4,
      comment: 'Muito profissional e atencioso. O site ficou perfeito e o suporte pós-entrega foi excepcional.',
      date: '2024-01-10'
    },
    {
      id: 3,
      user: 'Ana Costa',
      rating: 5,
      comment: 'Recomendo totalmente! Comunicação clara e resultado surpreendente.',
      date: '2024-01-05'
    }
  ];

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorited 
        ? "O serviço foi removido da sua lista de favoritos."
        : "O serviço foi adicionado à sua lista de favoritos."
    });
  };

  const handleHireService = () => {
    // Verificar se usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para contratar um serviço.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Solicitação enviada!",
      description: "Sua solicitação de contratação foi enviada ao prestador."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Início</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-blue-600">Serviços</Link>
          <span>/</span>
          <span className="text-gray-800">{service.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4">
                <img 
                  src={service.images[selectedImage]} 
                  alt={service.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
                <Badge className="absolute top-4 left-4 bg-white text-gray-800">
                  {service.category}
                </Badge>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${service.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Info */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{service.rating} ({service.reviewCount} avaliações)</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{service.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFavorite}
                    className={isFavorited ? 'text-red-600 border-red-600' : ''}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  {service.description}
                </p>

                <h3 className="font-semibold text-lg mb-4">O que está incluído:</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Shield className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Avaliações ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                            {review.user.charAt(0)}
                          </div>
                          <span className="font-medium">{review.user}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                      <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Pricing Card */}
            <Card className="sticky top-8 mb-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">R$ {service.price}</span>
                  <p className="text-gray-600">por projeto</p>
                </div>

                <div className="space-y-4 mb-6">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleHireService}
                  >
                    Contratar Serviço
                  </Button>
                  <Button variant="outline" className="w-full">
                    Enviar Mensagem
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 inline-block mr-1" />
                  Pagamento protegido pela plataforma
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sobre o Prestador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <img 
                    src={service.provider.avatar} 
                    alt={service.provider.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{service.provider.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{service.provider.rating} ({service.provider.reviewCount} avaliações)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projetos concluídos:</span>
                    <span className="font-medium">{service.provider.completedProjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tempo de resposta:</span>
                    <span className="font-medium">{service.provider.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membro desde:</span>
                    <span className="font-medium">{service.provider.memberSince}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <User className="w-4 h-4 mr-2" />
                  Ver Perfil Completo
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

export default ServiceDetail;
