import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

const GET_EPISODE = gql`
  query($id: ID!) {
    episode(id: $id) {
      name
      air_date
      episode
      characters
    }
  }
`;

export default function EpisodeDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id },
    skip: !id,
  });

 
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  console.log(data.episode.characters);
  return (
    <div>
      <h1>Episodio: {data.episode.name}</h1>
      <p>Fecha de emisión: {data.episode.air_date}</p>
      <p>Episodio: {data.episode.episode}</p>
      <h2>Personajes:</h2>
      <ul>
        {data.episode.characters.map((characterUrl: string) => (
          <li key={characterUrl}>
            <Link href={`/character/${characterUrl.split('/').pop()}`}>{characterUrl}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}