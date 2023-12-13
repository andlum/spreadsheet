import { Fragment, useState, useCallback } from "react";
import Cell from "./Cell";
import { getColumnName } from "../utils";

const Sheet = ({ rows, columns }: { rows: number; columns: number }) => {
  const [data, setData] = useState<any>({});

  const setValue = useCallback(
    ({ row, column, value }: { row: number; column: string; value: any }) => {
      setData({ ...data, [`${column}${row}`]: value });
    },
    [data, setData]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `24px repeat(${columns}, 1fr)`,
      }}
    >
      {Array(rows + 1)
        .fill("")
        .map((_, i) => (
          <Fragment key={i}>
            {Array(columns + 1)
              .fill("")
              .map((_, j) => {
                const columnName = getColumnName(j);
                const key = `${columnName}${i}`;

                return (
                  <Cell
                    onCommit={setValue}
                    rowIndex={i}
                    colIndex={j}
                    currentValue={data[key]}
                    key={key}
                  />
                );
              })}
          </Fragment>
        ))}
    </div>
  );
};

export default Sheet;
