const { reporter, flow, request } = require('pactum');
const { addFlowReporter } = require('../../../config/config.js');

// global before
before(async () => {
  addFlowReporter();
});

// global after
after(async () => {
  await reporter.end();
});

request.setBaseUrl('http://lojaebac.ebaconline.art.br');
it('Api - Deve autenticar usuário corretamente', async () => {
  await flow('Login')
    .post('/public/authUser')
    .withJson({
      "email": "admin@admin.com",
      "password": "admin123"
    })
    .expectStatus(200)
    .expectJson('success', true)
})