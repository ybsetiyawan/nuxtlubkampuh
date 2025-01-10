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
      nama: userData.nama,
      username: userData.username,
      password: hashedPassword,
      idRole: userData.idRole
    });
  }

  
  async updateUser(id, userData) {
    const saltRounds = 10;
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
    }
    return await UserRepository.updateUser(id, userData);
  }

  async deleteUser(id) {
    const result = await UserRepository.DeleteUserStatus(id, {
      isDeleted: true,
    });
    return result;
  }



  async getUserByUsername(username) {
    return await UserRepository.getUserByUsername(username);
  }

  async verifyPassword(inputPassword, storedHashedPassword) {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
  }

  async updatePassword(id, newPassword) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    return await UserRepository.updatePassword(id, hashedPassword);
  }
  
}

module.exports = new UserService();
