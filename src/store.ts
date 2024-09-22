import {create} from 'zustand';

type State = {
  day: number;
  actions: {
    incrementDay: () => void;
  };
};

const useStore = create<State>((set) => {
  return {
    day: 0,
    actions: {
      incrementDay: () => set((state) => ({day: state.day + 1})),
    },
  };
});

export const useDay = () => useStore((state) => state.day);
export const useActions = () => useStore((state) => state.actions);
