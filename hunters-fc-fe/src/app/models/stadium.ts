export class Stadium {
  id: any;
  name: string;
  description: string;
  address: string;
  status: number;
  priority: number;
  constructor(
    id: any,
    name: string,
    description: string,
    address: string,
    status: number,
    priority: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.status = status;
    this.priority = priority;
  }
}
