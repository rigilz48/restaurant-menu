import { useState, useEffect } from 'react';

// Assets
import Banner1 from '../assets/images/banner1.webp';
import Banner2 from '../assets/images/banner2.webp';
import Banner3 from '../assets/images/banner3.webp';

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideshowImages] = useState([Banner1, Banner2, Banner3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % slideshowImages.length
      );
    }, 3000); // Ganti gambar setiap 3 detik
    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, [slideshowImages.length]);

  return (
    <div className='relative overflow-hidden rounded-b-3xl slideshow-container'>
      {slideshowImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          loading='lazy'
          className={`slideshow-image ${
            index === currentImageIndex
              ? 'active'
              : index ===
                (currentImageIndex - 1 + slideshowImages.length) %
                  slideshowImages.length
              ? 'prev'
              : ''
          }`}
        />
      ))}
      <div className='absolute top-0 left-0 w-full h-full bg-orange-600 bg-opacity-80 flex flex-col justify-center items-center z-[5]'>
        <h1 className='text-white text-2xl md:text-4xl font-bold text-center'>
          Nikmati Makanan Khas India!
        </h1>
        <p className='text-white mt-2 text-center'>
          Pesan berbagai makanan khas India seperti Nasi Biryani, Chicken Tikka,
          dan Butter Naan secara online. Cepat, mudah, dan banyak pilihan!
        </p>
      </div>
    </div>
  );
};

export default Banner;
