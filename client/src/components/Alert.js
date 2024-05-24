// Alert.js
import React from 'react';

function Alert({ alert }) {
  return (
    <>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.msg}
        </div>
      )}
    </>
  );
}

export default Alert;
