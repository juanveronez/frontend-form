import { FC, ReactNode } from "react";
import Input, { InputProps } from "../Input";

import Styles from "./IconInput.module.css";

type IconInputProps = InputProps & {
  children: ReactNode;
};

const IconInput: FC<IconInputProps> = ({ children, ...props }) => {
  return (
    <div className={Styles.container}>
      <Input {...props} />
      <div className={Styles.iconContainer}>{children}</div>
    </div>
  );
};

export default IconInput;
