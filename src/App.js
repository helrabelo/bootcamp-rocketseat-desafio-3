import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    let repository = {
      title: `New title - ${Math.random() * 100}`,
      owner: 'Hel Rabelo',
      techs: [`Tech - ${Math.random() * 100}`],
    };
    api
      .post('/repositories', repository)
      .then(({ data }) => setRepositories([...repositories, data]));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  async function loadRepositories() {
    const { data } = await api.get('/repositories');
    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0
          ? repositories.map((repository) => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))
          : null}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
