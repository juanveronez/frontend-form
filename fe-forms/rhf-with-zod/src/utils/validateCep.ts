import { especialistaEnderecoSchema } from "../schemas/especialistaEnderecoSchema";

export const validateCep = (cep: string) =>
  especialistaEnderecoSchema.shape.endereco.shape.cep.safeParse(cep).success;
