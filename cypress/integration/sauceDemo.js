/// <reference types="cypress" />

describe('Navigation to Sauce Demo', () => {

    before( () => {
        cy.visit('https://www.saucedemo.com/')
        cy.wait(1000)

    })


    // Testcase 1 and 2
    it('Test the Cart is empty', () => {

        cy.get("#login_credentials").then(($userName) => {
            var name = $userName.text()
            name = name.trim().slice(40, 53)
            console.log(name)
            cy.get("#user-name").clear().type(name)
          })

          cy.get(".login_password").then(($password) => {
            var psw = $password.text()
            psw = psw.trim().slice(24, ).trim()
            console.log(psw)
            cy.get("#password").clear().type(psw)
          })
          
          cy.get("#login-button").click()
          //cy.wait(1000)

          var status = cy.get(".shopping_cart_badge").should("not.be.visible")
          if(status=== true){
              console.log("Shopping cart is empty")
          }else {
            console.log("Shopping cart is not empty")
          }

    })

    
    // Test Case 3
    it('From the product listing add at least all products with the word ‘Shirt’ by browsing into the product page and doing ‘add to cart’', () => {
      let count = 0
    cy.get(".inventory_item_name").each(($ele, index, $list1) => {     
      const itemName = $ele.text()
      if(itemName.toLocaleLowerCase().includes("shirt")){

        cy.get("div.pricebar > button").eq(index).click() 
        count = count++ 
      }  

    })

      cy.get(".shopping_cart_badge").click()

      let count2 = 0
      cy.get(".cart_item > div.cart_item_label > a > div").each(($ele) => {

        const cartItemName = $ele.text()
       if(cartItemName.toLocaleLowerCase().includes("shirt")){
        count2 = count2++
       }
       })
       expect(count).to.eq(count2)
       if(count=== count2){
          console.log("Added product in Cart is correct")
        }else {
          console.log("Added product in Cart is correct")
        }

        console.log("Count value is "+ count, count2)
    
      })

      it('Test the contents of the Cart as having only the requisite items and correct quantity', () => {
        let count = 0, quantity =0, quantity2 = 0

        // click on check out button
        cy.get(".checkout_button").click()
        cy.get("#first-name").type("abc")
        cy.get("#last-name").type("xyz")
        cy.get("#postal-code").type("123456")
        cy.get(".cart_button[value=CONTINUE]").click()

      cy.get(".cart_item > div.summary_quantity").each(($ele, index) => {
        count = count + 1
        quantity  = parseInt($ele.text())
        quantity2 = quantity2 + quantity
        console.log(quantity2)
      })

      // Verify expected quantity
      expect(quantity2).to.eq(count)
  
        cy.get(".cart_item > div.cart_item_label > a > div").each(($ele, index, $lis) => {
                    
         })

         // Verify cart items on checkout page 
         .then(($lis) => {
          expect($lis).to.itself // true
         })
  
        })
      

})