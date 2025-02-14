import React from "react";
import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      containerStyle={{ zIndex: 99999 }}
      position="top-right"
      reverseOrder={false}
      
      toastOptions={{
        duration: 2000,
        success: {
          style: {
            background: "var(--toast-success-bg)",
            color: "var(--toast-success-text)",
          },
          iconTheme: {
            primary: "var(--toast-success-text)",
            secondary: "#FFFFFF",
          },
        },
        error: {
          style: {
            background: "var(--toast-error-bg)",
            color: "var(--toast-error-text)",
          },
        },

      }}
    />
  );
}