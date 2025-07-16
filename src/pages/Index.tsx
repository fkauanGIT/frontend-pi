
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Users, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const featuredServices = [
  {
    id: 1,
    title: 'Desenvolvimento de Website',
    provider: 'João Silva',
    category: 'Tecnologia',
    price: 'R$ 1.200',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Design Gráfico Profissional',
    provider: 'Maria Santos',
    category: 'Design',
    price: 'R$ 350',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Consultoria em Marketing',
    provider: 'Pedro Costa',
    category: 'Marketing',
    price: 'R$ 800',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop'
  }
];

const categories = [
  'Tecnologia', 'Design', 'Marketing', 'Educação', 'Saúde', 'Beleza', 'Casa', 'Eventos'
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Conecte-se aos Melhores
            <br />
            Profissionais
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plataforma de economia compartilhada onde você encontra os melhores serviços e profissionais qualificados para suas necessidades.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-4 p-2 bg-white rounded-2xl shadow-lg">
            <div className="flex-1 flex items-center">
              <Search className="w-5 h-5 text-gray-400 ml-4" />
              <Input 
                placeholder="O que você precisa?" 
                className="border-0 focus-visible:ring-0 text-lg"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl">
              Buscar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">10,000+</h3>
            <p className="text-gray-600">Profissionais</p>
          </div>
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl">
            <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">4.8/5</h3>
            <p className="text-gray-600">Avaliação Média</p>
          </div>
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">50,000+</h3>
            <p className="text-gray-600">Projetos Concluídos</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Explore por Categoria
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category} 
              to={`/services?category=${category}`}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 text-center group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Serviços em Destaque
          </h2>
          <Link to="/services">
            <Button variant="outline" className="hover:bg-blue-50">
              Ver Todos
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-sm font-semibold text-gray-800">{service.category}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-3">por {service.provider}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de profissionais e clientes que já transformaram seus negócios
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Criar Conta
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                Explorar Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
