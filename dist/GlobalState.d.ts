import React, { ReactNode } from "react";
interface GlobalState {
    [key: string]: any;
}
export declare function useGlobalState(): readonly [GlobalState, (key: string, value: any) => {
    payload: {
        [key: string]: any;
    };
    type: "globalState/setState";
}];
interface GlobalStateProps {
    children: ReactNode;
}
export default function GlobalState({ children }: GlobalStateProps): React.JSX.Element;
export {};
