export const getDate = (timestamp: string | number): string => {
  return new Date(Number(timestamp) * 1000).toLocaleString();
};
