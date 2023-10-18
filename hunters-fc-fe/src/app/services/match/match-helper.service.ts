import { Injectable } from '@angular/core';
import { Match } from 'src/app/models/match';
import { getTimeSection, getTimeWeekDay } from 'src/app/utils/util';
import { StadiumService } from '../stadium/stadium.service';
import { Stadium } from 'src/app/models/stadium';

@Injectable({
  providedIn: 'root'
})
export class MatchHelperService {
  stadiumList: Stadium[] = [];
  constructor(
    private stadiumService: StadiumService
  ) { }

  transformMatchData(element: Match) {
    element.timeSection = getTimeSection(element.time);
    element.timeWeekDay = getTimeWeekDay(element.time);
    element.stadiumName = this.stadiumList.find(
      (item) => item.id == element.stadiumId
    )?.name!;
    element.attendMemberObjs = element.attendMemberIds.map(
      (item) => this.playerList.find((player) => player.id == item)!
    );
    element.denyMemberObjs = element.denyMemberIds.map(
      (item) => this.playerList.find((player) => player.id == item)!
    );
  }
}
