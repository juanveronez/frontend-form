import { z } from "zod";
import { especialistaEnderecoSchema } from "../schemas/especialistaEnderecoSchema";

type EspecialistaEnderecoFieldValues = z.input<
  typeof especialistaEnderecoSchema
>;
type EspecialistaEnderecoTransformedValues = z.output<
  typeof especialistaEnderecoSchema
>;

type FormEspecialistaTecnico = z.infer<typeof especialistaTecnicoSchema>;

type FormCadastroPessoal = z.infer<typeof cadastroSchema>;
