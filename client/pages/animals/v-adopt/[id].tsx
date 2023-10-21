// import Link from 'next/link';
import { Animal } from '.prisma/client';
import { fetchAnimal } from 'api/api';
import { IdWrapper } from 'components/IdWrapper';
import { SSRContext } from 'types';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { AnimalFetcher } from '../../../components/AnimalFetcher';
import { Page } from 'components/Page';
import { VAdoptionForm } from '../../../components/VAdoptionForm/VAdoptionForm';

export default function AnimalWrapper({ ssrAnimal }: { ssrAnimal: Animal }) {
  return <IdWrapper Component={AnimalComponent} ssrAnimal={ssrAnimal} />;
}

function AnimalComponent({ id, ssrAnimal }: { id: string; ssrAnimal: Animal }) {
  return (
    <AnimalFetcher id={id} ssrAnimal={ssrAnimal} Component={VAdoptionDetails} />
  );
}

function VAdoptionDetails({ animal }: { animal: Animal }) {
  return (
    <>
      <Breadcrumbs
        items={[
          'Adopcje wirtualne',
          <a key="last" href="/v-adoptions/to-adopt">
            Szukają opiekunów
          </a>,
          <a key="last" href={`/animals/details/${animal.id}`}>
            {animal.name}
          </a>,
        ]}
      />
      <Page id="formularz-adopcji-wirtualnej" ssrPage={null} />
      <VAdoptionForm animal={animal} />
    </>
  );
}

export async function getServerSideProps(context: SSRContext): Promise<{
  props: { ssrAnimal: Animal };
}> {
  const { id } = context.query;
  return { props: { ssrAnimal: (await fetchAnimal(id)).data } };
}
