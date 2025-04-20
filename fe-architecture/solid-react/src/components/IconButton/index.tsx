import { FC } from "react";
import Button, { ButtonProps } from "../Button";

type IconButtonProps = ButtonProps;

const IconButton: FC<IconButtonProps> = ({ children, style, ...props }) => (
  <Button {...props} style={{ gap: "8px", ...style }}>
    {children}
  </Button>
);

export default IconButton;
