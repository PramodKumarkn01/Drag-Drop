import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ElementProperties = ({ selectedElement, showAllFields }) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (selectedElement) {
      reset(selectedElement); 
    }
  }, [selectedElement, reset]);

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  return (
    <div>
      <style>
        {`
          .properties-panel {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 25px;
            width: 100%; /* Set width to 40% */
            margin: 20px auto; /* Center the panel */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            marginLeft:20px
          }
          .properties-panel h3 {
            margin-bottom: 15px;
            font-size: 1.5em;
            color: #333;
          }
          .properties-panel label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
          }
          .properties-panel input[type="text"],
          .properties-panel input[type="url"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .properties-panel button {
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s;
          }
          .properties-panel button:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      {(selectedElement || showAllFields) && (
        <form className="properties-panel" onSubmit={handleSubmit(onSubmit)}>
          <h3>Edit Properties {showAllFields ? "for All Elements" : `for ${selectedElement.type} Element`}</h3>

          {showAllFields || selectedElement.type === 'Text' ? (
            <>
              <label>Text</label>
              <input type="text" {...register('text')} />
            </>
          ) : null}

          {showAllFields || selectedElement.type === 'Image' ? (
            <>
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setValue('src', reader.result); 
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </>
          ) : null}

          {showAllFields || selectedElement.type === 'Button' ? (
            <>
              <label>Button Text</label>
              <input type="text" {...register('buttonText')} />
            </>
          ) : null}

          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default ElementProperties;
