import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BuilderCanvas from './Components/BuilderCanvas';
import ElementPanel from './Components/ElementPanel';
import ElementProperties from './Components/ElementProperties';
import './styles/App.css';

const App = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // Handle dropping elements onto the canvas
  const handleDrop = (item, monitor) => {
    const offset = monitor.getSourceClientOffset();
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: item.type,
        left: offset.x,
        top: offset.y,
        properties: item.type === 'Text' ? { text: 'Sample Text' } : {},
      },
    ]);
  };

  // Update properties for the selected element
  const updateProperties = (newProperties) => {
    setElements(
      elements.map((el) =>
        el.id === selectedElement.id ? { ...el, properties: newProperties } : el
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <ElementPanel />
        <BuilderCanvas
          elements={elements}
          setSelectedElement={setSelectedElement}
          handleDrop={handleDrop}
        />
        {selectedElement && (
          <ElementProperties
            selectedElement={selectedElement}
            updateProperties={updateProperties}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default App;
