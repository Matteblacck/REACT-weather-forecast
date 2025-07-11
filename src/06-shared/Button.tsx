import styled from "styled-components";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface StyledButtonProps {
    $active?: boolean;
  }
  
  const StyledButton = styled.button<StyledButtonProps>`
    color: ${({ $active }) => ($active ? "black" : "gray")};
    background-color: transparent;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  
    &:hover {
      color: black;
    }
  `;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    active?: boolean;
  }
  

  export default function Button({ children, active, ...props }: ButtonProps) {
    return <StyledButton $active={active} {...props}>{children}</StyledButton>;
  }