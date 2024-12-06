import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";
import { CODOPS } from "../interfaces/CODOP";

export type TypeOperand = "NUMBER" | "REGISTER" | "ASIGNFUNCTION" | "FUNCTION";

export interface ProgramItem {
  codop: keyof typeof CODOPS;
  id: string;
  operand1: string;
  operand2: string;
  type1: TypeOperand;
  type2: TypeOperand;
}

interface CreateItem {
  codop: keyof typeof CODOPS;
  operand1?: string;
  type1?: TypeOperand;
  operand2?: string;
  type2?: TypeOperand;
}

export interface ProgramSlice {
  items: ProgramItem[];
  activeItem: ProgramItem | null;
  isProgamRunning: boolean;
  createItem: (props: CreateItem) => void;
  handleRemove: (id: string) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
  setActiveItem: (item: ProgramItem | null) => void;
  setIsProgamRunning: (isProgamRunning: boolean) => void;
  setOperand: (
    id: string,
    field: "operand1" | "operand2",
    newValue: string,
  ) => void;
  setType: (
    id: string,
    field: "type1" | "type2",
    newValue: TypeOperand,
  ) => void;
}

const createProgramSlice: StateCreator<ProgramSlice> = (set) => ({
  items: [],
  activeItem: null,
  isProgamRunning: false,

  // Crear un nuevo item y agregarlo al estado
  createItem: ({
    codop,
    operand1 = "AL",
    type1 = "REGISTER",
    operand2 = "0",
    type2 = "NUMBER",
  }) => {
    const newItem = {
      id: uuidv4(),
      codop,
      operand1,
      type1,
      operand2,
      type2,
    };
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },

  // Eliminar un item por id
  handleRemove: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // Mover un item dentro del array
  moveItem: (fromIndex, toIndex) => {
    set((state) => {
      const items = [...state.items];
      const [movedItem] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, movedItem);
      return { items };
    });
  },

  setIsProgamRunning: (isProgamRunning) => {
    set(() => ({ isProgamRunning }));
  },

  // Establecer el item activo al iniciar el arrastre
  setActiveItem: (item) => {
    set({ activeItem: item });
  },

  // Actualizar operandos según el id y el campo
  setOperand: (id, field, newValue) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, [field]: newValue } : item,
      );

      return { items: updatedItems };
    });
  },

  // Actualizar tipos según el id y el campo
  setType: (id, field, newValue) => {
    set((state) => {
      const type = field === "type1" ? "operand1" : "operand2";

      switch (newValue) {
        case "FUNCTION":
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, [field]: newValue, [type]: "" }
                : item,
            ),
          };

        case "NUMBER":
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, [field]: newValue, [type]: "0" }
                : item,
            ),
          };
        case "REGISTER":
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, [field]: newValue, [type]: "AL" }
                : item,
            ),
          };

        default:
          return state;
      }
    });
  },
});

export default createProgramSlice;
