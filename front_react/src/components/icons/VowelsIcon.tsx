import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const VowelsIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <text
        x="1"
        y="16"
        style={{
          fontSize: '10px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fill: 'currentColor',
          letterSpacing: '-0.5px'
        }}
      >
        aeiou
      </text>
    </SvgIcon>
  );
};

export default VowelsIcon; 