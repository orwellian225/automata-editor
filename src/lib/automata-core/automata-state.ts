export type AutomataStateID = number;

export type AutomataState = {
    id: AutomataStateID;
    label: string;
    diagram: {
        position: { x: number; y: number };
    };
};
