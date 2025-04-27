import { FC } from "react";
import { Balance } from "../Balance";
import { Card, DateWrapper, GreetingWrapper, Heading } from "./styles";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

interface AccountProps {
  balance: number;
}

export const Account: FC<AccountProps> = ({ balance }) => {
  return (
    <Card>
      <GreetingWrapper>
        <DateWrapper>
          {new Date().toLocaleDateString("pt-BR", options)}
        </DateWrapper>
        <Heading>Olá, Joana! :)</Heading>
      </GreetingWrapper>
      <div>
        <Balance value={balance} />
      </div>
    </Card>
  );
};
