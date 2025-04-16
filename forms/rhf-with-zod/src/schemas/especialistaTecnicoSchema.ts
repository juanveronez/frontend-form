import { z } from "zod";

export const especialistaTecnicoSchema = z.object({
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
