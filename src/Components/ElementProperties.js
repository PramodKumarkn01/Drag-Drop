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
    <div className="w-full p-4">
      {(selectedElement || showAllFields) && (
        <form
          className="flex flex-col p-4 bg-gray-100 border border-gray-300 rounded-lg m-2 shadow-lg w-full md:w-2/3 lg:w-1/2 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="mb-2 text-lg font-bold text-gray-800">
            Edit Properties {showAllFields ? "for All Elements" : `for ${selectedElement.type} Element`}
          </h3>

          {showAllFields || selectedElement.type === 'Text' ? (
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium text-gray-700">Text</label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                {...register('text')}
              />
            </div>
          ) : null}

          {showAllFields || selectedElement.type === 'Image' ? (
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
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
            </div>
          ) : null}

          {showAllFields || selectedElement.type === 'Button' ? (
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                {...register('buttonText')}
              />
            </div>
          ) : null}

          <button className="p-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition duration-300">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default ElementProperties;
