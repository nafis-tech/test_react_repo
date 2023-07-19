import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup, Accordion, Card } from 'react-bootstrap';
import './App.css';
import  {AiFillStar}  from "react-icons/ai";

interface User {
  id: number;
  login: string;
}

interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  description: string;

}



const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchValue}&per_page=5`);
      setUsers(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(`https://api.github.com/users/${user.login}/repos`);
      setRepositories(response.data);

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="container">
      <h1>Get Your Repositories in Github</h1>
      <Form>
        <Form.Group controlId="formSearch" className='search'>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </Form>

      <hr />
      <br></br>

      <h2>Search Results </h2>

      <Accordion flush>
        {users.map((user) => (
          <Accordion.Item eventKey={user.id.toString()} className='acordion'>
            <Accordion.Header
              key={user.id}
              onClick={() => handleUserClick(user)}
            >{user.login}</Accordion.Header>

            {repositories.map((repo) => (

              <Accordion.Body key={repo.id} className='acordion-body'>
                <div className='div-parent'>
                  <div className='div-child'>
                    <div >Repository : {repo.name}</div>
                    <br />
                    <div>Description : {repo.description}</div>
                  </div>
                  <div className='div-child2'>
                  
                    {repo.stargazers_count}
                    <AiFillStar style={{fontSize:'1.5rem'}}/>
                  </div>
                </div>
              </Accordion.Body>

            ))}

          </Accordion.Item>
        ))}
      </Accordion>

    </div>
  );
};

export default App;
