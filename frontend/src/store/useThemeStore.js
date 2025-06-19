import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("nexustalk-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("nexustalk-theme", theme);
    set({ theme });
  },
}));
