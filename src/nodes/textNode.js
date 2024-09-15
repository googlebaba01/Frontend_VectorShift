import React, { useCallback, useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { AbstractNode } from './CustomNodes/AbstractNode';

export const TextNode = ({ id, data }) => {
  const [textContent, setTextContent] = useState(data?.textContent || '');
  const [textStyle, setTextStyle] = useState(data?.textStyle || 'Bold');
  const [handles, setHandles] = useState([{ position: 'Left', type: 'target', id: `${id}-value` }]);

  // Parse for {{variable}} and create corresponding Handles
  useEffect(() => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [...textContent.matchAll(regex)];
    const newHandles = matches.map(match => ({
      position: 'Left',
      type: 'target',
      id: `${id}-${match[1]}`
    }));
    setHandles([{ position: 'Left', type: 'target', id: `${id}-value` }, ...newHandles]);
  }, [textContent, id]);

  const handleTextContentChange = useCallback((e) => {
    setTextContent(e.target.value);
  }, []);

  const handleTextStyleChange = useCallback((e) => {
    setTextStyle(e.target.value);
  }, []);

  return (
    <AbstractNode
      id={id}
      heading="Text"
      body={[
        {
          type: 'Input',
          name: 'textContent',
          label: 'Content',
          value: textContent,
          onChange: handleTextContentChange,
          renderInput: () => (
            <TextareaAutosize
              value={textContent}
              onChange={handleTextContentChange}
              style={{
                width: '100%',           // Full width of the container
                padding: '10px',          // Padding inside the textarea
                border: '1px solid #ccc', // Border styling
                borderRadius: '5px',      // Rounded corners
                resize: 'none',           // Disable manual resizing
                whiteSpace: 'pre-wrap',   // Preserve line breaks and whitespace
                wordWrap: 'break-word',   // Break long words
                overflow: 'hidden',       // Hide scrollbars if necessary
                maxWidth: '30ch',         // Constrain the width to ~30 characters
              }}
              minRows={1}
              maxRows={10}  // Adjust max rows as needed
            />
          )
        },
        {
          type: 'select',
          name: 'textStyle',
          label: 'Style',
          value: textStyle,
          selectoptions: [
            { value: 'Bold', label: 'Bold' },
            { value: 'Italic', label: 'Italic' }
          ],
          onChange: handleTextStyleChange
        }
      ]}
      handles={handles}
    />
  );
};
