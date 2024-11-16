import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export const DraggableBlock = ({
  id,
  label,
}: {
  id: string;
  label: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#f0f0f0",
    marginBottom: "8px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
};
