import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const STORAGE_KEY = "usuario";

const getInitialUser = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    if (parsed?.nombre && parsed?.apellido) return parsed;
  } catch {
    return null;
  }
  return null;
};

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(getInitialUser);

  const login = (nombre, apellido) => {
    const nuevoUsuario = { nombre, apellido };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoUsuario));
    setUsuario(nuevoUsuario);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUsuario(null);
  };

  const value = { usuario, login, logout };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de <UserProvider>");
  }
  return context;
}
