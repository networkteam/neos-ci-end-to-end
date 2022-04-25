import React from "react";
import classNames from "classnames";

export type Props = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Button = ({ label, onClick, disabled, className, children }: Props) => {
  return (
    <button
      className={classNames("btn", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {label || children}
    </button>
  );
};

export default Button;
