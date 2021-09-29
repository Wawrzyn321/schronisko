import React from 'react';
import { useRouter } from 'next/router';

export function IdWrapper({ Component }) {
  const router = useRouter();

  const { id } = router.query;

  return id === undefined ? null : <Component id={id} />;
}
