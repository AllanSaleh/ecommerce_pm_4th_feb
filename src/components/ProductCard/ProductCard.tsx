import { Product } from '../../types/types';
import './ProductCard.css';
import { productCard } from './ProductCardStyles';
import { useCart } from '../../context/CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={productCard}>
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <img id='productImage' src={product.image} alt={product.title} />
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};
export default ProductCard;
