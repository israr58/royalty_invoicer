/// <reference types="cypress" />

// Simple E2E with network stubbing

describe("Royalty Invoicer", () => {
  it("lists songs and issues an invoice (stubbed)", () => {
    // Stub songs API
    cy.intercept("GET", "**/api/songs", {
      statusCode: 200,
      body: [{ id: 1, name: "Flowers", author: "Miley Cyrus", progress: 0.15 }],
    }).as("songs");

    // Stub invoices API (initial load = empty list)
    cy.intercept("GET", "**/api/invoices", {
      statusCode: 200,
      body: [],
    }).as("invoices");

    // Stub invoice creation
    cy.intercept("POST", "**/api/invoices", (req) => {
      const { songId, progress } = req.body;
      req.reply({
        statusCode: 201,
        body: {
          id: "inv-1",
          songId,
          songName: "Flowers",
          author: "Miley Cyrus",
          progress,
          timestamp: new Date().toISOString(),
        },
      });
    }).as("createInvoice");

    // Visit client app
    cy.visit("/");

    // Check table loaded
    cy.contains("Songs").should("be.visible");
    cy.contains("Flowers").should("be.visible");

    // Click "Issue Invoice"
    cy.contains("button", /issue invoice/i).click();

    // Ensure POST request was made and intercepted
    cy.wait("@createInvoice");

    // Check history updated
    cy.contains("Invoice History").should("be.visible");
    cy.contains("Flowers").should("be.visible");
  });
});
