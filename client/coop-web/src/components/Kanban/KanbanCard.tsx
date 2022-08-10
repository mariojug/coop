import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  RichUtils,
  DraftEditorCommand,
} from "draft-js";
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
  description: RawDraftContentState;
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
  min-width: 16rem;
  max-width: 16rem;
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

  // local state - editors
  const [nameState, setNameState] = useState<EditorState>(() =>
    EditorState.createWithContent(ContentState.createFromText(props.name))
  );

  const [descriptionState, setDescriptionState] = useState<EditorState>(
    props.description
      ? () => EditorState.createWithContent(convertFromRaw(props.description))
      : EditorState.createEmpty()
  );

  // local state - primitives
  const [name, setName] = useState<string>(props.name);
  const [description, setDescription] = useState<RawDraftContentState>(
    props.description
  );
  const [completed, setCompleted] = useState<boolean>(props.completed);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date(props.dueDate * 1000));

  const handleCheckboxClick = (e: React.FormEvent<HTMLInputElement>) => {
    // - update kanban card:completed = click
    // -- local update
    const lastCompletedVal = completed;
    setCompleted(!lastCompletedVal);
    // -- api update
  };

  // TODO: write in UI for element changes (bold/italic/etc)
  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setDescriptionState(editorState);
      return "handled";
    } else {
      return "not-handled";
    }
  };

  // update local primitives state variable for name every time the editor updates
  useEffect(
    () => setName(nameState.getCurrentContent().getPlainText()),
    [nameState]
  );

  useEffect(() => {
    const descriptionContent = descriptionState.getCurrentContent();
    if (descriptionContent.hasText()) {
      setDescription(convertToRaw(descriptionContent));
    }
  }, [descriptionState]);

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
              setShowMore(!showMore);
            }}
          />
        </ButtonRowStyled>
        {showMore && (
          <DescriptBoxStyled>
            <b>
              <Editor
                placeholder="Kanban card name..."
                editorState={nameState}
                onChange={setNameState}
              />
            </b>
            <hr />
            <Editor
              placeholder="Kanban card description..."
              editorState={descriptionState}
              onChange={setDescriptionState}
              handleKeyCommand={handleKeyCommand}
            />
          </DescriptBoxStyled>
        )}
      </CardStyled>
    </>
  );
};

export default KanbanCard;
