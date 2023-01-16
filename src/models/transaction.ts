export type Transaction = {
  _id: string;
  description: string;
  value: number;
  initialValue: number;
  day: string;
  month: string;
  year: string;
  type: string;
  accountId: string;
  status: number;
  category: number | string;
  valueType: number;
  createdAt: Date;
  date: Date;
  recurrence: boolean;
};

export function TransactionBuilder(props: Transaction) {
  return props;
}
