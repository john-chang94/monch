import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

// Custom toast
export const Toast = ({ toast, showToast, isError }) => {
  const toastRef = useRef();
  return (
    <CSSTransition // For custom toast with message
      in={showToast}
      timeout={300}
      classNames="toast-fade"
      unmountOnExit
      nodeRef={toastRef}
    >
      <div
        ref={toastRef}
        className={`toast ${
          isError ? "bg-red-accent-1" : "bg-light-blue-lighten-4"
        }`}
      >
        <p>{toast}</p>
      </div>
    </CSSTransition>
  );
};
