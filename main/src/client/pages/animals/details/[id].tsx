import React from 'react';
import { Animal } from '.prisma/client';
import { fetchAnimal } from 'api';
import { IdWrapper } from 'components/IdWrapper';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { SSRContext } from 'types';
import { AnimalFetcher } from 'components/AnimalFetcher';
import { AnimalBreadcrumbs } from 'components/AnimalDetails/AnimalBreadcrumbs';
import { AnimalHeader } from 'components/AnimalDetails/AnimalHeader/AnimalHeader';
import { AnimalMetadata } from 'components/AnimalDetails/AnimalMetadata/AnimalMetadata';
import { AnimalImages } from 'components/AnimalDetails/AnimalImages/AnimalImages';

export default function AnimalWrapper({ ssrAnimal }: { ssrAnimal: Animal }) {
  return <IdWrapper Component={AnimalComponent} ssrAnimal={ssrAnimal} />;
}

function AnimalComponent({ id, ssrAnimal }: { id: string; ssrAnimal: Animal }) {
  return (
    <LayoutWrapper>
      <AnimalFetcher id={id} ssrAnimal={ssrAnimal} Component={AnimalDetails} />
    </LayoutWrapper>
  );
}

function AnimalDetails({ animal }: { animal: Animal }) {
  return (
    <>
      <AnimalBreadcrumbs animal={animal} />
      <AnimalHeader animal={animal} />
      <AnimalMetadata animal={animal} />
      <AnimalImages id={animal.id} />
    </>
  );
}

export async function getServerSideProps(context: SSRContext): Promise<{
  props: { ssrAnimal: Animal };
}> {
  const { id } = context.query;
  return { props: { ssrAnimal: (await fetchAnimal(id)).data } };
}
