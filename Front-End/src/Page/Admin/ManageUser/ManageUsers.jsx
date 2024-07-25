import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', { withCredentials: true });
        setUsers(res.data || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { withCredentials: true });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="manage-users">
      <h1>Manage Users</h1>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="user-card">
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
