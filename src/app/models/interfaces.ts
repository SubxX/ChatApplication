// Interfaces
export interface User {
  _id: string;
  name: string;
  email: string;
  nickname: string;
  profileconfig: Profileconfig;
  profilepic?: string;
}

export interface Profileconfig {
  nicknametop: boolean;
  searchbar: boolean;
  latestupdates: boolean;
}


// Initial Data

export const apiLink = 'http://localhost:3000/api/';
// http://localhost:3000/api/
// https://sleepy-coast-01684.herokuapp.com/api/

export const initUserData = {
  _id: '',
  name: '',
  email: '',
  nickname: '',
  profileconfig: {
    nicknametop: false,
    searchbar: false,
    latestupdates: false
  },
  profilepic: ''
};
