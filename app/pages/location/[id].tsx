import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

const GET_LOCATION = gql`
  query($id: ID!) {
    location(id: $id) {
      name
      type
      dimension
      residents {
        id
        name
      }
    }
  }
`;

interface Resident {
  id: string;
  name: string;
}

export default function LocationDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Ubicación: {data.location.name}</h1>
      <p>Tipo: {data.location.type}</p>
      <p>Dimensión: {data.location.dimension}</p>
      <h2>Residentes:</h2>
      <ul>
        {data.location.residents.map((resident: Resident) => (
          <li key={resident.id}>{resident.name}</li>
        ))}
      </ul>
    </div>
  );
}