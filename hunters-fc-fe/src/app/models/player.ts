export class Player {
  id: any;
  code: string;
  lastName: string;
  firstName: string;
  dateOfBirth: Date;
  shirtNumber: number;
  username: string;
  status: number;
  avatarUrl: string;
  fullName: string;
  constructor(
    id: any,
    code: string,
    lastName: string,
    firstName: string,
    dateOfBirth: Date,
    shirtNumber: number,
    username: string,
    status: number,
    fullName: string,
    avatarUrl: string
  ) {
    this.id = id;
    this.code = code;
    this.lastName = lastName;
    this.firstName = firstName;
    this.dateOfBirth = dateOfBirth;
    this.shirtNumber = shirtNumber;
    this.username = username;
    this.status = status;
    this.fullName = fullName;
    this.avatarUrl = avatarUrl;
  }
}
