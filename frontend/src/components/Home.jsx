import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === parseInt(selectedCategory));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao nosso E-commerce</h1>
        <p className="text-xl">Encontre os melhores produtos com os melhores preços!</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categorias</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            Todas
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id.toString() ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id.toString())}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Produtos</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
