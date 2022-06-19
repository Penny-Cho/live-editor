import { useActions } from "../../hooks/use-actions";
import "./add-cell.css";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fa-solid fa-code"></i>
          </span>
          <span className="icon-text">코드</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fa-solid fa-pen"></i>
          </span>
          <span className="icon-text">텍스트</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
