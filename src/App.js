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
    api.delete(`/repositories/${id}`).then(({ data }) => setRepositories(data));
  }

  useEffect(() => {
    const { data } = api.get('/repositories');
    setRepositories(data);
  });

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
