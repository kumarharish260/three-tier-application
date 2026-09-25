import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image_url || '/api/placeholder/300/300'}
          alt={product.name}
          className="h-48 w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            R$ {parseFloat(product.price).toFixed(2)}
          </span>
          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
