const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "inr",
});

const addCurrencySymbol = (value: number) => {
  return formatter.format(value);
};

export default addCurrencySymbol;
