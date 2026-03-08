import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthorForm from "../components/AuthorForm";

describe("AuthorForm Component", () => {
  test("Render del formulario con los campos requeridos", () => {
    render(<AuthorForm onSubmit={() => {}} />);

    const nameInput = screen.getByLabelText(/Nombre/i);
    const birthDateInput = screen.getByLabelText(/Fecha de nacimiento/i);
    const imageInput = screen.getByLabelText(/Imagen/i);
    const descriptionInput = screen.getByLabelText(/Descripción/i);

    expect(nameInput).toBeInTheDocument();
    expect(birthDateInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  test("No permitir enviar formulario con campos vacíos", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<AuthorForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByRole("button", { name: /Guardar/i });

    await user.click(submitButton);

    expect(mockSubmit).not.toHaveBeenCalled();

    expect(submitButton).toBeDisabled();
  });
});

