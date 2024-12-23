import { useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]); // Manage the cart state
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const addToCart = (menu) => {
    // Memeriksa menu ada di keranjang
    const existingMenu = cart.findIndex(
      (item) => item.id_makanan === menu.id_makanan
    );
    if (existingMenu >= 0) {
      // Jika ada perbarui
      const updateCart = [...cart];
      updateCart[existingMenu].quantity += quantity;
      setCart(updateCart);
    } else {
      //Jika belum ada, tambahkan ke keranjang
      setCart([...cart, { ...menu, quantity }]);
    }
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return {
    cart,
    setCart,
    addToCart,
    quantity,
    setQuantity,
    showAlert,
    closeAlert,
  };
};

export default useCart;
