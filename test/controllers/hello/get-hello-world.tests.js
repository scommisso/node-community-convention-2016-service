'use strict';

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var getHelloWorld = require('../../../lib/controllers/hello/get-hello-world');

describe('GET /hello/{person}', function () {
  var req, res, next, timer;

  beforeEach(function () {
    timer = sinon.useFakeTimers();

    req = {
      params: {
        person: null
      }
    };

    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis()
    };

    next = sinon.stub();
  });

  afterEach(function () {
    timer.restore();
  });

  function handleRequest() {
    getHelloWorld(req, res, next);
  }

  it('should return a greeting after 500 ms', function () {
    req.params.person = 'world';
    handleRequest();

    timer.tick(499);
    expect(res.status).to.not.be.called;
    expect(res.send).to.not.be.called;

    timer.tick(1);
    expect(res.status).to.be.calledWith(200);
    expect(res.status).to.be.calledOnce;
    expect(res.send).to.be.calledWith('"Hello, world"');
    expect(res.send).to.be.calledOnce;
  });

});
