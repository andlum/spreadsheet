import Header from "./Header";
import { getColumnName } from "../utils";
import { useCallback, useMemo, useState } from "react";
import { computeDisplayValue } from "../utils";

const Cell = ({
  onCommit,
  rowIndex,
  colIndex,
  currentValue,
}: {
  onCommit: any;
  rowIndex: number;
  colIndex: number;
  currentValue: string;
}) => {
  const columnName = useMemo(() => getColumnName(colIndex), [colIndex]);

  // TODO: Move and value into a custom hook
  const [edit, setEdit] = useState(false);

  const value = useMemo(() => {
    if (edit) {
      return currentValue || "";
    }
    return computeDisplayValue(currentValue);
  }, [edit, currentValue]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onCommit({
        row: rowIndex,
        column: columnName,
        value: event.target.value,
      });
    },
    [rowIndex, columnName, onCommit]
  );

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
    <input
      style={{
        margin: 1,
      }}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={() => setEdit(false)}
      onFocus={() => setEdit(true)}
    />
  );
};

export default Cell;
