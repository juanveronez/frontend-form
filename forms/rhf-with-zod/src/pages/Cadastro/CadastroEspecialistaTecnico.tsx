import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  ButtonContainer,
  Divisor,
  ErrorMessage,
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
      anoConclusao: z.coerce
        .number({
          invalid_type_error: "Este campo é numérico",
        })
        .min(1, "Este campo é obrigatório"),
      instituicao: z.string().min(1, "Este campo é obrigatório"),
    })
  ),
});

type FormEspecialistaTecnico = z.infer<typeof especialistaTecnicoSchema>;

const CadastroEspecialistaTecnico = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormEspecialistaTecnico>({
    resolver: zodResolver(especialistaTecnicoSchema),
    mode: "all",
    defaultValues: {
      crm: "",
      especialidades: [
        {
          especialidade: "",
          instituicao: "",
          anoConclusao: 0,
        },
      ],
    },
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
            $error={!!errors.crm}
            {...register("crm")}
          />
          {errors.crm && <ErrorMessage>{errors.crm.message}</ErrorMessage>}
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
                $error={!!errors.especialidades?.[index]?.especialidade}
                {...register(`especialidades.${index}.especialidade`)}
              />
              {errors.especialidades?.[index]?.especialidade && (
                <ErrorMessage>
                  {errors.especialidades?.[index]?.especialidade.message}
                </ErrorMessage>
              )}
            </Fieldset>

            <FormContainer>
              <Fieldset>
                <Label>Ano de conclusão</Label>
                <Input
                  id="campo-ano-conclusao"
                  type="text"
                  placeholder="2005"
                  $error={!!errors.especialidades?.[index]?.anoConclusao}
                  {...register(`especialidades.${index}.anoConclusao`)}
                />
                {errors.especialidades?.[index]?.anoConclusao && (
                  <ErrorMessage>
                    {errors.especialidades?.[index]?.anoConclusao.message}
                  </ErrorMessage>
                )}
              </Fieldset>
              <Fieldset>
                <Label>Instituição de ensino</Label>
                <Input
                  id="campo-instituicao-ensino"
                  type="text"
                  placeholder="USP"
                  $error={!!errors.especialidades?.[index]?.instituicao}
                  {...register(`especialidades.${index}.instituicao`)}
                />
                {errors.especialidades?.[index]?.instituicao && (
                  <ErrorMessage>
                    {errors.especialidades?.[index]?.instituicao.message}
                  </ErrorMessage>
                )}
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
