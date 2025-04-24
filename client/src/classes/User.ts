type value = {
  username: string;
  email: string;
  password: string;
  phone_number: string;
};

class userRegisterClass implements value {
  username: string;
  email: string;
  password: string;
  phone_number: string;

  constructor(
    username: string,
    email: string,
    password: string,
    phone_number: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone_number = phone_number;
  }
}

export default userRegisterClass;
