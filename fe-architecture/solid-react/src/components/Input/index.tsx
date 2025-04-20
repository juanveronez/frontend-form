import { InputHTMLAttributes } from "react";
import Styles from "./Input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary" | "secondary";
};

const Input = ({
  variant = "primary",
  type = "text",
  ...props
}: InputProps) => <input type={type} className={Styles[variant]} {...props} />;

export default Input;
