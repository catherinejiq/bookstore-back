import Link from "next/link";
import { useState } from "react";
import { useAuthorsContext } from "../context/AuthorsContext";
import AuthorCard from "../components/AuthorCard";
import styles from "../styles/Authors.module.css";

export default function AuthorsPage() {
  const { authors } = useAuthorsContext();
  const [query, setQuery] = useState("");

  const filtered = authors.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Autores</h1>
        <Link href="/crear" className={styles.createButton}>
          + Crear Autor
        </Link>
      </div>

      <input
        className={styles.searchInput}
        type="text"
        placeholder="🔍 Buscar autor por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className={styles.noResults}>No se encontraron coincidencias.</p>
      ) : (
        filtered.map((a) => <AuthorCard key={a.id} author={a} />)
      )}
    </div>
  );
}