import { useForm } from "react-hook-form";
import {
  Button,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from "../../components";

interface AddressResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface FormData {
  code: string;
  street: string;
  number: number;
  neighborhood: string;
  location: string;
}

const CadastroEndereco = () => {
  const { register, handleSubmit, setError, setValue, watch } =
    useForm<FormData>();

  const handleValid = (data: FormData) => {
    console.log(data);
  };

  const fetchAddress = async (code: string) => {
    try {
      if (!code) throw new Error();

      const res = await fetch(`http://viacep.com.br/ws/${code}/json/`);

      if (!res.ok) throw new Error();

      const data: AddressResponse = await res.json();

      setValue("street", data.logradouro);
      setValue("location", `${data.localidade}, ${data.uf}`);
      setValue("neighborhood", data.bairro);
    } catch (e) {
      setError("code", { type: "deps", message: "CEP inválido" });
    }
  };

  const codeValue = watch("code");

  return (
    <>
      <Titulo>Agora, mais alguns dados sobre você:</Titulo>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Input
            id="campo-cep"
            placeholder="Insira seu CEP"
            type="text"
            {...register("code", {
              required: "Campo obrigatório",
              onBlur: () => fetchAddress(codeValue),
            })}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input
            id="campo-rua"
            placeholder="Rua Agarikov"
            type="text"
            {...register("street", { required: "Campo obrigatório" })}
          />
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input
              id="campo-numero-rua"
              placeholder="Ex: 1440"
              type="text"
              {...register("number", { required: "Campo obrigatório" })}
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input
              id="campo-bairro"
              placeholder="Vila Mariana"
              type="text"
              {...register("neighborhood", { required: "Campo obrigatório" })}
            />
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
            {...register("location", { required: "Campo obrigatório" })}
          />
        </Fieldset>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default CadastroEndereco;
