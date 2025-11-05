import { use, useState } from "react";
import type { client } from "../types/types";
import { useClients } from "../context/ClientsContext";

const ClientForm = () => {
  const { isLoading, error, saveClient } = useClients();
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [feError, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    const clientItem: client = {
      name: name,
    }

    const { success, error: saveError } = await saveClient(clientItem);

    if(!success) {
      setError(saveError ?? 'unknown error');
      return;
    }
  };

  return (
    <>
      <div>Add a client</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Create Client
        </button>
      </form>
    </>
  )
}

export default ClientForm;