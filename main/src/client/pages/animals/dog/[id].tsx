import { Animal } from '.prisma/client';
import { fetchAnimal } from 'api';
import { AnimalDetails } from 'components/AnimalDetails/AnimalDetails';
import { IdWrapper } from 'components/IdWrapper';
import { LayoutWrapper } from 'components/LayoutWrapper';
import React from 'react';
import { SSRContext } from 'types';

export default function Dog({ ssrAnimal }: { ssrAnimal: Animal }) {
  return <IdWrapper Component={DogDetails} ssrAnimal={ssrAnimal} />;
}

function DogDetails({ id, ssrAnimal }: { id: string; ssrAnimal: Animal }) {
  return (
    <LayoutWrapper>
      <AnimalDetails id={id} ssrAnimal={ssrAnimal} />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(context: SSRContext): Promise<{
  props: { ssrAnimal: Animal };
}> {
  const { id } = context.query;
  return { props: { ssrAnimal: (await fetchAnimal(id)).data } };
}
