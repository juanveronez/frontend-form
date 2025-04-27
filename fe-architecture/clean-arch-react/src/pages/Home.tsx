import styled from "styled-components";
import { Sidebar } from "../presentation/Sidebar";
import { Account } from "../presentation/Account";
import { Statement } from "../presentation/Statement";
import { TransactionForm } from "../presentation/TransactionForm";
import { ITransaction } from "../domain/entities/ITransaction";
import { useEffect, useState } from "react";
import { ListAllTransactions } from "../domain/useCases/ListAllTransactions";
import { TransactionSupabaseRepository } from "../infra/supabase/TransactionSupabaseRepository";

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const INCOME_ID = 1;

const listAllTransactions = new ListAllTransactions(
  new TransactionSupabaseRepository()
);

const Home = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    listAllTransactions.execute().then(setTransactions);
  }, []);

  const balance = transactions.reduce((acc, { type, value }) => {
    return acc + (type.id === INCOME_ID ? 1 : -1) * value;
  }, 0);

  return (
    <>
      <Sidebar />
      <Main>
        <Account balance={balance} />
        <TransactionForm />
      </Main>
      {!!transactions.length && (
        <div>
          <Statement allTransactions={transactions} />
        </div>
      )}
    </>
  );
};

export default Home;
