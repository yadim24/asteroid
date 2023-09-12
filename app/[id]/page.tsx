import { ReactElement } from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default function Asteroid({ params: { id } }: Props): ReactElement {
  return <p>Астероид: {id}</p>;
}
