import React from 'react';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-contain bg-gray-100 p-4"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate">{title}</h3>
        <p className="text-blue-600 font-semibold mb-2">${price.toFixed(2)}</p>
        <div className="flex items-center text-yellow-500 mb-2">
          {'★'.repeat(Math.floor(rating.rate))}{' '}
          <span className="text-gray-500 text-sm ml-1">({rating.count} reviews)</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;