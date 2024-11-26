import { TypeOperand } from "../store/createProgramSlice";
import useStore from "../store/useStore";

// INSTRUCCIÓN ADD
export const addInstruction = async (
  operand1: string,
  operand2: string,
  type1: TypeOperand,
  type2: TypeOperand,
) => {
  const store = useStore.getState();
};

/*
FI
1- Mostrar current component en la UC
2- Iluminar PC
3- Mostrar #dirección (de la instrucción ADD AL, BL) en cajita de PC (es la siguiente dirección que calcule el PC, osea, dirección anterior + 1, por ej la 00000001)
4- Iluminar MAR 
5- Iluminar MAR
6- Mostrar #dirección en cajita de MAR
7- Iluminar UC
8- Iluminar bus de control y mostrar 01 que significa “solicitar instrucción”
9- iluminar MAR
10- iluminar bus de direcciones y mostrar #dirección de instrucción ADD AL, BL
11- En la memoria del programa aparece | # | ADD AL, BL |  (mostrar en bits)
12- Iluminar bus de datos
13- Mostrar “MOV AL, 5” en el bus de datos
14- Iluminar MBR
15- Mostrar “MOV AL, 5” en el MBR
16- Iluminar bus de datos
17- Mostrar “00000011 00000000 00000001” en el bus de datos
18- Iluminar MBR
19- Mostrar “00000011 00000000 00000001” en el MBR
20- Se ilumina el IR
21- Mostrar el dato “00000011 00000000 00000001” en el IR

DI
22- Iluminar UC
23- mostrar la instrucción decodificada “ADD 00000000 , 00000001” en la UC

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
