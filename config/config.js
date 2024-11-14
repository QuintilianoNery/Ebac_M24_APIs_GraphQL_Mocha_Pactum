const pf = require('pactum-flow-plugin');
const { incrementVersion } = require('./../function/version.js');
const { reporter } = require('pactum');


function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'lojaEbacFront';
  pf.config.projectName = 'Ebac front';
  pf.config.version = incrementVersion();
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

module.exports = { addFlowReporter };