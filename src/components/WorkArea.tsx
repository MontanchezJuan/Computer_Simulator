import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import React from "react";
import { DraggableBlock } from "./DraggableBlock";

type DynamicItem = {
  id: string;
  type: string;
  children?: DynamicItem[];
};

interface WorkAreaProps {
  items: DynamicItem[];
}

export const WorkArea = ({ items }: WorkAreaProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: "workarea" });

  const style: React.CSSProperties = {
    backgroundColor: isOver ? "#d1f7c4" : "#e0e0e0",
    padding: "20px",
    minHeight: "200px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  const renderItem = (item: DynamicItem) => (
    <div
      key={item.id}
      style={{
        marginLeft: item.type === "Asignar Variable" ? "20px" : "0px",
      }}
    >
      <DraggableBlock id={item.id} label={item.type} />
      {item.children && (
        <div style={{ marginLeft: "20px" }}>
          {item.children.map((child) => renderItem(child))}
        </div>
      )}
    </div>
  );

  return (
    <div ref={setNodeRef} style={style}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        {items.map((item) => renderItem(item))}
      </SortableContext>
    </div>
  );
};
