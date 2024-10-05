import React from 'react';
import DraggableElement from './DraggableElement';

const ElementPanel = () => {
  const elements = [
    { type: 'Text', label: 'Text', icon: 'text' },
    { type: 'Image', label: 'Image', icon: 'image' },
    { type: 'Button', label: 'Button', icon: 'button' },
  ];

  const getIcon = (icon) => {
    switch (icon) {
      case 'text':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-muted-foreground"
          >
            <path d="M17 6.1H3"></path>
            <path d="M21 12.1H3"></path>
            <path d="M15.1 18H3"></path>
          </svg>
        );
      case 'image':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-muted-foreground"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
        );
      case 'button':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-muted-foreground"
          >
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
            <path d="m3.3 7 8.7 5 8.7-5"></path>
            <path d="M12 22V12"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-muted p-6 border-r flex flex-col gap-4  shrink-0">
      <h2 className="text-lg font-medium">Elements</h2>

      <div className="grid grid-cols-1 gap-4">
        {elements.map((el) => (
          <DraggableElement key={el.type} type={el.type} label={el.label} icon={getIcon(el.icon)} />
        ))}
      </div>
    </div>
  );
};

export default ElementPanel;
