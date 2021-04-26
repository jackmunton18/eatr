
import React from 'react';

export function WrapContainer({children, ...restProps}) {
    const wrap = {
      position: "relative",
      display: "block",
      margin: "auto",
      width: "992px"
    };
    return (
        <div style={wrap}>
            {children}
        </div>        
    );
}