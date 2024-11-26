import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";
import { addInstruction } from "./addInstruction";
import { moveInstruction } from "./moveInstruction";

export const run = async () => {
  const instructions = useStore.getState().items;
  const store = useStore.getState();

  do {
    const instruction = instructions[store.currentinstruction.counter];

    // FI - Fetch Instruction
    await functionTime(() => {
      // 1- Iluminar PC
      // 2- Mostrar #dirección (del COODOP REGISTER, REGISTER) en cajita de PC (00000011)
      store.setComponent("PC");
      store.setValue(store.currentinstruction.counter);
    });

    await functionTime(() => {
      // 3- Mostrar la dirección en MAR
      // 6 - Mostrar #dirección en cajita de MAR
      store.setComponent("MAR");
      store.setValue(store.currentinstruction.counter);
    });

    await functionTime(() => {
      // 7- Iluminar UC
      store.setComponent("UC");
    });

    await functionTime(() => {
      // 8- Iluminar bus de control y mostrar 01 que significa “solicitar instrucción”
      store.setComponent("CB");
      store.setValue(1);
    });

    await functionTime(() => {
      // 9- iluminar MAR
      store.setComponent("MAR");
      store.setValue(store.currentinstruction.counter);
    });

    await functionTime(() => {
      // 10- luminar bus de direcciones y mostrar #dirección de instrucción ADD AL, BL
      store.setComponent("AB");
      store.setValue(store.currentinstruction.counter);
    });

    await functionTime(() => {
      // 11- En la memoria del programa aparece la instrucción | # | ADD Operando1, Operando2 |
      // montanchez
      store.setComponent("PM");
      store.setValue(store.currentinstruction.counter);
      // montanchez cierra
    });

    await functionTime(() => {
      // 10- Iluminar bus de datos
      store.setComponent("DB");
    });

    await functionTime(() => {
      // 12- Iluminar MBR
      store.setComponent("MBR");
    });

    await functionTime(() => {
      // 14- Se ilumina el IR
      store.setComponent("IR");
    });

    // DICODE

    await functionTime(() => {
      // se pasa al ciclo DI
      // 15- Iluminar UC
      // 16- mostrar la instrucción decodificada CODOP 00000000, 00000101”
      store.setCurrentCycle("DI");
      store.setComponent("UC");
      //MONTANCHEZ
      // store.setValue(
      //   `MOV ${RegisterAddress[register]}, ${(value & 0xff).toString(2).padStart(8, "0")}`,
      // );
      //MONTANCHEZ CIERRA
    });

    const { codop, operand1, type1, operand2, type2 } = instruction;

    switch (codop) {
      case "ADD":
        addInstruction(operand1, operand2, type1, type2);
        break;
      case "MOV":
        moveInstruction(operand1, operand2);
        break;
      case "DEC":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "DIV":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "MUL":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "CMP":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "DEC":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "JMP":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "JNZ":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "JZ":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "LOAD":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "STORAGE":
        //moveInstruction(operand1, operand2, type1, type2);
        break;

      default:
        break;
    }
  } while (
    useStore.getState().currentinstruction.counter === instructions.length
  );
};
