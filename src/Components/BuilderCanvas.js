import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';


const BuilderCanvas = () => {
  const [elements, setElements] = useState([]); // Track dropped elements
  const [selectedElement, setSelectedElement] = useState(null); // Track selected element for editing

  // Define the drop area using useDrop from react-dnd
  const [, drop] = useDrop({
    accept: 'ELEMENT',
    drop: (item) => handleDrop(item),
  });

  // Function to handle element drop
  const handleDrop = (item) => {
    const newElement = {
      id: elements.length + 1, // Generate unique ID
      type: item.type, // Type of the dropped element (Text, Image, Button)
      properties: {
        text: item.type === 'Text' ? 'Sample Text' : 'Button',
        src: item.type === 'Image' ? '' : undefined,
        left: window.innerWidth / 4, // Drop at center of canvas initially
        top: window.innerHeight / 4, // Drop at center of canvas initially,
        width: item.type === 'Image' ? 100 : undefined,
        height: item.type === 'Image' ? 100 : undefined,
        color: item.type === 'Text' ? '#000000' : item.type === 'Button' ? '#ffffff' : undefined,
        backgroundColor: item.type === 'Button' ? '#0000ff' : undefined, // Set button background color to blue
      },
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedElement(newElement); // Auto-select the newly dropped element for editing
  };

  // Function to update element properties (text, position, etc.)
  const updateElement = (id, updatedProperties) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, properties: updatedProperties } : el))
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Left Side Canvas */}
      <div
        ref={drop}
        className="bg-white p-4 lg:p-8 rounded-md shadow-sm w-full lg:w-2/3 h-1/2 lg:h-full overflow-auto border border-gray-300 relative"
      >
        <h3 className="text-lg font-bold mb-4">Canvas Area</h3>
        {elements.length === 0 && (
          <div className="text-gray-500">Drag and drop elements here</div>
        )}
        {elements.map((el) => (
          <div
            key={el.id}
            className="absolute cursor-pointer"
            style={{
              left: el.properties.left,
              top: el.properties.top,
              width: el.properties.width ? `${el.properties.width}px` : 'auto',
              height: el.properties.height ? `${el.properties.height}px` : 'auto',
              color: el.properties.color,
            }}
            onClick={() => setSelectedElement(el)} // Select element to edit
          >
            {el.type === 'Text' && <p>{el.properties.text || 'Text Element'}</p>}
            {el.type === 'Image' && (
              <img
                src={el.properties.src || 'https://via.placeholder.com/100'}
                alt="placeholder"
                className="w-full h-full mx-auto"
              />
            )}
            {el.type === 'Button' && (
              <button
                className="px-4 py-2 rounded mx-auto block"
                style={{ backgroundColor: '#0000ff', color: '#ffffff' }}
              >
                {el.properties.text || 'Button'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Right Side Element Editor */}
      {selectedElement && (
        <div className="w-full lg:w-1/3 p-4 bg-gray-100 border-l h-1/2 lg:h-full">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">Edit {selectedElement.type} Element</h3>

            {/* Render the form based on the type of the selected element */}
            {selectedElement.type === 'Text' && (
              <div>
                <label className="block text-sm font-medium mb-2">Text</label>
                <input
                  type="text"
                  name="text"
                  value={selectedElement.properties.text}
                  onChange={(e) =>
                    setSelectedElement((prev) => ({
                      ...prev,
                      properties: { ...prev.properties, text: e.target.value },
                    }))
                  }
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter text"
                />
              </div>
            )}

            {selectedElement.type === 'Image' && (
              <div>
                <label className="block text-sm font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSelectedElement((prev) => ({
                          ...prev,
                          properties: { ...prev.properties, src: reader.result },
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
            )}

            {selectedElement.type === 'Button' && (
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  name="text"
                  value={selectedElement.properties.text}
                  onChange={(e) =>
                    setSelectedElement((prev) => ({
                      ...prev,
                      properties: { ...prev.properties, text: e.target.value },
                    }))
                  }
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter button text"
                />
              </div>
            )}

            {/* Position Control with Sliders */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Position (X, Y)</label>
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <input
                    type="range"
                    name="left"
                    min="0"
                    max="1000"
                    value={selectedElement.properties.left}
                    onChange={(e) =>
                      setSelectedElement((prev) => ({
                        ...prev,
                        properties: { ...prev.properties, left: parseInt(e.target.value) },
                      }))
                    }
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">X Position: {selectedElement.properties.left}</span>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="range"
                    name="top"
                    min="0"
                    max="1000"
                    value={selectedElement.properties.top}
                    onChange={(e) =>
                      setSelectedElement((prev) => ({
                        ...prev,
                        properties: { ...prev.properties, top: parseInt(e.target.value) },
                      }))
                    }
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">Y Position: {selectedElement.properties.top}</span>
                </div>
              </div>
            </div>

            {/* Size Control with Sliders */}
            {selectedElement.type === 'Image' && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Size (Width, Height)</label>
                <div className="flex gap-2">
                  <div className="flex flex-col w-full">
                    <input
                      type="range"
                      name="width"
                      min="50"
                      max="500"
                      value={selectedElement.properties.width}
                      onChange={(e) =>
                        setSelectedElement((prev) => ({
                          ...prev,
                          properties: { ...prev.properties, width: parseInt(e.target.value) },
                        }))
                      }
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">Width: {selectedElement.properties.width}px</span>
                  </div>
                  <div className="flex flex-col w-full">
                    <input
                      type="range"
                      name="height"
                      min="50"
                      max="500"
                      value={selectedElement.properties.height}
                      onChange={(e) =>
                        setSelectedElement((prev) => ({
                          ...prev,
                          properties: { ...prev.properties, height: parseInt(e.target.value) },
                        }))
                      }
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">Height: {selectedElement.properties.height}px</span>
                  </div>
                </div>
              </div>
            )}

            {/* Color Control */}
            {(selectedElement.type === 'Text' || selectedElement.type === 'Button') && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Color</label>
                <input
                  type="color"
                  name="color"
                  value={selectedElement.properties.color}
                  onChange={(e) =>
                    setSelectedElement((prev) => ({
                      ...prev,
                      properties: { ...prev.properties, color: e.target.value },
                    }))
                  }
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
            )}

            <button
              onClick={() => updateElement(selectedElement.id, selectedElement.properties)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderCanvas;