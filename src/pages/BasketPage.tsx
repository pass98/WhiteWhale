import { useCart } from '@/components/context/CartContext';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BasketPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useCart();

  const navigate = useNavigate();
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartQuantity(productId, quantity);
  };

  const goToBuyProductPage = () => {
    navigate('/buyprodcut');
  };
  console.log('현재 장바구니는?', cart);
  return (
    <div className="w-ful pl-20 pr-20">
      <h2 className="text-2xl mb-4">장바구니</h2>
      {cart.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <ul>
          {cart.map(product => (
            <li key={product.id} className="mb-4 border-b pb-4">
              <div className="flex items-center">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-1" id="midSection">
                  <h3 className="text-xl">{product.productName}</h3>
                  <p>가격: {product.productPrice}원</p>
                  <div className="flex items-center mt-2">
                    <Button
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity - 1)
                      }
                      className="size-6 px-2 mr-2"
                    >
                      -
                    </Button>
                    <span>{product.quantity}</span>
                    <Button
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity + 1)
                      }
                      className="size-6 px-2 ml-2"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => removeFromCart(product.id)}
                  className="size-10 ml-2"
                >
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button onClick={goToBuyProductPage}>구매하기</Button>
      <div className="">
        {cart.map(product => product.productPrice * product.quantity)}원
      </div>
    </div>
  );
};

export default BasketPage;
