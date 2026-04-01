const BASE_URL = "https://dragonball-api.com/api";

// COMMON TYPES

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: Meta;
  links: Links;
}

//   CHARACTER TYPES

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: string | null;
}

export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
}

export interface CharacterDetails extends Character {
  originPlanet: Planet;
  transformations: Transformation[];
}


//  PLANET TYPES
export interface PlanetDetails extends Planet {
  characters: Character[];
}

// FETCH HELPER

async function fetchAPI<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

//  CHARACTER APIs

// Get all characters (paginated)
export const getCharacters = (page = 1, limit = 10) => {
  return fetchAPI<PaginatedResponse<Character>>(
    `${BASE_URL}/characters?page=${page}&limit=${limit}`
  );
};

// Get single character
export const getCharacterById = (id: number) => {
  return fetchAPI<CharacterDetails>(`${BASE_URL}/characters/${id}`);
};

// Filter characters (NO pagination)
export interface CharacterFilters {
  name?: string;
  gender?: string;
  race?: string;
  affiliation?: string;
}

export const filterCharacters = (filters: CharacterFilters) => {
  const query = new URLSearchParams(filters as Record<string, string>).toString();

  return fetchAPI<Character[]>(`${BASE_URL}/characters?${query}`);
};

//  PLANET APIs

// Get all planets (paginated)
export const getPlanets = (page = 1, limit = 10) => {
  return fetchAPI<PaginatedResponse<Planet>>(
    `${BASE_URL}/planets?page=${page}&limit=${limit}`
  );
};

// Get single planet
export const getPlanetById = (id: number) => {
  return fetchAPI<PlanetDetails>(`${BASE_URL}/planets/${id}`);
};

// Filter planets (NO pagination)
export interface PlanetFilters {
  name?: string;
  isDestroyed?: boolean;
}

export const filterPlanets = (filters: PlanetFilters) => {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, String(v)])
    )
  ).toString();

  return fetchAPI<Planet[]>(`${BASE_URL}/planets?${query}`);
};