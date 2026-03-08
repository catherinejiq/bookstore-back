import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function AuthorForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(
    initialData || { name: "", description: "", birthDate: "", image: "" }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.birthDate || !form.description) return;
    onSubmit(form);
  };

  const isDisabled = !form.name || !form.birthDate || !form.description;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} htmlFor="name">Nombre:</label>
        <input
          id="name"
          name="name"
          className={styles.input}
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="birthDate">Fecha de nacimiento:</label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          className={styles.input}
          value={form.birthDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="image">Imagen:</label>
        <input
          id="image"
          name="image"
          className={styles.input}
          placeholder="URL Imagen"
          value={form.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className={styles.button} disabled={isDisabled}>
        Guardar
      </button>
    </form>
  );
}

