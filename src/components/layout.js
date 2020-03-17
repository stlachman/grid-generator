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
            background-color: #fff;
            color: #1a202c;
          }
        `}
      />
      {children}
    </>
  );
};

export default Layout;
