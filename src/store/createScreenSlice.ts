import { StateCreator } from "zustand";

interface Screen {
  screenSize: number;
  isSidebarOpen: boolean;
}

export interface ScreenSlice {
  screen: Screen;
  setScreenSize: (value: number) => void;
  setIsSidebarOpen: (value: boolean) => void;
}

const createScreenSlice: StateCreator<ScreenSlice> = (set) => ({
  screen: { isSidebarOpen: false, screenSize: 0 },

  setScreenSize: (value: number) =>
    set((state) => {
      if (value) {
        return { ...state, screen: { ...state.screen, screenSize: value } };
      }
      return state;
    }),

  setIsSidebarOpen: (value: boolean) =>
    set((state) => ({
      ...state,
      screen: { ...state.screen, isSidebarOpen: value },
    })),
});

export default createScreenSlice;
