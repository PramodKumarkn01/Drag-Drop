import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { TouchTransition, createTransition } from 'dnd-multi-backend';
import BuilderCanvas from './Components/BuilderCanvas';
import ElementPanel from './Components/ElementPanel';
import ElementEditor from './Components/ElementEditor';
import './styles/App.css'; // You can manage global styles here if needed

const App = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // Define the multi-backend configuration for mobile and desktop support
  const backendOptions = {
    backends: [
      {
        backend: HTML5Backend, // For desktop
        transition: createTransition('desktop'),
      },
      {
        backend: TouchBackend, // For mobile
        options: { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  };

  // Handle dropping elements onto the canvas
  const handleDrop = (item, monitor) => {
    const offset = monitor.getSourceClientOffset();
    const newElement = {
      id: Date.now(),
      type: item.type,
      left: offset ? offset.x : 0,
      top: offset ? offset.y : 0,
      properties: item.type === 'Text' ? { text: 'Sample Text' } : {},
    };

    setElements([...elements, newElement]);
  };

  // Update properties for the selected element
  const updateProperties = (newProperties) => {
    setElements(
      elements.map((el) =>
        el.id === selectedElement?.id ? { ...el, properties: newProperties } : el
      )
    );
  };

  return (
    <DndProvider backend={MultiBackend} options={backendOptions}>
      <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
        {/* Left Panel for Elements */}
        <div className="w-full lg:w-1/4 p-4 bg-gray-100 h-full overflow-auto">
          <ElementPanel />
        </div>

        {/* Middle Section: Builder Canvas */}
        <div className="w-full lg:w-3/4 p-4 bg-white h-full overflow-auto">
          <BuilderCanvas
            elements={elements}
            setSelectedElement={setSelectedElement}
            handleDrop={handleDrop}
          />
        </div>

        {/* Right Panel for Element Properties */}
        {selectedElement && (
          <div className="w-full lg:w-1/4 p-4 bg-gray-50 h-full overflow-auto">
            <ElementEditor
              selectedElement={selectedElement}
              updateProperties={updateProperties}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
