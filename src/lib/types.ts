// define user credentials for login
export type UserCred =  {
  username: string;
  password: string;
  isError: boolean;
  errorMsg: string;
}

// define global user type
export type User = {
  username: string;
  userId: number;
};

// define tube
export type Tube = {
  // user: number;
  title: string;
  description: string;
  url: string;
  posX: number;
  posY: number;
}
// define playlist
export type Playlist = {
  title: string;
  tubes: Tube[];
  userId: number;
}