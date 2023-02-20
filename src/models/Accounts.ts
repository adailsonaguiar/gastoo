export type Account = {
  _id: string;
  day: string;
  month: string;
  year: string;
  description: string;
  balance: number;
  color: string;
  createdAt: Date;
  type?: number;
};
