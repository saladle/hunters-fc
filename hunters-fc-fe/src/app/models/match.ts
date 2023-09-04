import { Player } from "./player";

export class Match {
  id: any;
  name: string;
  description: string;
  stadiumId: number;
  status: number;
  attendMemberIds: number[];
  denyMemberIds: number[];
  time: Date;
  priority: number;
  type: number;
  isDeleted: number;
  createdAt: Date;
  createdBy: number;
  timeSection: string;
  timeWeekDay: string;
  stadiumName: string;
  attendMemberObjs: Player[];
  denyMemberObjs: Player[];
  constructor(
    id: any,
    name: string,
    description: string,
    stadiumId: number,
    status: number,
    attendMemberIds: number[],
    denyMemberIds: number[],
    time: Date,
    priority: number,
    type: number,
    isDeleted: number,
    createdAt: Date,
    createdBy: number,
    timeSection: string,
    timeWeekDay: string,
    stadiumName: string,
    attendMemberObjs: Player[],
    denyMemberObjs: Player[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stadiumId = stadiumId;
    this.status = status;
    this.attendMemberIds = attendMemberIds;
    this.denyMemberIds = denyMemberIds;
    this.time = time;
    this.priority = priority;
    this.type = type;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.timeSection = timeSection;
    this.timeWeekDay = timeWeekDay;
    this.stadiumName = stadiumName;
    this.attendMemberObjs = attendMemberObjs;
    this.denyMemberObjs = denyMemberObjs;
  }
}
