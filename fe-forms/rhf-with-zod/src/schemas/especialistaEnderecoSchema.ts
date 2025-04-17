import { z } from "zod";

const TWO_MB = 2 * 1024 * 1024;

export const especialistaEnderecoSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0, {
      message: "Este campo é obrigatório",
    })
    .optional()
    .transform((list) => list?.item(0))
    .refine((file) => !!file && file.size < TWO_MB, {
      message: "O arquivo deve ter no máximo 2MB",
    }),
  endereco: z.object({
    cep: z
      .string()
      .min(1, "Este campo é obrigatório")
      .length(8, "Informe um CEP válido"),
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
