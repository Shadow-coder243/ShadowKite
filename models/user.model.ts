export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}
