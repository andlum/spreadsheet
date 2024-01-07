import Header from "./Header";
import { getColumnName } from "../utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { computeDisplayValue } from "../utils";
import clsx from "clsx";

const Cell = ({
  onCommit,
  onFocus,
  focused,
  rowIndex,
  colIndex,
  currentValue,
  toggleDragging,
  isDragging,
  onDragEnter,
  onDragEnd,
}: {
  isDragging?: boolean;
  onCommit?: any;
  onFocus?: any;
  focused: boolean;
  selected?: boolean;
  rowIndex: number;
  colIndex: number;
  currentValue: string;
  toggleDragging: () => void;
  onDragEnter: any;
  onDragEnd: any;
}) => {
  const columnName = useMemo(() => getColumnName(colIndex), [colIndex]);
  const key = `${columnName}${rowIndex}`;

  // TODO: Move and value into a custom hook
  const [edit, setEdit] = useState(false);
  const [dragSelect, setDragSelect] = useState(false);

  const value = useMemo(() => {
    if (edit) {
      return currentValue || "";
    }
    return computeDisplayValue(currentValue);
  }, [edit, currentValue]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onCommit({
        key,
        value: event.target.value,
      });
    },
    [key, onCommit]
  );

  useEffect(() => {
    setEdit(false);
  }, [isDragging]);

  const handleDragStart = () => {
    toggleDragging();
  };

  const handleDragEnter = () => {
    if (isDragging) {
      setDragSelect(true);
      onDragEnter(key);
    }
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  const handleCellClick = () => {
    onFocus(key);
  };

  if (colIndex === 0 && rowIndex === 0) {
    return <Header />;
  }

  if (colIndex === 0) {
    return <Header>{rowIndex}</Header>;
  }

  if (rowIndex === 0) {
    return <Header>{columnName}</Header>;
  }

  return (
    <div
      className={clsx("Cell", {
        "--top": rowIndex === 1,
        "--left": colIndex === 1,
        "--focused": focused,
        "--dragged": isDragging && dragSelect,
      })}
      onClick={handleCellClick}
      onDragEnter={handleDragEnter}
    >
      {focused ? (
        <>
          <input
            className="cell-input"
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button
            draggable
            className="drag-affordance"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </>
      ) : (
        <span className="cell-value">{value}</span>
      )}
    </div>
  );
};

export default Cell;
