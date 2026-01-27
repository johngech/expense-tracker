import { CanceledError, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { userService, type User } from "./services/user-service";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const { request, cancel } = userService.getAll();

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await request;
        setUsers(res.data);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
    return () => cancel();
  }, []);

  // Professional Tip: Optimistic UI Updates
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    // Here you would call userService.delete(user.id)
    // .catch(() => { setError("Delete failed"); setUsers(originalUsers); })
  };

  return (
    <div className="container">
      {/* 1. Error Message Display */}
      {error && <p className="text-danger">{error}</p>}

      {/* 2. Loading Spinner */}
      {isLoading && <div className="spinner">Loading users...</div>}

      <h1>User Management</h1>

      <div className="card">
        <button
          onClick={() => {
            /* Logic to add user */
          }}
          className="btn-primary"
        >
          Add User
        </button>

        {/* 3. Data Rendering with professional checks */}
        <ul className="list-group">
          {users.map((user: User) => (
            <li key={user.id} className="list-item">
              <span>{user.name}</span>
              <button
                onClick={() => deleteUser(user)}
                className="btn-outline-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {users.length === 0 && !isLoading && !error && (
          <p>No users found in the database.</p>
        )}
      </div>
    </div>
  );
}

export default App;
