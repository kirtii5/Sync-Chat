import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/clerk-react";

export default function UserSearchModal({ isOpen, onClose, addUserToChat }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await axios.get(
          "http://localhost:4000/api/users/allUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allUsers = res.data || [];

        const filtered = allUsers.filter((user) =>
          [user.username, user.email, user.name].some((field) =>
            field?.toLowerCase().includes(query.toLowerCase())
          )
        );

        setResults(filtered);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(debounce);
  }, [query, getToken]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[400px] max-h-[500px] overflow-y-auto shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-800 text-xl">
          ×
        </button>

        <h3 className="text-lg font-semibold mb-3">Search Users</h3>

        <Input
          placeholder="Search by name, email, or username"
          className="mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading ? (
          <p className="text-sm text-muted-foreground">Searching...</p>
        ) : results.length === 0 && query ? (
          <p className="text-sm text-muted-foreground">No users found.</p>
        ) : (
          results.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onSelect={() => {
                addUserToChat(user);
                onClose();
                setQuery("");
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
