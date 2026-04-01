export interface Character {
  id: number;
  name: string;
  image: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  planet?: {
    name: string;
  };
}