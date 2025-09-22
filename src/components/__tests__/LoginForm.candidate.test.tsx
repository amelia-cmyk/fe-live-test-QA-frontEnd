import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm';
import React from 'react';

describe("LoginForm", () => {
  it("shows error when fields are empty", async () => {
    render(<LoginForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /log in/i }));

    const expected = "Username and password are required";

    const roleEl = screen.queryByRole("alert");
    if (roleEl) {
      expect(roleEl).toHaveTextContent(expected);
    } else {
      expect(await screen.findByText(expected)).toBeInTheDocument();
    }
  });

  it("shows error for invalid credentials", async () => {
    render(<LoginForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "wrong");
    await user.type(screen.getByLabelText(/password/i), "wrong");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    const expected = "Invalid credentials";

    const roleEl = screen.queryByRole("alert");
    if (roleEl) {
      expect(roleEl).toHaveTextContent(expected);
    } else {
      expect(await screen.findByText(expected)).toBeInTheDocument();
    }
  });

  it("shows success message for correct credentials", async () => {
    render(<LoginForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "admin");
    await user.type(screen.getByLabelText(/password/i), "secret");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    const expected = "Welcome, admin!";

    const roleEl = screen.queryByRole("alert");
    if (roleEl) {
      expect(roleEl).toHaveTextContent(expected);
    } else {
      expect(await screen.findByText(expected)).toBeInTheDocument();
    }
  });
});



  // Example hints they might delete/replace:
  // const user = userEvent.setup()
  // await user.click(screen.getByRole('button', { name: /log in/i }))
  // expect(await screen.findByRole('alert')).toHaveTextContent(/required/i)

