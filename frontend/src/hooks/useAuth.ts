import { useContext } from 'react';
import { AuthContext } from '../auth/authContex';

export function useAuth() {
  return useContext(AuthContext);
}
