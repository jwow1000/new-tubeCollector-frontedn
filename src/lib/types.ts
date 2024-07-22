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
  id: string;
};

// define tube
export type Tube = {
  title: string;
  description: string;
  url: string;
  posX: number;
  posY: number;
  user: number;
}
// define playlist
export type Playlist = {
  title: string;
  tubes: Tube[];
  user: string;
}