import React from "react";
import styles from "./LayoutWrapper.module.scss";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div id="layout" className={styles["layout"]}>
      {children}
    </div>
  );
}
