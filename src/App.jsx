import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);
    // new fetch method start
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log('inside post response', data);
        const newUsers = [...users, data]
        setUsers(newUsers);
        form.reset();
      })
  }
  // new fetch method end


  return (
    <>
      <h1>User Management System</h1>
      <h3>Numbers of Users: {users.length}</h3>
      {/* form start */}
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {/* form end */}
      <div>
        {
          users.map(user =>
            <p key={user.id}>
              {
                user.id
              }
              :
              {
                user.name
              }
              :
              {
                user.email
              }
            </p>)
        }
      </div>
    </>
  )
}

export default App
