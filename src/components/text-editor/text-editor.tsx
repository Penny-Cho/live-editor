import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import React, { useState, useEffect, useRef } from "react";
import { Cell } from "../../state";
import { useActions } from "../../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  // onBlur로 해결
  // const onBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
  //   if (value) {
  //     setEditing(false);
  //   }
  // };

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor " onClick={() => setEditing(true)}>
      <MDEditor.Markdown
        source={cell.content || "여기를 선택해서 글을 적어주세요"}
      />
    </div>
  );
};

export default TextEditor;
