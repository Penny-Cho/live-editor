import { useActions } from "../../hooks/use-actions";
import "./action-bar.css";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="field has-addons">
      <p className="control">
        <button className="action-bar-item" onClick={() => moveCell(id, "up")}>
          <span className="icon">
            <i className="fa-solid fa-angle-up"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button
          className="action-bar-item"
          onClick={() => moveCell(id, "down")}
        >
          <span className="icon">
            <i className="fa-solid fa-angle-down"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button className="action-bar-item" onClick={() => deleteCell(id)}>
          <span className="icon">
            <i className="fa-solid fa-trash-can"></i>
          </span>
        </button>
      </p>
    </div>
  );
};

export default ActionBar;
