import React, { useCallback, useState } from 'react';
import { AbstractNode } from './CustomNodes/AbstractNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = useCallback((e) => {
    setCurrName(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e) => {
    setOutputType(e.target.value);
  }, []);

  return (
    <AbstractNode
      id={id}
      heading="Output"
      body={[
        { type: 'Input', name: 'outputName', label: 'Name', value: currName, onChange: handleNameChange },
        { 
          type: 'select', 
          name: 'outputType', 
          label: 'Type', 
          value: outputType, 
          selectoptions: [
            { value: 'Video', label: 'Video' }, 
            { value: 'Audio', label: 'Audio' },
            { value: 'Text', label: 'Text' },
            { value: 'Files', label: 'Files' }
          ], 
          onChange: handleTypeChange 
        }
      ]}
      handles={[
        { position: 'Left', type: 'target', id: `${id}-value`, label: 'Input' }  // Add label to the handle
      ]}
    />
  );
};
