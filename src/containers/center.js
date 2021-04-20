import React from 'react';

export function CenterContainer({children, ...restProps}) {
    const fixed = {
      position: "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%"
    };
    return (
        <div style={fixed}>
            {children}
        </div>        
    );
}