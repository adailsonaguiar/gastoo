type Category = {
  color: string;
  label: string;
  value: number;
};

export const categoriesExpense: {[key: string]: Category} = {
  1: {
    color: '#2660A4',
    label: 'Alimentação',
    value: 1,
  },
  2: {
    color: '#FF6B35',
    label: 'Veículos',
    value: 2,
  },
  3: {
    color: '#FFBC42',
    label: 'Educação',
    value: 3,
  },
  4: {
    color: '#AD343E',
    label: 'Comras online',
    value: 4,
  },
  5: {
    color: '#AD3444',
    label: 'Outros',
    value: 4,
  },
};

export const categoriesIncome: {[key: string]: Category} = {
  1: {
    color: '#2660A4',
    label: 'Salário',
    value: 1,
  },
  2: {
    color: '#FF6B35',
    label: 'Presente',
    value: 2,
  },
  3: {
    color: '#FFBC42',
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
