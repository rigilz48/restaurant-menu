import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import DefaultLayout from './components/layout/DefaultLayout';
import NoLayout from './components/layout/NoLayout';

// Hooks
import useCart from './hooks/useCart';

// Pages
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';

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
        <Route element={<DefaultLayout cart={cart} toggleCart={toggleCart} />}>
          {/* Halaman Home */}
          <Route
            path='/'
            element={
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
            }
          />

          {/* Halaman Home */}
          <Route path='/login' element={<Login />} />
        </Route>

        {/* Rute untuk halaman menggunakan NoLayout */}
        <Route element={<NoLayout />}>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
