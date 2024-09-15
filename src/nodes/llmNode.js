import React, { useCallback, useState } from 'react';
import { AbstractNode } from './CustomNodes/AbstractNode';

export const LLMNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.name || id.replace('customLLM-', 'llm_'));
  const [llmType, setLlmType] = useState(data?.llmType || 'OpenAI');

  const handleNameChange = useCallback((e) => {
    setCurrName(e.target.value);
  }, []);

  const handleLlmTypeChange = useCallback((e) => {
    setLlmType(e.target.value);
  }, []);

  return (
    <AbstractNode
      id={id}
      heading="LLM"
      body={[
        { type: 'Input', name: 'name', label: 'Name', value: currName, onChange: handleNameChange },
        {
          type: 'select',
          name: 'llmType',
          label: 'LLM Type',
          value: llmType,
          selectoptions: [
            { value: 'OpenAI', label: 'OpenAI' },
            { value: 'Anthropic', label: 'Anthropic' },
            { value: 'Llama', label: 'Llama' },
            { value: 'Cohere', label: 'Cohere' },
            { value: 'AWS', label: 'AWS' },
            { value: 'OpenSource', label: 'OpenSource' }
          ],
          onChange: handleLlmTypeChange
        }
      ]}
      handles={[
        { position: 'Left', type: 'target', id: `${id}-input1` },
        { position: 'Left', type: 'target', id: `${id}-input3` },
        { position: 'Right', type: 'source', id: `${id}-output1` }       ]}
    />
  );
};
