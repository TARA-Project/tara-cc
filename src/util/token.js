const Jwt = require('@hapi/jwt');

const secret = 'some_cool_secret';

const generateToken = (user) => {
  const token = Jwt.token.generate({
    aud: 'tara-user',
    iss: 'tara-backend',
    user: user,
  },
  {
    key: secret,
    algorithm: 'HS256',
  },
  {
    ttlSec: 14400,
  });

  return token;
};

const validateToken = (artifacts, request, h) => {
  let isValid;

  if (artifacts.decoded.payload.aud === 'tara-user') {
    isValid = true;
  } else {
    isValid = false;
  }

  return {
    isValid,
    credentials: {user: artifacts.decoded.payload.user},
  };
};

module.exports = {generateToken, validateToken};
