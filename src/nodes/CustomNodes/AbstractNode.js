import React from 'react';
import { Handle, Position } from 'reactflow';
import TextareaAutosize from 'react-textarea-autosize';
import './AbstractNode.css';

export const AbstractNode = ({ id, heading, body, handles }) => {
  return (
    <div className="nodeContainer">
      <h4 className="nodeHeading">{heading}</h4>
      <div>
        {body.map((inputItem, index) => {
          const { type, name, label, value, onChange, selectoptions } = inputItem;

          // Render different input types
          if (type === 'Input') {
            return (
              <div key={index} className="inputGroup">
                <label className="label">{label}:</label>
                {/* Auto-resizing textarea */}
                <TextareaAutosize
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="textarea"
                  minRows={1}
                  maxRows={10} // Adjust this value if needed
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    resize: 'none',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    overflow: 'hidden'
                  }}
                />
              </div>
            );
          } else if (type === 'select') {
            return (
              <div key={index} className="inputGroup">
                <label className="label">{label}:</label>
                <select name={name} value={value} onChange={onChange} className="select">
                  {selectoptions.map((option, idx) => (
                    <option key={idx} value={option.value} className="option">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Handles */}
      {handles?.map((handle, idx) => (
        <Handle
          key={idx}
          type={handle.type}
          position={Position[handle.position]}
          id={handle.id}
          className={`handle ${handle.type === 'target' ? 'handle-target' : 'handle-source'}`}
        />
      ))}
    </div>
  );
};
