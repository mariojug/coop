import { createContext, useContext } from "react";

export interface KanbanContextInterface {
  id: string;
  board: object;
}

export const KanbanContext = createContext<KanbanContextInterface | null>(null);

export const useKanban = () => useContext(KanbanContext);
