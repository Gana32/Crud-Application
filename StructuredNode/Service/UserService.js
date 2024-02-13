// services/UserService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../Repository/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(firstname, lastname, email, password) {
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(firstname, lastname, email, hashedPassword);
  }

  async loginUser(email, password) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });

    return token;
  }
}

module.exports = UserService;
