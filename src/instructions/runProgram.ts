import { InstruccionesControl } from "../interfaces/CODOP";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";
import { jumpNotZeroInstruction } from "./jumpNotZeroInstruction";
import { malumaInstruction } from "./malumaInstruction";
import { moveInstruction } from "./moveInstruction";
import { operationsInstructions } from "./operationsInstructions";

export const run = async () => {
  const instructions = useStore.getState().items;

  useStore.getState().resetCOMPUTER();

  do {
    // Siguiente instrucción
    useStore.getState().setPCValue(useStore.getState().COMPUTER.PC + 1);

    const instruction = instructions[useStore.getState().COMPUTER.PC];
    // El MALUMA si utiliza el type1
    const { id, codop, operand1, type1, operand2, type2 } = instruction;

    await functionTime(() => {
      // FI - Fetch Instruction
      useStore.getState().setCurrentCycle("FI");
      // 1- Iluminar PC
      // 2- Mostrar #dirección (del COODOP REGISTER, REGISTER) en cajita de PC (00000011)
      useStore.getState().setComponents("PC", "MAR");
      useStore.getState().setMARValue(useStore.getState().COMPUTER.PC);
    });

    await functionTime(() => {
      // 9- iluminar MAR
      useStore.getState().setComponents("MAR", "AB");
      useStore.getState().setAddressBusValue(useStore.getState().COMPUTER.PC);
    });

    await functionTime(() => {
      // 7- Iluminar UC
      useStore.getState().setComponents("UC", "CB");
      useStore.getState().setControlBusValue(InstruccionesControl.GetDatum);
    });

    await functionTime(() => {
      // 7- Iluminar CB -> PM
      useStore.getState().setComponents("CB", "PM");
    });

    await functionTime(() => {
      // 7- Iluminar AB -> PM
      useStore.getState().setComponents("AB", "PM");
    });

    await functionTime(() => {
      useStore.getState().setComponents("PM", id);
    });

    await functionTime(() => {
      useStore.getState().setComponents(id, "PM");
    });

    await functionTime(() => {
      // 11- En la memoria del programa aparece la instrucción | # | ADD Operando1, Operando2 |
      useStore.getState().setComponents("PM", "DB");

      // Se muestra en el bus de datos lo que va a pasar al MBR,
      useStore.getState().setDataBusValue({ codop, operand1, operand2 });
    });

    await functionTime(() => {
      // 12- Iluminar MBR
      useStore.getState().setComponents("DB", "MBR");
      useStore.getState().setMBRValue({ codop, operand1, operand2 });
    });

    //no
    await functionTime(() => {
      // 14- Se ilumina el IR
      useStore.getState().setComponents("MBR", "IR");
      useStore.getState().setIRValue({ codop, operand1, operand2 });
    });

    await functionTime(() => {
      // DI - Dicode Instruction
      useStore.getState().setCurrentCycle("DI");
      // 15- Iluminar UC
      // 16- mostrar la instrucción decodificada CODOP 00000000, 00000101”
      useStore.getState().setComponents("IR", "UC");
      useStore.getState().setUCValue({ codop, operand1, operand2 });
    });

    await functionTime(() => {
      // 99- La UC esta decodificando
      useStore.getState().setComponents("UC", "UC");
    });

    switch (codop) {
      case "MOV":
        await moveInstruction(operand1, operand2);
        break;
      case "ADD":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "DEC":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "DIV":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "MUL":
        await operationsInstructions(codop, operand1, operand2, type2);
        break;
      case "CMP":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "JMP":
        //moveInstruction(operand1, operand2, type1, type2);
        break;
      case "JNZ":
        await jumpNotZeroInstruction(operand1);
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
      case "MALUMA":
        await malumaInstruction(operand1, type1);
        // la accion de MALUMA es saltar a la sgte instruccion (no tiene CO, FO, EI, WO)
        break;

      default:
        break;
    }
  } while (useStore.getState().COMPUTER.PC !== instructions.length - 1);

  useStore.getState().setIsProgamRunning(false);
};
