var Vericred = require('../../lib/vericred');
var Connection = require('../../lib/vericred/connection');

describe('Connection', function () {
  var connection, request;

  describe('with a successful request', function () {
    beforeEach(function () {
      request = sinon.stub().callsArgWith(
        1,
        null,
        { statusCode: 200 },
        JSON.stringify({ quux: 'corge'})
      );
      connection = new Connection(request);
    });

    it('proxies calls to the HTTP library', function () {
      var qs = { providers: [{ npi: 1 }, { npi: 2 }] }
      return connection.get('/foo/bar', { baz: 'qux' })
        .then(function () {
          var called = request.calledWith(
            {
              uri: 'https://api.vericred.com/foo/bar?baz=qux',
              headers: {
                'Vericred-Api-Key': Vericred.config.apiKey
              }
            },
            sinon.match.func
          )
          expect(called)
            .to.eql(true, 'Expected call to GET to be correct got');
        });
    });

    it('parses the body', function () {
      return connection.get('/foo/bar')
        .then(function (resp) {
          expect(resp.quux).to.eql('corge');
        })
    });
  });

  describe('when there is an error', function () {
    beforeEach(function () {
      request = sinon.stub().callsArgWith(1, null, { statusCode: 422 });
      connection = new Connection(request);
    });

    it('rejects the promise', function () {
      var caught = false;
      return connection.get('/foo/bar')
        .catch(function () {
          caught = true;
        })
        .then(function () {
          expect(caught).to.eql(true);
        });
    });
  });
});
