import { createContext, useState } from "react";
export const UserContext = createContext(null);
export function UserProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  return <UserContext.Provider value={{ accounts, setAccounts, selectedAccount, setSelectedAccount }}>{children}</UserContext.Provider>;
}
