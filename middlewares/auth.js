const jwt = require('express-jwt');
const JwksRsa = require('jwks-rsa');

// Authentication middleware
// will check access token in authorization headers of a request
// will verify access token against Auth0 JSON web key set
exports.checkJwt = jwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://dev-uz8kq6y6.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://dev-uz8kq6y6.us.auth0.com/api/v2/',
  issuer: 'https://dev-uz8kq6y6.us.auth0.com/',
  algorithms: ['RS256'],
});
