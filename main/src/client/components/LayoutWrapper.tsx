import React from 'react';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const style = { margin: '0 32px' };
  return <div style={style}>{children}</div>;
}
