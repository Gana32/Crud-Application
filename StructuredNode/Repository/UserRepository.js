// repositories/UserRepository.js
const User = require('../Model/User');

class UserRepository {
  //async 
  createUser(firstname, lastname, email, password) {
    const user = new User({ firstname, lastname, email, password });
    return user.save();
  }

  //async 
  getUserByEmail(email) {
    return User.findOne({ email });
  }
}

module.exports = UserRepository;
