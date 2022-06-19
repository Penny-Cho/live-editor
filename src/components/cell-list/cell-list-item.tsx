import "./cell-list-item.css";
import { Cell } from "../../state";
import ActionBar from "../action-bar/action-bar";
import CodeCell from "../code-cell/code-cell";
import TextEditor from "../text-editor/text-editor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else {
    child = <TextEditor cell={cell} />;
  }

  return (
    <div className="cell-list-item">
      <ActionBar id={cell.id} />
      {child}
    </div>
  );
};

export default CellListItem;