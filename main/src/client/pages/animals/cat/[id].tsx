import { IdWrapper } from 'components/IdWrapper';

export default function Cat() {
  return <IdWrapper Component={CatDetails} />;
}

function CatDetails({ id }) {
  return 'cat ' + id;
}
