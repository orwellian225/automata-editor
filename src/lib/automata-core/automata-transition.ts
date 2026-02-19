import { z } from "zod";
import { AutomataStateIDSchema } from "./automata-state";

export const direction_to_str = (direction: number) => {
    if (direction === 0) {
        return "S";
    } else if (direction > 0) {
        return direction > 1 ? `R^${direction}` : "R";
    } else if (direction < 0) {
        return direction < -1 ? `L^${Math.abs(direction)}` : "L";
    }
};

/// State x Symbol -> State x Symbol x Direction
export const QSQSDTransitionSchema = z.object({
    curr_state_id: AutomataStateIDSchema,
    read_symbol: z.string(),
    next_state_id: AutomataStateIDSchema,
    write_symbol: z.string(),
    direction: z.number(),
});
export type QSQSDTransition = z.infer<typeof QSQSDTransitionSchema>;
