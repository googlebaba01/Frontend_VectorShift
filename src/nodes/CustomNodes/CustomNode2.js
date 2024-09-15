// src/nodes/CustomNodes/CustomNode2.js
import React from 'react';
import { AbstractNode } from './AbstractNode'; 

export const CustomNode2 = ({ id, data }) => (
  <AbstractNode 
    id={id}
    heading="Custom Node 2"
    data={data}
    body={[
      { type: 'Input', name: 'customName', label: 'Custom Name', value: data?.customName || '', onChange: (e) => {/* handle change */} },
      { type: 'select', name: 'customType', label: 'Custom Type', value: data?.customType || 'Option1', selectoptions: [{ value: 'Option1', label: 'Option 1' }, { value: 'Option2', label: 'Option 2' }] }
    ]}
    handles={[
      { position: 'right', type: 'source', id: 'value' }
    ]}
  />
);
