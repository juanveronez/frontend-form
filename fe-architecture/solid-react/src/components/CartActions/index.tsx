import { FC } from "react";
import Button from "../Button";

import Styles from "./CartActions.module.css";

interface CartActionsProps {
  onPayment: () => void;
  onRedirect: () => void;
}

const CartActions: FC<CartActionsProps> = ({ onPayment, onRedirect }) => {
  return (
    <div className={Styles.cartActions}>
      <Button onClick={onRedirect} variant="secondary">
        Continuar comprando
      </Button>
      <Button onClick={onPayment}>Ir para pagamento</Button>
    </div>
  );
};

export default CartActions;
