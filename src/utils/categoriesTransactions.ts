type Category = {
  label: string;
  value: number | string;
};

export const categoriesExpense: {[key: string]: Category} = {
  1: {
    label: 'Alimentação',
    value: 1,
  },
  2: {
    label: 'Veículos',
    value: 2,
  },
  3: {
    label: 'Educação',
    value: 3,
  },
  4: {
    label: 'Comras online',
    value: 4,
  },
  5: {
    label: 'Outros',
    value: 4,
  },
};

export const categoriesIncome: {[key: string]: Category} = {
  1: {
    label: 'Salário',
    value: 1,
  },
  2: {
    label: 'Presente',
    value: 2,
  },
  3: {
    label: 'Vendas',
    value: 3,
  },
};

export function getArrayCategoriesExpense() {
  return Object.values(categoriesExpense);
}

export function getArrayCategoriesIncome() {
  return Object.values(categoriesIncome);
}
