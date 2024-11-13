const { spec, request } = require('pactum')
const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');
const { like } = require('pactum-matchers');
const { incrementVersion } = require('../../../function/version.js');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'lojaEbacFront';
  pf.config.projectName = 'Ebac front';
  pf.config.version = incrementVersion();
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
  await mock.start(4000);
});

// global after
after(async () => {
  await mock.stop()
  await reporter.end();
});

//handler
handler.addInteractionHandler('Login response', () => {
  return {
    'provider': 'lojaEbacApi',
    'flow': 'Login',
    'request': {
      'method': 'POST',
      'path': '/public/authUser',
      'body': {
        "email": "admin@admin.com",
        "password": "admin123"
      }
    },
    'response': {
      'status': 200,
      'body': {
        "success": true,
        "message": "login successfully",
        "data": {
          "_id": "6717128dba6d5c2a89c2c4b9",
          "role": "admin",
          "profile": {
            "firstName": "admin"
          },
          "email": "admin@admin.com",
          "token": like("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3MTcxMjhkYmE2ZDVjMmE4OWMyYzRiOSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTczMTUwMzMzOCwiZXhwIjoxNzMxNTg5NzM4fQ.U1QtaYbD-fl7L5p2O7dreEN7KxfmEgBL21VLLand8sE")
        }
      }
    }
  }
})

it('Front - Deve autenticar usuário corretamente', async () => {
  await flow('Login')
    .useInteraction('Login response')
    .post('http://localhost:4000/public/authUser')
    .withJson({
      "email": "admin@admin.com",
      "password": "admin123"
    })
    .expectStatus(200)
    .expectJson('success', true)
})