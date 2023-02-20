type Category = {
  label: string;
  value: number | string;
};

export const accountCategories: {[key: string]: Category} = {
  1: {
    label: 'Conta corrente',
    value: 1,
  },
  2: {
    label: 'Conta de investimentos',
    value: 2,
  },
};

export function getAccountCategoriesList() {
  return Object.values(accountCategories);
}
