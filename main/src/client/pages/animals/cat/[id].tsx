import { Animal } from '.prisma/client';
import {
  AnimalDetails,
  fetchAnimal,
} from 'components/AnimalDetails/AnimalDetails';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';
import { IdWrapper } from 'components/IdWrapper';

export default function Cat({ ssrAnimal }) {
  return <IdWrapper Component={CatDetails} ssrAnimal={ssrAnimal} />;
}

function CatDetails({ id, ssrAnimal }) {
  return (
    <>
      <Breadcrumbs items={['Zwierzęta', 'Koty do adopcji']} />
      <AnimalDetails id={id} ssrAnimal={ssrAnimal} />
    </>
  );
}

export async function getServerSideProps(context: any): Promise<{
  props: { ssrPage: Animal };
}> {
  const { id } = context.query;
  const page = await fetchAnimal(id);
  return { props: { ssrPage: page } };
}
