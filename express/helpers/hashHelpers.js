const bcrypt = require('bcryptjs');


// Hash the password
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Compare password
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
