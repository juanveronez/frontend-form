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

const listAllTransactions = new ListAllTransactions(
  new TransactionSupabaseRepository()
);

const Home = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    listAllTransactions.execute().then(setTransactions);
  }, []);

  return (
    <>
      <Sidebar />
      <Main>
        <Account />
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
