import React from 'react';
import DraggableElement from './DraggableElement';

const ElementPanel = () => {
  const elements = [
    { type: 'Text', label: 'Text' },
    { type: 'Image', label: 'Image' },
    { type: 'Button', label: 'Button' },
  ];

  return (
    <div
      className="element-panel"
      style={{ backgroundColor: '#8024DC', padding: '20px', borderRadius: '5px' }} // Change the color and styles as needed
    >
      <h3>Available Elements</h3>
      {elements.map((el) => (
        <DraggableElement key={el.type} type={el.type} label={el.label} />
      ))}
    </div>
  );
};

export default ElementPanel;
