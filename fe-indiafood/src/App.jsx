import { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home/Home';

function App() {
  const [CartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  function toggleCart() {
    setCartOpen(!CartOpen);
  }

  function addToCart(menu) {
    setCart([...cart, menu]);
  }

  return (
    <>
      <div className='bg-gray-50 flex flex-col min-h-screen'>
        <Header cart={cart} toggleCart={toggleCart} />
        <main className='container mx-auto px-6 py-8 flex-grow'>
          <Home
            cart={cart}
            addToCart={addToCart}
            CartOpen={CartOpen}
            toggleCart={toggleCart}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
