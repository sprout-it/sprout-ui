describe('capture', () => {
    it('capture index', () => {
        cy.visit('http://localhost:3000')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/')
        })
        cy.wait(2000)
        cy.get('#id-515 > :nth-child(1) > g > path').should('exist')
        cy.screenshot()
    })

    it('capture /order/view/', () => {
        cy.visit('http://localhost:3000/order/view/')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/order/view')
        })
        cy.screenshot()
    })

    it('capture /order/view/', () => {
        cy.visit('http://localhost:3000/order/purchase')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/order/purchase')
        })
        cy.screenshot()
    })

    it('capture /report/order/problam', () => {
        cy.visit('http://localhost:3000/report/order/problam')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/report/order/problam')
        })
        cy.screenshot()
    })

    it('capture /report', () => {
        cy.visit('http://localhost:3000/report')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/report')
        })
        cy.screenshot()
    })


    it('capture /report/invoice', () => {
        cy.visit('http://localhost:3000/report/invoice')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/report/invoice')
        })
        cy.screenshot()
    })

    it('capture /report/receipt', () => {
        cy.visit('http://localhost:3000/report/receipt')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/report/receipt')
        })
        cy.screenshot()
    })

    it('capture /address/origin', () => {
        cy.visit('http://localhost:3000/address/origin')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/address/origin')
        })
        cy.screenshot()
    })

    it('capture /address/origin/create', () => {
        cy.visit('http://localhost:3000/address/origin/create')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/address/origin/create')
        })
        cy.screenshot()
    })

    it('capture /reset_password', () => {
        cy.visit('http://localhost:3000/reset_password')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/reset_password')
        })
        cy.screenshot()
    })

    it('capture /profile', () => {
        cy.visit('http://localhost:3000/profile')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/profile')
        })
        cy.screenshot()
    })
})