import { gql } from '@apollo/client';
import client from '../apollo-client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../app/styles/Home.module.css';
import { CharactersResponse } from './interfaces';

const defaultEndPoint = process.env.DEFAULT_ENDPOINT;

export default async function Home() {
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            image
            status
            species
            location {
              id
              name
            }
            episode {
              id
              name
            }
          }
        }
      }
    `
  });

  const characters: CharactersResponse = data.characters;

  return (
    <div>
      <h1 className={styles.title}>Personajes de Rick y Morty</h1>
      <div className={styles.cardContainer}>
        {characters.results.map((character) => (
          <div key={character.id} className={styles.card}>
            <Image
              src={character.image}
              alt={character.name}
              width={200}
              height={200}
              className={styles.cardImage}
            />
            <h2 className={styles.cardTitle}>{character.name}</h2>
            <p>Especie: {character.species}</p>
            <p>Estado: {character.status}</p>

            {character.location ? (
              <p>
                Última ubicación: <Link href={`${defaultEndPoint}/location/${character.location.id}`}>{character.location.name}</Link>
              </p>
            ) : (
              <p>Última ubicación: Desconocida</p>
            )}
            <h3>Episodios:</h3>
            <ul>
              {character.episode.slice(0, 10).map((episode) => (
                <li key={episode.id}>
                  <Link href={`${defaultEndPoint}/episode/${episode.id}`}>
                    {episode.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}