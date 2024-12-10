import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllUsers");
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateEmail = async (userId, newEmail) => {
    try {
      const response = await axios.put("http://localhost:5000/updateEmail", {
        currentEmail: userId,
        newEmail: newEmail,
      });
      alert("Email updated successfully");
      window.location.reload();
    } catch (err) {
      alert("Error updating email");
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      const response = await axios.delete("http://localhost:5000/deleteUser", {
        data: { email },
      });
      alert("User deleted successfully");
      window.location.reload();
    } catch (err) {
      alert("Error deleting user");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">All Registered Users</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                    const newEmail = prompt("Enter new email:", user.email);
                    if (newEmail) handleUpdateEmail(user.email, newEmail);
                  }}
                >
                  Update Email
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDeleteUser(user.email)}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
