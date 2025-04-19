import { FC } from "react";
import CartItem from "../CartItem";
import CartEmptyMessage from "../CartEmptyMessage";
import { Product } from "../../common/types/product";
import Typography from "../Typography";

import Styles from "./CartList.module.css";

interface CartListProps {
  cartItems: Product[];
  onRemoveItem: (itemId: Product["id"]) => void;
}

const CartList: FC<CartListProps> = ({ cartItems, onRemoveItem }) => {
  return (
    <div className={Styles.cartItems}>
      <Typography variantStyle="body-large-bold">Detalhes da compra</Typography>
      {cartItems?.length > 0 ? (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemove={onRemoveItem} />
        ))
      ) : (
        <CartEmptyMessage />
      )}
    </div>
  );
};

export default CartList;
