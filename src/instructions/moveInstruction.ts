import { Register } from "../interfaces/RegisterBank";
import useStore from "../store/useStore";
import { functionTime } from "../utils/actions";

// INSTRUCCION MOVE
export const moveInstruction = async (register: string, value: string) => {
  const store = useStore.getState();

  await functionTime(() => {
    // se pasa al ciclo EI
    // 18- se ilumina el banco de registros
    // 19- aparece el dato en el banco de registros (00000000 | 00000101) que seria "|AL | 5 |"
    // finalmente se asigna el valor de AL y se guarda
    store.setCurrentCycle("EI");
    store.setComponent("BR");
    // store.setValue(
    //   `|${RegisterAddress[register]} | ${(value)}|`,
    // );  MONTANCHEX RESUELVE
    store.setRegisterValue(register as Register, Number(value));
  });
};

/*
    MOVE AL, 5
    FI
    1- Iluminar PC
    2- Mostrar #dirección (del MOV AL, 5) en cajita de PC (00000000)
    3- Iluminar MAR 
    4- Mostrar #dirección en cajita de MAR (00000000)
    5- Iluminar UC
    6- Iluminar bus de control y mostrar 00 que significa “solicitar instrucción”
    7- iluminar MAR
    8- iluminar bus de direcciones y mostrar #dirección de instrucción MOV (00000000)
    9- En la memoria del programa aparece | # | MOV AL, 5 |  (00000000 | 00000000 | 00000000 | 00000101)
    10- Iluminar bus de datos
    11- Mostrar “00000000 | 00000000 | 00000000 | 00000101” en el bus de datos
    12- Iluminar MBR
    13- Mostrar “00000000 | 00000000 | 00000000 | 00000101” en el MBR
    14- Se ilumina el IR
    15- Mostrar el dato en el IR "00000000 | 00000000 | 00000000 | 00000101"

    DI
    16- Iluminar UC
    17- mostrar la instrucción decodificada “MOV 00000000, 00000101”

    EI
    18- se ilumina el banco de registros
    19- aparece el dato en el banco de registros "|AL | 5 |"" (00000000 | 00000101)

*/
