import { FC, useCallback } from "react";

import { Product } from "../../common/types/product";
import Button from "../Button";
import Typography from "../Typography";
import Styles from "./CartItem.module.css";

interface CartItemProps {
  item: Product;
  onRemove: (itemId: Product["id"]) => void;
}

const CartItem: FC<CartItemProps> = ({ item, onRemove }) => {
  const handleRemove = useCallback(
    () => onRemove(item.id),
    [item.id, onRemove]
  );

  return (
    <div className={Styles.cartItem}>
      <div className={Styles.cartImageContainer}>
        <img src={item.imageSrc} alt={item.label} />
      </div>
      <div className={Styles.itemDetails}>
        <div>
          <Typography variantStyle="h6-small">{item.label}</Typography>
          <Typography variantStyle="body">{item.description}</Typography>
        </div>
        <Typography variantStyle="body-semi-bold">R$ {item.price}</Typography>
        <Typography variantStyle="body-small-bold">Quantidade: 1</Typography>
        <Typography variantStyle="body-small-bold">Tamanho: único</Typography>
        <Button onClick={handleRemove}>Excluir</Button>
      </div>
    </div>
  );
};

export default CartItem;
