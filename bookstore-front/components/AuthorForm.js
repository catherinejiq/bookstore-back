import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function AuthorForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(
    initialData || { name: "", description: "", birthDate: "", image: "" }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  
    const newErrors = { ...errors };
    if (name === "name") {
      if (!value || value.trim().length < 3)
        newErrors.name = "El nombre debe tener al menos 3 caracteres.";
      else delete newErrors.name;
    }
    if (name === "description") {
      if (!value || value.trim().length < 10)
        newErrors.description = "La descripción debe tener al menos 10 caracteres.";
      else delete newErrors.description;
    }
    if (name === "birthDate") {
      if (!value)
        newErrors.birthDate = "La fecha de nacimiento es requerida.";
      else delete newErrors.birthDate;
    }
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name || form.name.trim().length < 3)
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    if (!form.birthDate)
      newErrors.birthDate = "La fecha de nacimiento es requerida.";
    if (!form.description || form.description.trim().length < 10)
      newErrors.description = "La descripción debe tener al menos 10 caracteres.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSubmit(form);
  };


  const isDisabled =
    !form.name        || form.name.trim().length < 3 ||
    !form.birthDate   ||
    !form.description || form.description.trim().length < 10;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} htmlFor="name">Nombre:</label>
        <input
          id="name" name="name" className={styles.input}
          placeholder="Nombre" value={form.name}
          onChange={handleChange} />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="birthDate">Fecha de nacimiento:</label>
        <input
          id="birthDate" name="birthDate" type="date" className={styles.input}
          value={form.birthDate} onChange={handleChange} />
        {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="image">Imagen:</label>
        <input
          id="image" name="image" className={styles.input}
          placeholder="URL Imagen" value={form.image}
          onChange={handleChange} />
      </div>

      <div>
        <label className={styles.label} htmlFor="description">Descripción:</label>
        <textarea
          id="description" name="description" className={styles.textarea}
          placeholder="Descripción" value={form.description}
          onChange={handleChange} />
        {errors.description && <p className={styles.error}>{errors.description}</p>}
      </div>

      <button type="submit" className={styles.button} disabled={isDisabled}>
        Guardar
      </button>
    </form>
  );
}