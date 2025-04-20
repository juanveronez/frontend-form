import { ButtonHTMLAttributes } from "react";
import classnames from "classnames"; // Para combinar classes dinamicamente
import Styles from "./Button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large"; // Define diferentes tamanhos
};

const Button = ({
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) => (
  <button className={classnames(Styles[variant], Styles[size])} {...props} />
);

export default Button;
