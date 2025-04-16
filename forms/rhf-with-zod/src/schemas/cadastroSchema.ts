import { z } from "zod";
import { captalizeText } from "../utils/captalizeText";

export const cadastroSchema = z
  .object({
    nome: z
      .string()
      .min(1, "Este campo é obrigatório")
      .min(5, "O nome deve ter pelo menos cinco caracteres")
      .transform(captalizeText),
    email: z
      .string()
      .min(1, "Este campo é obrigatório")
      .email("O e-mail não é válido")
      .toLowerCase(),
    telefone: z
      .string()
      .min(1, "Este campo é obrigatório")
      .regex(/\(\d{2}\) \d{5}-\d{4}/, "O telefone não é válido"),
    senha: z
      .string()
      .min(1, "Este campo é obrigatório")
      .min(8, "A senha deve ter pelo menos oito caracteres"),
    senhaVerificada: z.string().min(1, "Este campo é obrigatório"),
  })
  .refine(({ senha, senhaVerificada }) => senha === senhaVerificada, {
    message: "As senhas não correspondem",
    path: ["senhaVerificada"],
  });
