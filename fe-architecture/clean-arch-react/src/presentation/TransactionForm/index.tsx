import { useEffect, useState } from "react";
import { Form, Heading, Wrapper } from "./styles";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { TextField } from "../../components/TextField";
import { FormLabel } from "../../components/FormLabel";
import { Dropdown } from "../../components/Dropdown";
import { ListTransactionTypes } from "../../domain/useCases/ListTransactionTypes";
import { TransactionTypeSupabaseRepository } from "../../infra/supabase/TransactionTypeSupabaseRepository";
import { ITransactionType } from "../../domain/entities/ITransactionType";
import { CreateTransaction } from "../../domain/useCases/CreateTransaction";
import { TransactionSupabaseRepository } from "../../infra/supabase/TransactionSupabaseRepository";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { toast } from "react-toastify";

const listTransactionTypes = new ListTransactionTypes(
  new TransactionTypeSupabaseRepository()
);

const createTransaction = new CreateTransaction(
  new TransactionSupabaseRepository()
);

export const TransactionForm = () => {
  const [transactionTypes, setTransactionTypes] = useState<ITransactionType[]>(
    []
  );
  const { session } = useAuthContext();

  useEffect(() => {
    listTransactionTypes.execute().then(setTransactionTypes);
  }, []);

  const [transactionType, setTransactionType] = useState("");
  const [transactionValue, setTransactionValue] = useState("");

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (session) {
      try {
        await createTransaction.execute(
          parseFloat(transactionValue),
          parseInt(transactionType),
          session.user.id
        );
        setTransactionValue("");
        setTransactionType("");
        toast.success("Transação cadastrada com sucesso");
      } catch (error) {
        toast.error("Erro no cadastro da transação");
        console.error("Erro no cadastro da transação", error);
      }
    }
  };

  return (
    <Card>
      <Wrapper>
        <Form onSubmit={handleFormSubmit}>
          <Heading>Nova transação</Heading>
          <fieldset>
            <FormLabel>Transação</FormLabel>
            <Dropdown
              value={transactionType}
              onChange={(evt) => setTransactionType(evt.target.value)}
              required
            >
              <option value="" disabled hidden>
                Selecione o tipo de transação
              </option>
              {transactionTypes.map(({ id, display }) => (
                <option value={id} key={id}>
                  {display}
                </option>
              ))}
            </Dropdown>
          </fieldset>
          <fieldset>
            <FormLabel>Valor</FormLabel>
            <TextField
              placeholder="R$ 00,00"
              type="number"
              value={transactionValue}
              onChange={(evt) => setTransactionValue(evt.target.value)}
              required
            />
          </fieldset>
          <Button>Concluir transação</Button>
        </Form>
      </Wrapper>
    </Card>
  );
};
