import { createContext, useContext, useState } from "react";
import type { client } from "../types/types";

interface ClientContextType {
  clients: client[],
  isLoading: boolean,
  error: string,
  getClients: () => Promise<void>,
  saveClient: (client: client | Partial<client>) => Promise<{success: boolean, error?: string}>,
  // deleteClient: (id: number) => Promise<{success: boolean, error?: string}>;
}

const ClientsContext = createContext<ClientContextType | null>(null);

export const ClientProvider = ({children}: {children: React.ReactNode}) => {
  const [clients, setClients] = useState<client[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getClients = async () => {
    setLoading(true);
    setError('');
    try {
      const url = new URL (`${import.meta.env.VITE_API_URL}/api/clients`);
      console.log('URL', url)
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });
      console.log('RES get', res)
      if(!res.ok) throw new Error('Failed to get your clients');
      const data: client[] = await res.json();
      setClients(data);
    }
    catch (err: any) {
      setError(err instanceof Error ? err.message : String(err) )
    }
    finally {
      setLoading(false);
    }
  }

  // const deleteMovie = async (id: number): Promise<{ success: boolean; error?: string }> => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const url = new URL(`${import.meta.env.VITE_API_URL}/api/movies/${id}`);
  //     const res = await fetch(url, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Prefer': 'return=representation'
  //       },
  //     })

  //     const data = await res.json().catch(() => ({}));
  //     if(!res.ok) {
  //       const backendError = data?.error || res.statusText || 'Unknown error';
  //       const backendCode = data?.code;

  //       if (backendCode === 'INTERNAL_ERROR') {
  //         throw new Error('That movie is already in your list.');
  //       } else if (backendCode === 'MISSING_ID') {
  //         throw new Error('Movie is missing ID');
  //       } else {
  //         throw new Error(backendError);
  //       }
  //     };
  //     return {success: true}
  //   } catch (err: any) {
  //     const message = err instanceof Error ? err.message : String(err);
  //     setError(message);
  //     return {success: false, error: message}
  //   } finally {
  //       setLoading(false);
  //   }
  // }

  const saveClient = async(client: client | Partial<client>): Promise<{ success: boolean; error?:string}> => {
    setLoading(true);
    setError('');
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}/api/clients`);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(client)
      });

      const data = await res.json().catch(() => ({}));

      if(!res.ok) {
        const backendError = data?.error || res.statusText || 'Unknown error';
        const backendCode = data?.code;

        if (backendCode === 'DUPLICATE_CLIENT') {
          throw new Error('That client is already in your list.');
        } else if (backendCode === 'MISSING_NAME') {
          throw new Error('A name is required before saving.');
        } else if (backendCode === 'MISSING_ID') {
          throw new Error('Client is missing ID');
        } else if (backendCode === 'NOT FOUND') {
          throw new Error('Client not found.');
        }
        else {
          throw new Error(backendError);
        }
      };
      return {success: true}
    }
    catch (err: any) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      return {success: false, error: message}
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <ClientsContext.Provider value={{clients, isLoading, error, getClients, saveClient}}>
      {children}
    </ClientsContext.Provider>
  )
}

export const useClients = () => {
  const ctx = useContext(ClientsContext);
  if (!ctx) throw new Error("Client provider error");
  return ctx;
}