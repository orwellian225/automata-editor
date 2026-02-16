import type { AutomataStateID } from "./automata-state";

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
export type QSQSDTransition = {
    curr_state: AutomataStateID;
    read_symbol: string;
    next_state: AutomataStateID;
    write_symbol: string;
    direction: number;
};
