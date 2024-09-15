import React, { useCallback, useState, useEffect } from 'react';
import { AbstractNode } from './CustomNodes/AbstractNode';

// Define default no-op function
const defaultCreateNode = () => {};
const defaultConnectNodes = () => {};

export const InputNode = ({ id, data, createNode = defaultCreateNode, connectNodes = defaultConnectNodes }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const [handles, setHandles] = useState([{ position: 'Right', type: 'source', id: `${id}-value` }]);

  const handleNameChange = useCallback((e) => {
    setCurrName(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e) => {
    setInputType(e.target.value);
  }, []);

  // Parse for {{variable}} and create corresponding Handles and Nodes
  useEffect(() => {
    const regex = /\{\{(\w+)\}\}/g; // Regex to find variables inside double curly brackets
    const matches = [...currName.matchAll(regex)];

    // Base handle (e.g., for value output)
    const baseHandles = [{ position: 'Right', type: 'source', id: `${id}-value` }];

    // Create dynamic handles for each found variable inside {{}}
    const newHandles = matches.map(match => {
      const variable = match[1]; // Extract the variable name inside {{}}

      // Generate a unique ID for the new node
      const newNodeId = `jsNode-${variable}-${Math.random().toString(36).substring(2, 9)}`;

      // Create a new node for this variable (e.g., a TextNode or JavaScriptNode)
      createNode({
        id: newNodeId,
        type: 'TextNode', // Could also be a JavaScriptNode
        data: { textContent: `Evaluating {{${variable}}}` }, // Data for the new node
        position: { x: Math.random() * 400, y: Math.random() * 400 } // Random position for now
      });

      // Connect the InputNode to the new node
      connectNodes(id, newNodeId); // Create a connection from this InputNode to the new node

      // Return a new handle configuration for this variable
      return {
        position: 'Left', // Place the handle on the left side
        type: 'target', // This handle will be a target for connections
        id: `${id}-${variable}`, // Unique handle ID based on variable
        label: `JS Input (${variable})` // Label the handle with the variable name
      };
    });

    // Update the handles state with the newly created ones
    setHandles([...baseHandles, ...newHandles]);
  }, [currName, id, createNode, connectNodes]);

  return (
    <AbstractNode
      id={id}
      heading="Input"
      body={[
        {
          type: 'Input',
          name: 'inputName',
          label: 'Name',
          value: currName,
          onChange: handleNameChange
        },
        {
          type: 'select',
          name: 'inputType',
          label: 'Type',
          value: inputType,
          selectoptions: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' }
          ],
          onChange: handleTypeChange
        }
      ]}
      handles={handles} // Pass the dynamic handles to AbstractNode
    />
  );
};
