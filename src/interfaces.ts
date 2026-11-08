export interface GameResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GameItem[];
}

export interface GameItem {
  id: number;
  slug: string;
  name: string;
  description_raw?: string;
  released?: string;
  background_image?: string;
  background_image_additional?: string;
  metacritic?: number;
  short_screenshots?: ShortScreenshots[];
  genres?: Genres[];
  tags?: Tag[];
  platforms?: PlatformItem[];
  developers?: Developer[];
  publishers?: Publisher[];
}

export interface Genres {
  id: number;
  name: string;
  slug: string;
}

export interface ShortScreenshots {
  id: number;
  image: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformItem {
  platform: Platform;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
}

export interface SortItem {
  name: string;
  sorting: 'name' | 'released' | 'added' | 'rating';
}
