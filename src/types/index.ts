export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  year: number;
  genre: string;
  imageUrl: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface MusicLibraryProps {
  user: User | null;
  onSongAdd?: (song: Omit<Song, 'id'>) => void;
  onSongDelete?: (songId: string) => void;
}

export type FilterType = 'all' | 'title' | 'artist' | 'album';
export type SortType = 'title' | 'artist' | 'album' | 'year';
export type GroupType = 'none' | 'artist' | 'album' | 'genre';