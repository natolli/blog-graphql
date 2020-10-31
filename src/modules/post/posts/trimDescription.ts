export const trimDescription = (description: string) => {
  if (description.length <= 50) {
    return description;
  }
  const slicedString: string = description.slice(0, 50);

  return `${slicedString}...`;
};
