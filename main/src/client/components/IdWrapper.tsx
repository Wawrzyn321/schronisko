import React from 'react';
import { useRouter } from 'next/router';

export function IdWrapper({ Component, ...props }) {
  const router = useRouter();

  const { id } = router.query;

  return id === undefined ? null : <Component id={id} {...props}/>;
}
