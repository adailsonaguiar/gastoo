import {create} from 'zustand';

type UseDateProps = {
  month: number;
  year: number;
  setMonthYear: (month: number, year: number) => void;
};

export const useDate = create<UseDateProps>(set => ({
  month: 0,
  year: 0,
  setMonthYear: (month: number, year: number) =>
    set({
      month,
      year,
    }),
  setCurrentDate: () =>
    set({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }),
}));
