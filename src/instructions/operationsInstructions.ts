import { Register } from "../interfaces/RegisterBank";
import { TypeOperand } from "../store/createProgramSlice";
import useStore from "../store/useStore";

// INSTRUCCIÓN ADD
export const operationsInstructions = async (
  codop: "ADD" | "DEC" | "DIV" | "MUL",
  operand1: string,
  operand2: string,
  type1: TypeOperand,
  type2: TypeOperand,
) => {
  const store = useStore.getState();
  // no hay CO ni FO
  //24- se muestra el valor de la direccion “00000000” (AL) en el banco de registros (en este caso sería | AL | valor en binario | )
  store.setComponent("BR");
  store.setValue(Number(operand1));

  //--> Si el segundo operando es un registro
  //25- se muestra el valor de la direccion “00000001” (BL) en el banco de registros (en este caso sería | BL | valor en binario | )
  if (type2 === "Register") {
    store.setComponent("BR");
    store.setValue(Number(operand2));
    // --> Si el segundo opernado es un dato directo
    // no hacer nada, pasar a lo siguiente
  } else {
    store.setComponent("ALU");
    store.setValue(Number(operand2));
  }

  //Cambiar ciclo

  store.setCurrentCycle("EI");
  if (type2 === "Register") {
    store.setComponent("ALU");
    store.setValue(Number(operand1));
    store.setValue(Number(operand2));
  } else {
    store.setComponent("ALU");
    store.setValue(Number(operand1));
    store.setComponent("UC");
    store.setValue(Number(operand2));
  }
  /*
  se ilumina la ALU
  Dentro de la ALU, mostrar el valor de “primer dato” (con el valor en binario de AL)
  se ilumina UC
  Dentro de la ALU, mostrar el valor de “segundo dato” (con el valor en binario de BL)
  */

  switch (codop) {
    case "ADD":
      store.setValue(Number(operand1) + Number(operand2));
      // agregar el valor de la suma al registro
      store.setRegisterValue(
        operand1 as Register,
        Number(operand1) + Number(operand2),
      );
      break;
    case "DEC":
      store.setValue(Number(operand1) - Number(operand2));
      // agregar el valor de la resta al registro
      store.setRegisterValue(
        operand1 as Register,
        Number(operand1) - Number(operand2),
      );
      break;
    case "DIV":
      store.setValue(Number(operand1) / Number(operand2));
      // agregar el valor de la división al registro
      store.setRegisterValue(
        operand1 as Register,
        Number(operand1) / Number(operand2),
      );
      break;
    case "MUL":
      store.setValue(Number(operand1) * Number(operand2));
      // agregar el valor de la multiplicación al registro
      store.setRegisterValue(
        operand1 as Register,
        Number(operand1) * Number(operand2),
      );
      break;
  }

  //cambiar ciclo
  store.setCurrentCycle("WO");
  // se ilumina banco de registros
  store.setComponent("BR");
  //se actualiza el valor del primer operando de la instrucción ADD| AL  | nuevo valor (en binario)  |
  store.setRegisterValue(operand1 as Register, Number(operand1));
};

/*
// no hay CO ni FO
24- se muestra el valor de la direccion “00000000” (AL) en el banco de registros (en este caso sería | AL | valor en binario | )

--> Si el segundo operando es un registro
25- se muestra el valor de la direccion “00000001” (BL) en el banco de registros (en este caso sería | BL | valor en binario | )
--> Si el segundo opernado es un dato directo
// no hacer nada, pasar a lo siguiente


EI
--> Si el segundo operando es un registro
26- se ilumina la ALU
27- Dentro de la ALU, mostrar el valor de “primer dato” (con el valor en binario de AL)
28- Dentro de la ALU, mostrar el valor de “segundo dato” (con el valor en binario de BL)
29- se muestra el resultado de la suma en la cajita de resultado de la ALU
30- se actualiza el valor del primer operando de la instrucción ADD  | AL  | valor |


--> Si el segundo operando es un dato inmediato
31- se ilumina la ALU
32- Dentro de la ALU, mostrar el valor de “primer dato” (con el valor en binario de AL)
33- se ilumina UC
34- Dentro de la ALU, mostrar el valor de “segundo dato” (con el valor en binario de BL)
35- se muestra el resultado de la suma en la cajita de resultado de la ALU
36- se actualiza el valor del primer operando de la instrucción ADD  | AL  | valor |

WO
37- se ilumina banco de registros
38- se actualiza el valor del primer operando de la instrucción ADD | AL  | nuevo valor (en binario)  |
*/
