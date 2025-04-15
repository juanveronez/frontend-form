import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  ButtonContainer,
  Divisor,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from "../../components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";

const especialistaTecnicoSchema = z.object({
  crm: z.string().min(1, "Este campo é obrigatório"),
  especialidades: z.array(
    z.object({
      especialidade: z.string().min(1, "Este campo é obrigatório"),
      anoConclusao: z.number().min(1, "Este campo é obrigatório"),
      instituicao: z.string().min(1, "Este campo é obrigatório"),
    })
  ),
});

type FormEspecialistaTecnico = z.infer<typeof especialistaTecnicoSchema>;

const CadastroEspecialistaTecnico = () => {
  const { register, handleSubmit, control } = useForm<FormEspecialistaTecnico>({
    resolver: zodResolver(especialistaTecnicoSchema),
  });

  const { append, fields } = useFieldArray({
    control,
    name: "especialidades",
  });

  const addField = () =>
    append({
      especialidade: "",
      instituicao: "",
      anoConclusao: 0,
    });

  const handleValid = (data: FormEspecialistaTecnico) => {
    console.log(data);
  };

  return (
    <>
      <Titulo className="titulo">Agora, seus dados técnicos:</Titulo>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Fieldset>
          <Label>CRM</Label>
          <Input
            id="campo-crm"
            type="text"
            placeholder="Insira seu número de registro"
            {...register("crm")}
          />
        </Fieldset>
        <Divisor />
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <Fieldset>
              <Label>Especialidade</Label>
              <Input
                id="campo-especialidade"
                type="text"
                placeholder="Qual sua especialidade?"
                {...register(`especialidades.${index}.especialidade`)}
              />
            </Fieldset>

            <FormContainer>
              <Fieldset>
                <Label>Ano de conclusão</Label>
                <Input
                  id="campo-ano-conclusao"
                  type="text"
                  placeholder="2005"
                  {...register(`especialidades.${index}.anoConclusao`, {
                    valueAsNumber: true,
                  })}
                />
              </Fieldset>
              <Fieldset>
                <Label>Instituição de ensino</Label>
                <Input
                  id="campo-instituicao-ensino"
                  type="text"
                  placeholder="USP"
                  {...register(`especialidades.${index}.instituicao`)}
                />
              </Fieldset>
            </FormContainer>
            <Divisor />
          </Fragment>
        ))}
        <ButtonContainer>
          <Button onClick={addField} type="button" $variante="secundario">
            Adicionar Especialidade
          </Button>
        </ButtonContainer>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroEspecialistaTecnico;
