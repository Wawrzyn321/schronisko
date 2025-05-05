import React from 'react';
import { Animal } from '@prisma-app/client';
import { fetchAnimal } from 'api/api';
import { IdWrapper } from 'components/IdWrapper';
import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import { SSRContext } from 'types';
import { AnimalFetchContainer } from 'components/AnimalFetchContainer/AnimalFetchContainer';
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
      <AnimalFetchContainer id={id} ssrAnimal={ssrAnimal} Component={AnimalDetails} />
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
