import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import CheckboxInput from "../styled/CheckboxInput";
import { KanbanContextInterface, useKanban } from "./Context";

import { ElementColors } from "../../constants/styles";
import TextInput from "../styled/TextInput";
import Button from "../styled/Button";

import { ArrowIosDownward } from "@styled-icons/evaicons-solid/ArrowIosDownward";
import { Edit3 } from "@styled-icons/feather/Edit3";

export interface KanbanCardInterface {
  id: string;
  name: string;
  createdDate: number;
  dueDate: number;
  createdBy: string;
  assignedTo: Array<string>;
  description: string;
  completed: false;
  priority: number;
}

const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  margin: 0.25em;
  background-color: ${ElementColors.KANBAN_CARD_BG_DARK_MODE};
  border-radius: 0.25em;
  min-width: 10rem;
`;

const CardDateStyled = styled.div`
  display: flex;
  margin: 0;
  font-size: 0.9rem;
  margin: 0.5em 0em;
  font-style: italic;
`;

const DescriptBoxStyled = styled.div`
  background-color: ${ElementColors.KANBAN_CARD_DESCRIPT_BG_DARK_MODE};
  border-radius: 0.5em;
  min-height: 10rem;
  margin: 0;
  padding: 0.5em;
`;

const ButtonRowStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const KanbanCard: React.FC<KanbanCardInterface> = (props) => {
  // const { id, board } = useKanban();

  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  const [name, setName] = useState<string>(props.name);
  const [completed, setCompleted] = useState<boolean>(props.completed);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [showEditBox, setShowEditBox] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date(props.dueDate * 1000));

  const handleCheckboxClick = (e: React.FormEvent<HTMLInputElement>) => {
    // - update kanban card:completed = click
    // -- local update
    const lastCompletedVal = completed;
    setCompleted(!lastCompletedVal);
    // -- api update
  };

  useEffect(() => console.log(editorState), [editorState]);

  return (
    <>
      <CardStyled>
        <CheckboxInput
          id={props.id}
          name={name}
          checked={props.completed}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            handleCheckboxClick(e)
          }
        />
        <CardDateStyled>
          {dueDate.toLocaleDateString("en-us", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </CardDateStyled>
        <ButtonRowStyled>
          <Button
            text="dropdown"
            maxHeight="2rem"
            element={<ArrowIosDownward size="small" />}
            onClick={(e: React.ChangeEvent<HTMLButtonElement>) => {
              setShowDescription(!showDescription);
            }}
          />
          <Button
            text="edit"
            maxHeight="2rem"
            element={<Edit3 size="small" />}
            onClick={(e: React.ChangeEvent<HTMLButtonElement>) => {
              if (showDescription) {
                setShowDescription(false);
              }
              setShowEditBox(!showEditBox);
            }}
          />
        </ButtonRowStyled>
        {showDescription && (
          <DescriptBoxStyled>
            {props.description}
            <hr />
          </DescriptBoxStyled>
        )}
        {showEditBox && (
          <DescriptBoxStyled>
            <TextInput
              type="text"
              id={"card-name-" + props.id}
              placeholder={"Card name"}
              defaultValue={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
            <Editor editorState={editorState} onChange={setEditorState} />
          </DescriptBoxStyled>
        )}
      </CardStyled>
    </>
  );
};

export default KanbanCard;
