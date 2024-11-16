import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { DraggableBlock } from "./DraggableBlock";
import { WorkArea } from "./WorkArea";

// Tipo para elementos en el área de trabajo
type DynamicItem = {
  id: string;
  type: string;
  children?: DynamicItem[]; // Permite elementos anidados
};

const staticBlocks = [
  { id: "create-line", type: "Crear Línea" },
  { id: "assign-variable", type: "Asignar Variable" },
];

export const Interpreter = () => {
  const [workItems, setWorkItems] = useState<DynamicItem[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Si se arrastra desde la biblioteca estática
    if (staticBlocks.some((block) => block.id === active.id)) {
      const newBlock = staticBlocks.find((block) => block.id === active.id);
      if (!newBlock) return;

      const newItem = {
        id: `${newBlock.id}-${Date.now()}`,
        type: newBlock.type,
        children: newBlock.id === "create-line" ? [] : undefined, // Solo `Crear Línea` puede tener hijos
      };

      if (over.id === "workarea") {
        // Añadir al área de trabajo como un nuevo elemento principal
        setWorkItems((prev) => [...prev, newItem]);
      } else {
        // Si es un bloque "Crear Línea" en el área de trabajo y permite hijos, añádelo como hijo
        setWorkItems((prev) =>
          prev.map((item) =>
            item.id === over.id && item.type === "Crear Línea"
              ? { ...item, children: [...(item.children || []), newItem] }
              : item,
          ),
        );
      }
    } else {
      // Reordenar elementos dentro del área de trabajo
      const oldIndex = workItems.findIndex((item) => item.id === active.id);
      const newIndex = workItems.findIndex((item) => item.id === over.id);
      setWorkItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="text-black" style={{ display: "flex", gap: "20px" }}>
        <div>
          <h3 className="text-white">Bloques Estáticos</h3>
          {staticBlocks.map((block) => (
            <DraggableBlock key={block.id} id={block.id} label={block.type} />
          ))}
        </div>
        <WorkArea items={workItems} />
      </div>
    </DndContext>
  );
};
