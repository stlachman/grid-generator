import React from "react";
import { Global, css } from "@emotion/core";

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          body {
            font-family: -apple-system, system-ui, BlinkMacSystemFont,
              "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-seri;
            background-color: #e2e8f0;
            color: #1a202c;
          }
        `}
      />
      {children}
    </>
  );
};

export default Layout;
