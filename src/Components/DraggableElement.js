import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ELEMENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="bg-gray-300 p-4 flex items-center gap-2 justity-center rounded-md shadow-sm cursor-grab"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default DraggableElement;
