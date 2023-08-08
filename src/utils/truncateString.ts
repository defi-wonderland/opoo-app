export const truncateString = (address: string, characters: number = 6) => {
  const truncated = `${address?.slice(0, characters + 2)}...${address?.slice(-characters)}`;
  return truncated;
};
