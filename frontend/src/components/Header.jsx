import { ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = ({ cartItems = 0, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">E-commerce</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5 mr-2" />
              Login
            </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Carrinho
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
