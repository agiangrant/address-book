export interface RandomUser {
  gender: string;
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  login: RandomUserLogin;
  dob: RandomUserDob;
  registered: RandomUserRegistered;
  phone: string;
  cell: string;
  id: RandomUserId;
  picture: RandomUserPicture;
  nat: string;
}

export interface RandomUserDob {
  date: string;
  age: number;
}

export interface RandomUserId {
  name: string;
  value: string;
}

export interface RandomUserLocation {
  street: RandomUserLocationStreet;
  city: string;
  country: string;
  state: string;
  postcode: string;
  coordinates: RandomUserLocationCoordinates;
  timezone: RandomUserLocationTimezone;
}

export interface RandomUserLocationCoordinates {
  latitude: string;
  longitude: string;
}

export interface RandomUserLocationStreet {
  number: number;
  name: string;
}

export interface RandomUserLocationTimezone {
  offset: string;
  description: string;
}

export interface RandomUserLogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

export interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface RandomUserRegistered {
  date: string;
  age: number;
}

export interface RandomUserResponse {
  results: RandomUser[];
  info: RandomUserResponseInfo;
}

export interface RandomUserResponseInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}
