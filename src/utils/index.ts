export const getColumnName = (index: number) =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

// TODO: Stash Sheet data in a context, use context to swap out references
export const computeDisplayValue = (value: string) => {
  if (!value) return "";
  if (value.startsWith("=")) return eval(value.replace("=", ""));
  return value;
};
