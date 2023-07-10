import { createContext, useState } from "react";

const UserContext = createContext();

export default UserContext

export function UserController({ children }) {
  const [themeName, setThemeName] = useState('dark-mode');
  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={{ themeName, setThemeName, user, setUser }}>
      {/* everything inside of this provider is a child of ThemeContext */}
      {children}
    </UserContext.Provider>
  )
}
