import { z } from "zod";
import {
  Button,
  Divisor,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
  UploadDescription,
  UploadIcon,
  UploadInput,
  UploadLabel,
  UploadTitulo,
} from "../../components";
import { useForm } from "react-hook-form";

const especialistaEnderecoSchema = z.object({
  endereco: z.object({
    cep: z
      .string()
      .min(1, "Este campo é obrigatório")
      .min(9, "Informe um CEP válido"),
    rua: z.string().min(1, "Este campo é obrigatório"),
    numero: z.coerce
      .number({
        invalid_type_error: "Este campo é numérico",
      })
      .min(1, "Este campo é obrigatório"),
    bairro: z.string().min(1, "Este campo é obrigatório"),
    localidade: z.string().min(1, "Este campo é obrigatório"),
  }),
});

type FormEspecialistaEndereco = z.infer<typeof especialistaEnderecoSchema>;

const CadastroEspecialistaEndereco = () => {
  useForm<FormEspecialistaEndereco>({
    defaultValues: {
      endereco: {
        bairro: "",
        cep: "",
        localidade: "",
        numero: 0,
        rua: "",
      },
    },
  });

  return (
    <>
      <Titulo className="titulo">Para finalizar, só alguns detalhes!</Titulo>
      <Form>
        <>
          <UploadTitulo>Sua foto</UploadTitulo>
          <UploadLabel htmlFor="campo-upload">
            <UploadIcon />
            <UploadDescription>Clique para enviar</UploadDescription>
            <UploadInput accept="image/*" id="campo-upload" type="file" />
          </UploadLabel>
        </>

        <Divisor />
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Input id="campo-cep" placeholder="Insira seu CEP" type="text" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input id="campo-rua" placeholder="Rua Agarikov" type="text" />
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input id="campo-numero-rua" placeholder="Ex: 1440" type="text" />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input id="campo-bairro" placeholder="Vila Mariana" type="text" />
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
          />
        </Fieldset>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default CadastroEspecialistaEndereco;
