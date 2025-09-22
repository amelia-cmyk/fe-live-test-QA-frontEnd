// Candidate: Write your Cypress E2E test for login here.

/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows error when fields are empty", () => {
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("alert").should("have.text", "Username and password are required");
  });

  it("shows error with wrong credentials", () => {
    cy.findByLabelText(/username/i).type("wrong");
    cy.findByLabelText(/password/i).type("wrong");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("alert").should("have.text", "Invalid credentials");
  });

  it("logs in with correct credentials", () => {
    cy.findByLabelText(/username/i).type("admin");
    cy.findByLabelText(/password/i).type("secret");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("alert").should("have.text", "Welcome, admin!");
  });
});
