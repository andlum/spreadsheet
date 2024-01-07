import { Fragment, useState, useCallback } from "react";
import Cell from "./Cell";
import { getColumnName } from "../utils";
import { useEffect } from "react";

const Sheet = ({ rows, columns }: { rows: number; columns: number }) => {
  const [data, setData] = useState<any>({});
  const [selected, setSelected] = useState<string>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragSelect, setDragSelect] = useState<string[]>([]);

  // const setValue = useCallback(
  //   ({ row, column, value }: { row: number; column: string; value: any }) => {
  //     setData({ ...data, [`${column}${row}`]: value });
  //   },
  //   [data, setData]
  // );

  const setValue = ({ key, value }: { key: string; value: any }) => {
    setData({ ...data, [key]: value });
  };

  const onDragEnter = (key: string) => {
    setDragSelect([...dragSelect, key]);
  };

  const onDragEnd = () => {
    setIsDragging(false);
    console.log(dragSelect);

    if (selected && data[selected]) {
      const newData: any = {};
      dragSelect.forEach((key) => (newData[key] = data[selected]));
      console.log({ ...data, newData });
      setData({ ...data, ...newData });
    }

    setDragSelect([]);
  };

  return (
    <div
      style={{
        width: columns * 100,
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
                    isDragging={isDragging}
                    toggleDragging={() => setIsDragging(true)}
                    onCommit={setValue}
                    onFocus={(key: string) => setSelected(key)}
                    focused={selected === `${getColumnName(j)}${i}`}
                    rowIndex={i}
                    colIndex={j}
                    currentValue={data[key]}
                    key={key}
                    onDragEnd={onDragEnd}
                    onDragEnter={onDragEnter}
                  />
                );
              })}
          </Fragment>
        ))}
    </div>
  );
};

export default Sheet;
