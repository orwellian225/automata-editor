import { z } from "zod";

export const AutomataStateIDSchema = z.number();
export type AutomataStateID = z.infer<typeof AutomataStateIDSchema>;

export const AutomataStateSchema = z.object({
    id: AutomataStateIDSchema,
    label: z.string(),
    diagram: z.object({
        position: z.object({
            x: z.number(),
            y: z.number(),
        }),
        out_angle: z.number(),
    }),
});
export type AutomataState = z.infer<typeof AutomataStateSchema>;
