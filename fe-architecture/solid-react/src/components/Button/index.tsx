import { CSSProperties, MouseEvent, ReactNode } from "react";
import classnames from "classnames"; // Para combinar classes dinamicamente
import Styles from "./Button.module.css";

type ButtonProps = {
  style?: CSSProperties;
  children?: ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large"; // Define diferentes tamanhos
  onClick: (e: MouseEvent<HTMLElement>) => void; // Manipulação de click adicional
};

const Button = ({
  children,
  variant = "primary",
  size = "medium",

  onClick,
  style,
  ...props
}: ButtonProps) => (
  <button
    style={style}
    className={classnames(Styles[variant], Styles[size])}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export default Button;
