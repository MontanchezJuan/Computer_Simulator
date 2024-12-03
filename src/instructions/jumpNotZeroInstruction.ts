import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";
import { Alert } from "../utils/swal";

// INSTRUCCION JUMP
export const jumpNotZeroInstruction = async (operand1: string) => {
  await functionTime(() => {
    // EI - Execute Instruction
    useStore.getState().setCurrentCycle("EI");
    // Iluminar arista UC, PSW
    useStore.getState().setComponents("UC", "PSW");
  });

  // Verificar si hay una flag zero
  if (!useStore.getState().COMPUTER.PSW.zero) {
    await functionTime(() => {
      //! SI NO LO ENCUENTRA PUEDE RETORNAR -1!!!!!!
      const itemsFiltered = useStore.getState().items.filter((instruction) => instruction.type1 === "ASIGNFUNCTION")
      if (!itemsFiltered) {
        Alert({text: "No se encontraron instancias a funciones"})
        useStore.getState().setPCValue(useStore.getState().COMPUTER.PC + 1);
        return
      }
      const item = itemsFiltered.find((instruction) => instruction.operand1 === operand1)
      if (!item) {
        Alert({text: "No se encontró la fila de memoria"})
        useStore.getState().setPCValue(useStore.getState().COMPUTER.PC + 1);
        return
      }
      const newAddress = useStore
        .getState()
        .items.findIndex((instruction) => instruction.id === item?.id);
      if (!newAddress) {
        Alert({text: "No se encontró la dirección de la función"})
        useStore.getState().setPCValue(useStore.getState().COMPUTER.PC + 1);
        return
      }
      console.log(newAddress); 

      useStore.getState().setComponents("UC", "PC");
      useStore.getState().setPCValue(newAddress + 1);
          
        
      
    });
  } else if (useStore.getState().COMPUTER.PSW.zero) {
    await functionTime(() => {
      useStore.getState().setPCValue(useStore.getState().COMPUTER.PC + 1);
    });
  }

  return;
};
/*
EI (JNZ)

(Por debajo) Se verifica si la flag “zero” de la instrucción anterior está en true
Iluminar arista UC, PSW
Si la flag Zero es True: 
(Por debajo) Se debe actualizar el valor del PC a la dirección de la “función + 1” para que continúe ejecutando la instrucción desde ahí.
Iluminar arista UC, PC
Empezar a ejecutar desde la instrucción con dirección “función + 1”

Si la flag Zero es False:
Continuar con la siguiente instrucción

A tener en cuenta con el JNZ

// Si existe el JNZ, debe existir la manera de declarar “funciones” con nombre para saltar a ellas o a su “posición de memoria”

Además, el JNZ debe verificar la instrucción anterior para ver si tiene la flag “ZF o zero flag”

*/
