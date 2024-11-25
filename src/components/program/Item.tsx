import React, { useEffect, useState } from "react";
import { ProgramItem } from "../../store/createProgramSlice";
import useStore from "../../store/useStore";

interface ItemProps {
  children?: React.ReactNode;
  id: string;
}

export function Item({ children, id }: ItemProps) {
  const items = useStore((store) => store.items);
  const setOperand = useStore((store) => store.setOperand);
  const setType = useStore((store) => store.setType);
  const [currentItem, setCurrentItem] = useState<ProgramItem | undefined>();

  useEffect(() => {
    setCurrentItem(items.find((item) => item.id === id));
  }, [items, id]);

  if (!currentItem) return;

  const buttons = React.Children.toArray(children);

  const baseClasses =
    "w-full h-12 flex items-center border-2 shadow-md text-white gap-2 rounded-md px-2";

  switch (currentItem.codop) {
    case "ADD":
      return (
        <div className={`${baseClasses} border-green-600 bg-green-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
          >
            <option value="AL">AL</option>
            <option value="BL">BL</option>
            <option value="CL">CL</option>
            <option value="DL">DL</option>
          </select>
          <select
            className="text-black"
            onChange={(e) => setType(id, "type2", e.target.value)}
          >
            <option value="Register">Register</option>
            <option value="Number">Number</option>
          </select>
          {currentItem.type2 === "Register" ? (
            <select
              className="text-black"
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              defaultValue={currentItem.operand1}
            >
              <option value="AL">AL</option>
              <option value="BL">BL</option>
              <option value="CL">CL</option>
              <option value="DL">DL</option>
            </select>
          ) : (
            <input
              className="w-12 text-black"
              onChange={(e) => setOperand(id, "operand2", e.target.value)}
              defaultValue={currentItem.operand2}
              type="number"
              max={127}
              min={-127}
            />
          )}
          {buttons[1]}
        </div>
      );

    case "CMP":
      return (
        <div className={`${baseClasses} border-blue-600 bg-blue-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    case "DEC":
      return (
        <div className={`${baseClasses} border-yellow-600 bg-yellow-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    case "DIV":
      return (
        <div className={`${baseClasses} border-red-600 bg-red-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    case "JMP":
      return (
        <div className={`${baseClasses} border-purple-600 bg-purple-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    case "JNZ":
      return (
        <div className={`${baseClasses} border-teal-600 bg-teal-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    case "JZ":
      return (
        <div className={`${baseClasses} border-pink-600 bg-pink-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    case "MOV":
      return (
        <div className={`${baseClasses} border-orange-600 bg-orange-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          <select
            className="text-black"
            onChange={(e) => setOperand(id, "operand1", e.target.value)}
            defaultValue={currentItem.operand1}
          >
            <option value="AL">AL</option>
            <option value="BL">BL</option>
            <option value="CL">CL</option>
            <option value="DL">DL</option>
          </select>
          {buttons[1]}
        </div>
      );

    case "MUL":
      return (
        <div className={`${baseClasses} border-indigo-600 bg-indigo-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    case "VAR":
      return (
        <div className={`${baseClasses} border-gray-600 bg-gray-400`}>
          {buttons[0]}
          <span className="font-bold">{currentItem.codop}</span>
          {buttons[1]}
        </div>
      );

    default:
      return (
        <div className={`${baseClasses} border-gray-400 bg-white text-black`}>
          <span className="font-bold">unknown</span>
          {buttons[1]}
        </div>
      );
  }
}
