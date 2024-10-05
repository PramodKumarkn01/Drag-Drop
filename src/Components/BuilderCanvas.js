import React from 'react';
import { useDrop } from 'react-dnd';

const BuilderCanvas = ({ elements, setSelectedElement, handleDrop }) => {
  // Setting up the drop area with useDrop from react-dnd
  const [, drop] = useDrop({
    accept: 'ELEMENT',
    drop: handleDrop,
  });

  return (
    <div
      ref={drop}
      style={{
        width: '50%',
        minHeight: '500px',
        border: '2px dashed #ccc',
        padding: '16px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
      }}
    >
      {/* Map through each element to render the corresponding UI */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="draggable-element"
          style={{
            cursor: 'pointer',
            border: '1px solid #ddd',
            padding: '8px',
            backgroundColor: '#fff',
            marginLeft: 50,
            marginRight: 50,
            marginTop: 20,
            boxSizing: 'border-box',
          }}
          onClick={() => setSelectedElement(el)}
        >
          {el.type === 'Text' && <p>{el.properties.text}</p>}
          {el.type === 'Image' && (
            <img
              src={el.properties.src || 'https://via.placeholder.com/100'}
              alt="placeholder"
              style={{ width: '100%', maxWidth: 100, height: 'auto' }}
            />
          )}
          {el.type === 'Button' && (
            <button style={{ padding: '8px 12px' }}>
              {el.properties.text || 'Button'}
            </button>
          )}
        </div>
      ))}

      {/* Responsive CSS */}
      <style jsx>{`
        .canvas {
          width: 50%;
          margin: 0 auto;
        }
        
        @media (max-width: 1024px) {
          .canvas {
            width: 80%; /* For tablets */
          }
          .draggable-element {
            margin: 20px auto;
          }
        }

        @media (max-width: 768px) {
          .canvas {
            width: 90%; /* For mobile devices */
            min-height: 400px;
            padding: 8px;
          }
          .draggable-element {
            padding: 4px;
            margin: 16px auto;
          }
        }

        @media (max-width: 480px) {
          .canvas {
            width: 100%; /* For very small screens */
            min-height: 300px;
          }
          .draggable-element {
            margin-left: 0;
            margin-right: 0;
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default BuilderCanvas;
