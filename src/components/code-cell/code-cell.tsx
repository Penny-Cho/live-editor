import { useEffect } from "react";
import Preview from "../preview/preview";
import "./code-cell.css";
import Resizable from "../resizable/resizable";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { Cell } from "../../state";
import CodeEditor from "../code-editor/code-editor";
import { useCumulativeCode } from "../../hooks/use-cumulative-code";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => (state.bundles ?? {})[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="progress-wrapper">
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                로딩...
              </progress>
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} errStatus={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
