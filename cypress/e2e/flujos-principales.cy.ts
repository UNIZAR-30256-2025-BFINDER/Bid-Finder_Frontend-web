describe('BidFinder - Flujos Principales E2E', () => {
    const TEST_USER = {
      email: 'inversor@prueba.com', 
      password: 'password123'      
    };
  
    beforeEach(() => {
      cy.clearLocalStorage();
    });
  
    it('Flujo 1: Autenticación exitosa y acceso al Dashboard', () => {
      cy.visit('/login');
  
      cy.contains('Login to your Account').should('be.visible');
      
      cy.get('input[placeholder="mail@bif.com"]').type(TEST_USER.email);
      cy.get('input[placeholder="••••••••"]').type(TEST_USER.password);
  
      cy.get('button[type="submit"]').contains('Login').click();
  
      cy.url().should('include', '/dashboard');
      
      cy.contains('button', 'Explorar').should('be.visible');
    });
  
    it('Flujo 2: Exploración de Subastas y guardado en Favoritos', () => {
      cy.visit('/login');
      cy.get('input[placeholder="mail@bif.com"]').type(TEST_USER.email);
      cy.get('input[placeholder="••••••••"]').type(TEST_USER.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
  
      cy.contains('€', { timeout: 10000 }).should('be.visible');
  
      cy.get('.group.min-w-0').first().click();
  
      cy.url().should('include', '/subastas/BOE');
  
      cy.get('button[title*="favoritos"]').should('be.visible');
      
      cy.get('button[title*="favoritos"]').click();
  
      cy.wait(1000);
  
      cy.contains('button', 'Favoritos').click();
  
      cy.url().should('include', '/favorites');
      cy.contains('Mis Favoritos').should('be.visible');
    });
  });