import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Success from './components/Success';
import Cancel from './components/Cancel';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setCartItems([]);
  };

  // Check URL for success/cancel pages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (window.location.pathname === '/success') {
      setCurrentPage('success');
    } else if (window.location.pathname === '/cancel') {
      setCurrentPage('cancel');
    }
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'success':
        return <Success onBackToHome={handleBackToHome} />;
      case 'cancel':
        return <Cancel onBackToHome={handleBackToHome} />;
      default:
        return <Home onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItems={getTotalItems()} 
        onCartClick={handleCartClick}
      />
      <main>
        {renderCurrentPage()}
      </main>
      
      {showCart && (
        <Cart
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          onClose={handleCloseCart}
        />
      )}
    </div>
  );
}

export default App;
