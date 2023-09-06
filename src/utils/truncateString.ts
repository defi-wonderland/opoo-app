export const truncateString = (value: string, characters: number = 6) => {
  if (value.slice(-4) === '.eth') return value;

  const truncated = `${value?.slice(0, characters + 2)}...${value?.slice(-characters)}`;
  return truncated;
};
