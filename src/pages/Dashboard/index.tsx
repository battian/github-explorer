import React, { useState, useEffect, FormEvent } from 'react';
import { GoX } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Users, Error } from './styles';

interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>(() => {
    const storageUsers = localStorage.getItem(
      '@GithubExplorer:users',
    );

    if (storageUsers) {
      return JSON.parse(storageUsers);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:users',
      JSON.stringify(users),
    );
  }, [users]);

  async function handleAddUser(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Please enter a user.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.get<User>(`users/${newRepo}`);

      const user = response.data;

      setUsers([...users, user]);
      setNewRepo('');
      setInputError('');
      setLoading(false);
    } catch {
      setLoading(false);
      setInputError('An error occurred while searching. Please try again.');
    }
  }

  function handleRemoveUser(id: string) {
    try {
      const filteredUsers = users.filter(user => user.id !== id);

      setUsers(filteredUsers);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddUser}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Enter a username" />
        <button type="submit">
          {loading
            ? <Loader type="Oval" color="#f0f0f5" height={24} width={24} />
            : 'Save'}
        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Users>
        {users.map(user => (
          <section key={user.id}>
            <Link to={`/users/${user.login}`}>
              <img
                src={user.avatar_url}
                alt={user.login}
              />
              <div>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </div>
            </Link>

            <button
              type="submit"
              onClick={() => handleRemoveUser(user.id)}
            >
              <GoX size={24} />
            </button>
          </section>
        ))}
      </Users>
    </>
  )
};

export default Dashboard;
