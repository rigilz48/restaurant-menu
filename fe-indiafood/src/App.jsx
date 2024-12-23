import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import DefaultLayout from './components/layout/DefaultLayout';
import NoLayout from './components/layout/NoLayout';

// Hooks
import useCart from './hooks/useCart';

// Pages
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  const {
    cart,
    setCart,
    addToCart,
    quantity,
    setQuantity,
    showAlert,
    closeAlert,
  } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman menggunakan DefaultLayout */}
        <Route
          path='/'
          element={
            <DefaultLayout cart={cart} toggleCart={toggleCart}>
              {/* Halaman Home */}
              <Home
                cart={cart}
                setCart={setCart}
                addToCart={addToCart}
                quantity={quantity}
                setQuantity={setQuantity}
                showAlert={showAlert}
                closeAlert={closeAlert}
                cartOpen={cartOpen}
                toggleCart={toggleCart}
              />
            </DefaultLayout>
          }
        />
        {/* Rute untuk halaman menggunakan NoLayout */}
        <Route
          path='*'
          element={
            <NoLayout cart={cart} toggleCart={toggleCart}>
              {/* Halaman NotFound */}
              <NotFound />
            </NoLayout>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
