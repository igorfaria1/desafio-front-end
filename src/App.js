import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": `Repositório ${Date.now()}`,
      "url": "http://www.repository.com",
      "techs": [
        "Nodejs",
        "React"
      ]
    });

    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newList = repositories.filter(repo => repo.id !== id);

    setRepositories([...newList]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
