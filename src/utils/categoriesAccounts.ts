type Category = {
  label: string;
  value: number | string;
};

export enum AccountCategories {
  'CONTA_CORRENTE' = 1,
  'CONTA_INVESTIMENTO' = 2,
}

export const accountCategories: {[key: string]: Category} = {
  1: {
    label: 'Conta corrente',
    value: AccountCategories.CONTA_CORRENTE,
  },
  2: {
    label: 'Conta de investimentos',
    value: AccountCategories.CONTA_INVESTIMENTO,
  },
};

export function getAccountCategoriesList() {
  return Object.values(accountCategories);
}
