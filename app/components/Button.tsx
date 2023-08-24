import clsx from "clsx";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  mode?: "invisible" | "primary" | "secondary";
};

export const Button: FC<Props> = ({ text, mode = "primary", ...restProps }) => {
  return (
    <button
      {...restProps}
      className={clsx({
        [styles["button-invisible"]]: mode === "invisible",
        [styles["button-primary"]]: mode === "primary",
        [styles["button-secondary"]]: mode === "secondary",
      })}
    >
      {text}
    </button>
  );
};
