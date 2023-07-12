describe('Suita teste saucedemo.com', ()=>{

    // Test cu user si parola gresita
    it('Test 1', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('test');
        cy.get('[data-test="password"]').type('test');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('be.visible');
    })

    // Test cu user corect si parola gresita
    it('Test 2', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('test');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('[data-test="error"]').should('be.visible');
    })

    // Test cu user gresit si parola corecta
    it('Test 3', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('test');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('[data-test="error"]').should('be.visible');
    })

    // Test de logare cu user/parola corecte si verificare daca sunt logat
    it('Test 4', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('#react-burger-menu-btn').should('be.visible').click().wait(1000);
        cy.get('#logout_sidebar_link').should('be.visible');
    })

    // Test de logout
    it('Test 5', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('#react-burger-menu-btn').click().wait(1000);
        cy.get('#logout_sidebar_link').should('be.visible').click();
        cy.get('[data-test="username"]').should('be.visible');
        cy.get('[data-test="password"]').should('be.visible');
        cy.get('[data-test="login-button"]').should('be.visible');
    })

    // Test prin care verific daca se deschide/inchide meniul lateral
    it('Test 6', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('#react-burger-menu-btn').click().wait(1000);
        cy.get('#react-burger-cross-btn').should('be.visible').click().wait(1000);
        cy.get('#react-burger-menu-btn').should('be.visible');
    })

    // Test de verificare daca se adauga un item in cart.
    it('Test 7', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click().should('not.exist');
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        cy.get('.shopping_cart_badge').should('be.visible');
        cy.get('.shopping_cart_link').click().wait(1000);
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        cy.get('#item_4_title_link > .inventory_item_name').should('be.visible');
    })

    // Test de verificare daca se sterge un item din cart.
    it('Test 8', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click().wait(1000);
        cy.get('.shopping_cart_badge').should('be.visible');
        cy.get('.shopping_cart_link').click().wait(1000);
        cy.get('[data-test="remove-sauce-labs-backpack"]').click().wait(1000);
        cy.get('.shopping_cart_badge').should('not.exist');
        cy.get('[data-test="continue-shopping"]').click().wait(1000);
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible');
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('not.exist');
    })

    // Test prin care verific daca pot sa fac checkout unui produs
    it('Test 9', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click().wait(1000);
        cy.get('.shopping_cart_link').click().wait(1000);
        cy.get('[data-test="checkout"]').should('be.visible').click().wait(1000);
        cy.get('[data-test="firstName"]').type('testFirstname');
        cy.get('[data-test="lastName"]').type('testLastname');
        cy.get('[data-test="postalCode"]').type('123456');
        cy.get('[data-test="continue"]').should('be.visible').click().wait(1000);
        cy.get('[data-test="finish"]').should('be.visible').click().wait(1000);
        cy.get('.complete-header').should('be.visible');
        cy.get('.complete-text').should('be.visible');
        cy.get('[data-test="back-to-products"]').should('be.visible');
    })

    // Test prin care verific daca pot accesa pagina unui produs
    it('Test 10', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('#item_4_title_link > .inventory_item_name').click().wait(1000);
        cy.get('[data-test="back-to-products"]').should('be.visible');
        cy.get('.inventory_details_name').should('be.visible');
        cy.get('.inventory_details_desc').should('be.visible');
    })

    /* Test prin care verific daca butonul "Back to products" de pe pagina cu detaliile 
    unui produs ma duce pe pagina principala*/
    it('Test 11', ()=>{
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click().wait(1000);
        cy.get('#item_4_title_link > .inventory_item_name').click().wait(1000);
        cy.get('[data-test="back-to-products"]').click().wait(1000);
        cy.get('.title').should('be.visible');
        cy.get('[data-test="product_sort_container"]').should('be.visible');
    })
})