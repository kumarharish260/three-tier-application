import { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const Cart = ({ cartItems, updateQuantity, removeFromCart, onClose }) => {
  const [loading, setLoading] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/cart/create-checkout-session', {
        items: cartItems
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
          <p className="text-gray-600 mb-6">Seu carrinho está vazio.</p>
          <Button onClick={onClose} className="w-full">
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Carrinho de Compras</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.image_url || '/api/placeholder/80/80'}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">R$ {parseFloat(item.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total: R$ {getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continuar Comprando
            </Button>
            <Button 
              onClick={handleCheckout} 
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Finalizar Compra'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
