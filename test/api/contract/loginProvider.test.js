const { spec, request } = require('pactum')
const { reporter, flow } = require('pactum');
const pf = require('pactum-flow-plugin');
const { incrementVersion } = require('../../../function/version.js');



function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'lojaEbacApi';
  pf.config.projectName = 'Ebac Api';
  pf.config.version = incrementVersion();
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

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