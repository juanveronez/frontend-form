import styled from "styled-components";

const Button = styled.button`
  background-color: var(--azul-escuro);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--branco);
  border: none;
  margin-top: 1em;
  font-weight: 700;
  line-height: 19px;
  width: 50%;
  cursor: pointer;

  transition: background-color 0.25s ease-in-out;

  &:disabled {
    background-color: var(--cinza);
  }
`;

export default Button;
