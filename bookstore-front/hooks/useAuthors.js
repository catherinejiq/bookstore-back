import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/authors";

export default function useAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.error("Error al obtener autores:", err));
  }, []);

  const addAuthor = async (author) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author),
    });
    const newAuthor = await res.json();
    setAuthors([...authors, newAuthor]);
  };

  const updateAuthor = async (id, author) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author),
    });
    const updated = await res.json();
    setAuthors(authors.map((a) => (a.id === id ? updated : a)));
  };

  const deleteAuthor = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setAuthors(authors.filter((a) => a.id !== id));
  };

  return { authors, addAuthor, updateAuthor, deleteAuthor };
}
