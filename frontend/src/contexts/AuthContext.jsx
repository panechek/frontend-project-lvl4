import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  useEffect(() => {
    const takeAuth = () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId && userId.token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    return () => takeAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={useMemo(() => ({
        loggedIn,
        logIn,
        logOut,
      }), [loggedIn])}
    >
      {children}
    </AuthContext.Provider>
  );
};
