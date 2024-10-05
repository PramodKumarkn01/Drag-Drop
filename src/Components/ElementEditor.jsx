
// ElementEditor Component
import React, { useState, useEffect } from 'react';

const ElementEditor = ({ element, updateElement }) => {
  const [properties, setProperties] = useState(element.properties); // Track current properties

  useEffect(() => {
    setProperties(element.properties); // Update form fields when a new element is selected
  }, [element]);

  // Update the property state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperties((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProperties((prev) => ({ ...prev, src: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save the updated properties to the canvas
  const handleSave = () => {
    updateElement(element.id, properties); // Update the element in the canvas
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Edit {element.type} Element</h3>

      {/* Render the form based on the type of the selected element */}
      {element.type === 'Text' && (
        <div>
          <label className="block text-sm font-medium mb-2">Text</label>
          <input
            type="text"
            name="text"
            value={properties.text}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Enter text"
          />
        </div>
      )}

      {element.type === 'Image' && (
        <div>
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      )}

      {element.type === 'Button' && (
        <div>
          <label className="block text-sm font-medium mb-2">Button Text</label>
          <input
            type="text"
            name="text"
            value={properties.text}
            onChange={handleInputChange}
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
              value={properties.left}
              onChange={handleInputChange}
              className="w-full"
            />
            <span className="text-sm text-gray-600">X Position: {properties.left}</span>
          </div>
          <div className="flex flex-col w-full">
            <input
              type="range"
              name="top"
              min="0"
              max="1000"
              value={properties.top}
              onChange={handleInputChange}
              className="w-full"
            />
            <span className="text-sm text-gray-600">Y Position: {properties.top}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default ElementEditor;