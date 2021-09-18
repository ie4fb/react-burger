/// <reference types="cypress" />

describe("Ingredients test", function () {
    before(() => {
      cy.visit("http://localhost:3000");
    });
  
    it("should drag and drop ingredient", () => {
      cy.get('[cypress-id="ingredient"]').first().trigger("dragstart");
      cy.get('[cypress-id="constructor"]').trigger("drop");
    });
  });
  