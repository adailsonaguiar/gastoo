type Category = {
  label: string;
  value: number | string;
};

export const categoriesExpense: {[key: string]: Category} = {
  1: {
    label: 'Alimentação',
    value: 1,
  },
  3: {
    label: 'Assinaturas e serviços',
    value: 3,
  },
  10: {
    label: 'Cartão de crédito',
    value: 10,
  },
  5: {
    label: 'Compras online',
    value: 5,
  },
  4: {
    label: 'Educação',
    value: 4,
  },
  6: {
    label: 'Mercado',
    value: 6,
  },
  7: {
    label: 'Saúde',
    value: 7,
  },
  2: {
    label: 'Veículos',
    value: 2,
  },
  9: {
    label: 'Transferência entre contas',
    value: 9,
  },
  8: {
    label: 'Outros',
    value: 8,
  },
};

export const categoriesIncome: {[key: string]: Category} = {
  1: {
    label: 'Salário',
    value: 1,
  },
  4: {
    label: 'Investimentos',
    value: 4,
  },
  2: {
    label: 'Presente',
    value: 2,
  },
  3: {
    label: 'Empréstimos',
    value: 3,
  },
  6: {
    label: 'Transferencia entre contas',
    value: 6,
  },
  5: {
    label: 'Outras receitas',
    value: 5,
  },
};

export function getArrayCategoriesExpense() {
  return Object.values(categoriesExpense);
}

export function getArrayCategoriesIncome() {
  return Object.values(categoriesIncome);
}
