import { IdWrapper } from 'components/IdWrapper';

export default function Dog() {
  return <IdWrapper Component={DogDetails} />;
}

function DogDetails({ id }) {
  return 'dog ' + id;
}
