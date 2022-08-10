import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { KanbanContext, KanbanContextInterface } from "./Context";
import KanbanCard, { KanbanCardInterface } from "./KanbanCard";
import { TaskPriorities } from "./Constants";

interface KanbanInterface {
  id: string;
}

const KANBAN_DEMO = {
  "To do": [
    {
      id: "123123123",
      name: "test name",
      createdDate: "",
      dueDate: 1660096175.581,
      createdBy: "",
      assignedTo: [""],
      description: null,
      completed: false,
      priority: TaskPriorities.HIGH,
    },
    {
      id: "234234",
      name: "test name 2",
      createdDate: "",
      dueDate: 1660096196.335,
      createdBy: "",
      assignedTo: [""],
      description: null,
      completed: false,
      priority: TaskPriorities.NONE,
    },
  ],
  "In progress": [
    {
      id: "435452345",
      name: "test name 3",
      createdDate: "",
      dueDate: 1660096207.248,
      createdBy: "",
      assignedTo: [""],
      description: null,
      completed: false,
      priority: TaskPriorities.LOW,
    },
    {
      id: "2345235",
      name: "test name 4",
      createdDate: "",
      dueDate: 1660096232.341,
      createdBy: "",
      assignedTo: [""],
      description: null,
      completed: false,
      priority: TaskPriorities.MEDIUM,
    },
  ],
};

const BoardStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const ColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 1em;
`;

const Kanban: React.FC<KanbanInterface> = (props) => {
  const [board, setBoard] = useState<object>(KANBAN_DEMO);

  // TODO: add logic to load kanban items from backend on first load
  useEffect(() => {}, []);

  const exports: KanbanContextInterface = {
    id: props.id,
    board: board,
  };

  return (
    <KanbanContext.Provider value={exports}>
      <BoardStyled>
        {Object.keys(board).map((columnName: string) => (
          <ColumnStyled>
            <h3>{columnName}</h3>
            {(board as any)[columnName].map((card: KanbanCardInterface) => (
              <KanbanCard
                id={card.id}
                name={card.name}
                createdDate={card.createdDate}
                dueDate={card.dueDate}
                createdBy={card.createdBy}
                assignedTo={card.assignedTo}
                description={card.description}
                completed={card.completed}
                priority={card.priority}
              />
            ))}
          </ColumnStyled>
        ))}
      </BoardStyled>
    </KanbanContext.Provider>
  );
};

export default Kanban;
