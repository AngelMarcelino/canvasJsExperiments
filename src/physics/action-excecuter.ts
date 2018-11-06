export interface ActionExcecuter {
    type: ActionType;
    excecute();
}

export enum ActionType {
    JUMP
}