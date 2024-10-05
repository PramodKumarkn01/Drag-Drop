import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = ({ type, label }) => {
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
      className="draggable-element"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        margin: '8px 0',
        border: '1px solid #ddd',
        background: '#f4f4f4',
      }}
    >
      {label}
    </div>
  );
};

export default DraggableElement;
