export interface GameItem {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher?: string;
  developer?: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface GameDetail extends GameItem {
  description: string;
  status: string;
  screenshots?: ShortScreenshots[];
  minimum_system_requirements?: SystemRequirements;
}

export interface ShortScreenshots {
  id: number;
  image: string;
}

export interface SystemRequirements {
  os?: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  storage?: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface SortItem {
  name: string;
  sorting: 'alphabetical' | 'release-date' | 'popularity' | 'relevance';
}
