
export interface Episode {
    id: string;
    name: string;
  }
  
  export interface Location {
    id: string;
    name: string;
  }
  
  export interface Character {
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
    location: Location | null;
    episode: Episode[];
  }
  
  export interface CharactersResponse {
    results: Character[];
  }