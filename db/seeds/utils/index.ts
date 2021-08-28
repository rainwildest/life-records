export const UUID =
  (prefix = "00000000", i = 0) =>
  (): string => {
    const suffix = `${++i}`.padStart(12, "0");
    return `${prefix}-0000-0000-0000-${suffix}`;
  };
