const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.isLogin = false;
    this.id = 0;
  }

  register(data) {
    this.id++
    const newUser = {
      id: this.id,
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }
  findAll(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 5000);
    })
  }
  findOne(id) {
    const user = this.users.find(item => item.id === id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }
  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw  boom.notFound('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index];
  }
  delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return  {id}
  }
  login(email, password) {
    console.log(email, password);
    this.isLogin = this.users.find(item => item.email == email && item.password == password);
    return this.isLogin;
    }
}

module.exports = UsersService;
