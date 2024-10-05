import React from 'react';
import DraggableElement from './DraggableElement';

const ElementPanel = () => {
  const elements = [
    { type: 'Text', label: 'Text' },
    { type: 'Image', label: 'Image' },
    { type: 'Button', label: 'Button' },
  ];

  // Inline styles for the component
  const panelStyle = {
    backgroundColor: '#8024DC',
    padding: '20px',
    borderRadius: '5px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  };

  const headingStyle = {
    marginBottom: '10px',
    fontSize: '22px',
    textAlign: 'center',
  };

  const elementListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
  };

  // Responsive inline styles for smaller screens using a media query
  const responsiveStyle = window.innerWidth <= 768 ? {
    flexDirection: 'column',
    padding: '15px',
  } : {
    justifyContent: 'space-around',
  };

  return (
    <div style={{ ...panelStyle, ...responsiveStyle }}>
      <h3 style={headingStyle}>Available Elements</h3>
      <div style={elementListStyle}>
        {elements.map((el) => (
          <DraggableElement key={el.type} type={el.type} label={el.label} />
        ))}
      </div>
    </div>
  );
};

export default ElementPanel;
