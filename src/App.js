import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const id = Math.floor(Math.random() * 100000);
    const repository = {
      title: `Repo ${id}`,
      url: `https://github.com/fakerespository${id}`,
      techs: ["tech1", "tech2"],
    };
    const result = await api.post("/repositories", repository);
    setRepositories([...repositories, result.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((r) => r.id !== id));
  }

  useEffect(() => {
    api.get("/repositories").then((r) => {
      setRepositories(r.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((r) => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
