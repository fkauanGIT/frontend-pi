
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const mockServices = [
  {
    id: 1,
    title: 'Desenvolvimento de Website Responsivo',
    description: 'Criação de sites modernos e responsivos com as melhores tecnologias',
    provider: 'João Silva',
    category: 'Tecnologia',
    price: 1200,
    rating: 4.8,
    reviewCount: 24,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Design Gráfico e Identidade Visual',
    description: 'Criação de logotipos, cartões de visita e material gráfico profissional',
    provider: 'Maria Santos',
    category: 'Design',
    price: 350,
    rating: 4.9,
    reviewCount: 18,
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Consultoria em Marketing Digital',
    description: 'Estratégias de marketing digital para aumentar suas vendas online',
    provider: 'Pedro Costa',
    category: 'Marketing',
    price: 800,
    rating: 4.7,
    reviewCount: 31,
    location: 'Belo Horizonte, MG',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Aulas Particulares de Inglês',
    description: 'Professora nativa com 10 anos de experiência em ensino de inglês',
    provider: 'Ana Johnson',
    category: 'Educação',
    price: 80,
    rating: 4.9,
    reviewCount: 67,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Massagem Terapêutica',
    description: 'Massagem relaxante e terapêutica para alívio do estresse',
    provider: 'Carlos Oliveira',
    category: 'Saúde',
    price: 120,
    rating: 4.6,
    reviewCount: 43,
    location: 'Brasília, DF',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'Maquiagem para Eventos',
    description: 'Maquiagem profissional para casamentos, formaturas e eventos especiais',
    provider: 'Laura Ferreira',
    category: 'Beleza',
    price: 200,
    rating: 4.8,
    reviewCount: 29,
    location: 'Salvador, BA',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop'
  }
];

const categories = ['Todos', 'Tecnologia', 'Design', 'Marketing', 'Educação', 'Saúde', 'Beleza', 'Casa', 'Eventos'];

const Services = () => {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Todos');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    let filtered = mockServices;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'Todos') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Sort services
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setServices(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Todos os Serviços
          </h1>
          <p className="text-gray-600">
            Encontre o profissional perfeito para suas necessidades
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Melhor Avaliado</SelectItem>
                <SelectItem value="price_low">Menor Preço</SelectItem>
                <SelectItem value="price_high">Maior Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {services.length} serviços encontrados
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group h-full">
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
                <CardContent className="p-6 flex-1">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-gray-700 mb-3 font-medium">por {service.provider}</p>
                  
                  <div className="flex items-center mb-3">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{service.location}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      R$ {service.price}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {service.rating} ({service.reviewCount})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum serviço encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Services;
