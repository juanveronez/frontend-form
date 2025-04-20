import { CSSProperties } from "react";
import Styles from "./Input.module.css";

export type InputProps = {
  variant?: "primary" | "secondary";
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  style?: CSSProperties;
  type?: string;
};

const Input = ({
  variant = "primary",
  onChange,
  placeholder,
  id,
  style,
  type = "text",
  ...props
}: InputProps) => (
  <input
    type={type}
    style={style}
    className={Styles[variant]}
    {...props}
    onChange={() => onChange}
    id={id}
    placeholder={placeholder}
  />
);

export default Input;
