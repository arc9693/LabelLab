/* globals context cy */
/// <reference types="Cypress" />
context('Mainpage', () => {

	it('Renders all images', () => {
		cy.server()
		cy.route('GET', 'http://localhost:5000').as('apiRequest')
		cy.visit('/')
		cy.wait('@apiRequest').then((xhr)=>{
			var CurrTotalImages=xhr.responseBody.length;
			cy.contains('YOUR IMAGES').should('exist');
			cy.get('img')
				.should(($img) => {
					expect($img).to.have.length(CurrTotalImages)
				})
		})
	});

	it('Contains the dropzone/filepicker',()=>{
		cy.visit('/');
		cy.get('.dropzone').should('exist');
		cy.get('.filepicker').should('exist');
	})

});

describe('Drag and Drop', function() {

	it('Uploads an image', function(){const dropEvent = {
		dataTransfer: {
			files: [
			],
		},
	};
	cy.server()
	cy.route('GET', 'http://localhost:5000').as('apiRequest')
	cy.fixture('test.jpeg').then((picture) => {
		return Cypress.Blob.base64StringToBlob(picture, 'image/jpeg').then((blob) => {
			dropEvent.dataTransfer.files.push(blob);
		});
	});
	cy.visit('/');
	cy.wait('@apiRequest').then((xhr)=>{
		var CurrTotalImages=xhr.responseBody.length;
		cy.get('.dropzone').trigger('drop', dropEvent);
		cy.get('.dz-success').should('exist');
		cy.reload();
		cy.wait('@apiRequest').then((xhr)=>{
			expect(xhr.responseBody.length).to.eq(CurrTotalImages+1);
		})
	})
	})

})

describe('Display and Label image', function() {

	var id;

	it('Opens an image and Edits the label', function(){
		cy.server()
		cy.route('GET', 'http://localhost:5000').as('HomePageApi')
		cy.visit('/')
		cy.wait('@HomePageApi').then((xhr)=>{
			expect(xhr.status).to.eq(200)
			var res=xhr.responseBody;
			id=xhr.responseBody[res.length-1].id
			cy.route('GET', 'http://localhost:5000/'+id).as('ImageDisplayApi')
			cy.route('PUT', 'http://localhost:5000/'+id).as('ImageUpdateApi')
			cy.get(':nth-child(1) > :nth-child(1) > .hovereffect > .img-responsive').click()
			cy.wait('@ImageDisplayApi').its('status').should('be', 200)
			cy.get('.btn').click()
			cy.wait('@ImageDisplayApi').its('status').should('be', 200)
			cy.get('input').clear().type('TEST LABEL')
			cy.get('[title="Done"]').click()
			cy.wait('@ImageUpdateApi').its('status').should('be', 200)
			cy.wait('@ImageDisplayApi').then((xhr)=>{
				expect(xhr.response.body[0].label).to.equal(' TEST LABEL');
			})
		})
	})

})
