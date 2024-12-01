import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";
import { CODOPS } from "../interfaces/CODOP";

export type TypeOperand = "Number" | "Register";

export interface ProgramItem {
  codop: keyof typeof CODOPS;
  id: string;
  operand1: string;
  operand2: string;
  type1: TypeOperand;
  type2: TypeOperand;
}

export interface ProgramSlice {
  items: ProgramItem[];
  activeItem: ProgramItem | null;
  createItem: (codop: keyof typeof CODOPS) => void;
  handleRemove: (id: string) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
  setActiveItem: (item: ProgramItem | null) => void;
  setOperand: (
    id: string,
    field: "operand1" | "operand2",
    newValue: string,
  ) => void;
  setType: (id: string, field: "type1" | "type2", newValue: string) => void;
}

const createProgramSlice: StateCreator<ProgramSlice> = (set) => ({
  items: [],
  activeItem: null,

  // Crear un nuevo item y agregarlo al estado
  createItem: (codop: keyof typeof CODOPS) => {
    const newItem: ProgramItem = {
      id: uuidv4(),
      codop,
      operand1: "",
      type1: "Register",
      operand2: "",
      type2: "Register",
    };
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },

  // Eliminar un item por id
  handleRemove: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // Mover un item dentro del array
  moveItem: (fromIndex: number, toIndex: number) => {
    set((state) => {
      const items = [...state.items];
      const [movedItem] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, movedItem);
      return { items };
    });
  },

  // Establecer el item activo al iniciar el arrastre
  setActiveItem: (item: ProgramItem | null) => {
    set({ activeItem: item });
  },

  // Actualizar operandos según el id y el campo
  setOperand: (
    id: string,
    field: "operand1" | "operand2",
    newValue: string,
  ) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, [field]: newValue } : item,
      );

      return { items: updatedItems };
    });
  },

  // Actualizar tipos según el id y el campo
  setType: (id: string, field: "type1" | "type2", newValue: string) => {
    set((state) => {
      const type = field === "type1" ? "operand1" : "operand2";
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, [field]: newValue, [type]: "" } : item,
      );

      return { items: updatedItems };
    });
  },
});

export default createProgramSlice;
