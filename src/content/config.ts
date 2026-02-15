import { z, defineCollection } from "astro:content";

const patrimonioCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tipo: z.enum(["natural", "cultural"]),
    descripcion: z.string().max(300), // Corto para carga rápida
    imagen: z.string().optional(), // Ruta a /public/
  }),
});

export const collections = { patrimonio: patrimonioCollection };
