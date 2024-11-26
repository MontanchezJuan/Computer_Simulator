import { StateCreator } from "zustand";
import { PCComponent } from "../interfaces/Component";
import { Cycles } from "../interfaces/Cycles";
import { Register } from "../interfaces/RegisterBank";

interface Instruction {
  counter: number;
  currentComponent: PCComponent | null;
  currentCycle: Cycles;
  currentValue: number;
  lastComponent: PCComponent | null;
  registerBank: Record<Register, number>;
  timeout: number;
  aluParameters: Record<string, number>;
}

// funciones y variables que se van a utilizar
export interface InstructionsSlice {
  currentinstruction: Instruction;
  setComponent: (value: PCComponent) => void;
  setCurrentCycle: (value: Cycles) => void;
  setRegisterValue: (register: Register, value: number) => void;
  setTimeout: (value: number) => void;
  setValue: (value: number) => void;
  incrementCounter: () => void;
}

// valores iniciales de las variables
const initialInstructions: Instruction = {
  counter: 0,
  currentComponent: null,
  currentCycle: "FI",
  currentValue: 0,
  lastComponent: null,
  registerBank: { AL: 0, BL: 0, CL: 0, DL: 0 },
  timeout: 1000,
  aluParameters: { A: 0, B: 0 },
};

const createInstructionsSlice: StateCreator<InstructionsSlice> = (set) => ({
  currentinstruction: initialInstructions,

  // setear que componente se va a iluminar en ese momento
  setComponent: (value: PCComponent) =>
    set((state) => ({
      currentinstruction: {
        ...state.currentinstruction,
        lastComponent: state.currentinstruction.currentComponent,
        currentComponent: value,
      },
    })),

  // Setear que valor se mostrara al usuario sobre el componente en ese momento
  setValue: (value: number) =>
    set((state) => ({
      currentinstruction: {
        ...state.currentinstruction,
        currentValue: value,
      },
    })),

  // Setear en que velocidad se va an a mostrar los pasos de la instruccion
  setTimeout: (value: number) =>
    set((state) => ({
      currentinstruction: {
        ...state.currentinstruction,
        timeout: value,
      },
    })),

  // setear en cual ciclo de instruccion va la instruccion (FI, DI, CO, FO...)
  setCurrentCycle: (value: Cycles) =>
    set((state) => ({
      currentinstruction: {
        ...state.currentinstruction,
        currentCycle: value,
      },
    })),
  // setear el valor de la ALU
  setAluParameters: (parameter: string, value: number) =>
    set((state) => ({
      currentinstruction: {
        ...state.currentinstruction,
        aluParameters: {
          ...state.currentinstruction.aluParameters,
          [parameter]: value,
        },
      },
    })),
  // setear el valor de los registros VU (AL, BL, CL, DL)
  setRegisterValue: (register: Register, value: number) =>
    set((state) => ({
      currentinstruction: {
        ...state.currentinstruction,
        registerBank: {
          ...state.currentinstruction.registerBank,
          [register]: value,
        },
      },
    })),

  incrementCounter: () =>
    set((state) => {
      const newCounter = state.currentinstruction.counter + 1;
      return {
        currentinstruction: {
          ...state.currentinstruction,
          counter: newCounter,
          currentValue: newCounter,
        },
      };
    }),
});

export default createInstructionsSlice;
