const capitalize = (value: string): string => {
  return value[0].toUpperCase() + value.substring(1).toLowerCase();
};

export default capitalize;
