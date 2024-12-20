const UserRepository = require("../../repositories/setting/userRepository");
const bcrypt = require("bcrypt");

class UserService {
  async resolveAllUsers(filters) {
    return await UserRepository.resolveAllUsers(filters);
  }

  async createUser(userData) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    return await UserRepository.createUser({
      username: userData.username,
      password: hashedPassword,
    });
  }

  async getUserByUsername(username) {
    return await UserRepository.getUserByUsername(username);
  }

  async verifyPassword(inputPassword, storedHashedPassword) {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
  }
}

module.exports = new UserService();
