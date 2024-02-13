export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string; // Optional for registration, not required for fetching users
  }