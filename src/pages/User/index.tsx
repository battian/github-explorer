import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import InfoPanel from '../../components/Shimmer/InfoPanel';
import ListPanel from '../../components/Shimmer/ListPanel';

import { Header, UserInfo, Repos } from './styles';

interface UserParams {
  user: string;
}

interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  type: string;
}

interface Repos {
  id: number;
  name: string;
  html_url: string;
  description: string;
  full_name: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { params } = useRouteMatch<UserParams>();

  useEffect(() => {
    async function getUsers() {
      try {
        await api.get(`users/${params.user}`).then(response => {
          setUser(response.data)
        });

        await api.get(`users/${params.user}/repos`).then(response => {
          setRepos(response.data)
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, [params.user]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <GoChevronLeft size={16} />
          Back
        </Link>
      </Header>

      {loading
        ? <InfoPanel />
        : user && (
          <UserInfo>
            <header>
              <img
                src={user.avatar_url}
                alt={user.login}
              />
              <div>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </div>
            </header>

            <ul>
              <li>
                <strong>{user.public_repos}</strong>
                <span>Repositories</span>
              </li>

              {user.type === 'User' && (
                <>
                  <li>
                    <strong>{user.followers}</strong>
                    <span>Followers</span>
                  </li>
                  <li>
                    <strong>{user.following}</strong>
                    <span>Followers</span>
                  </li>
                </>
              )}
            </ul>
          </UserInfo>
        )}

      {loading
        ? <ListPanel />
        : <Repos>
          {repos.map(repository => (
            <Link
              key={repository.id}
              to={`/repositories/${repository.full_name}`}
            >
              <div>
                <strong>{repository.name}</strong>
                <p>{repository.description}</p>
              </div>

              <GoChevronRight size={20} />
            </Link>
          ))}
        </Repos>
      }
    </>
  );
};

export default User;
