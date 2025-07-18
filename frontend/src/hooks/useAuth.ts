import { useContext } from 'react';
import { AuthContext } from '../auth/authContext';

export function useAuth() {
  return useContext(AuthContext);
}
