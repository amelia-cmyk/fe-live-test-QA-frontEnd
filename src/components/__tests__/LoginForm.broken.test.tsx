import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

test("BROKEN FIXED: shows welcome on successful login", async () => {
  render(<LoginForm />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/username/i), "admin");
  await user.type(screen.getByLabelText(/password/i), "secret");
  await user.click(screen.getByRole("button", { name: /log in/i }));

  const expected = /welcome, admin/i;
  const roleEl = screen.queryByRole("alert");
  if (roleEl) {
    expect(roleEl).toHaveTextContent(expected);
  } else {
    expect(await screen.findByText(expected)).toBeInTheDocument();
  }
});
