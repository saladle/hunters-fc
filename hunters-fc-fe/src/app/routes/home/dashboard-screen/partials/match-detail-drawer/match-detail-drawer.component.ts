import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceType } from 'src/app/constants/enums';
import { Match } from 'src/app/models/match';
import { getCurrentDeviceType } from 'src/app/utils/helper';

@Component({
  selector: 'app-match-detail-drawer',
  templateUrl: './match-detail-drawer.component.html',
  styleUrls: ['./match-detail-drawer.component.css'],
})
export class MatchDetailDrawerComponent implements OnInit {
  @Output() onVoteMatch: EventEmitter<{ match: Match; voteStatus: any }> =
    new EventEmitter<{ match: Match; voteStatus: any }>();
  @Output() onChangeVote = new EventEmitter();
  isVisibleDrawer: boolean = false;
  match!: Match;
  drawerTitle: string = '';
  drawerWidth: string = '40%';
  currentDeviceType?: DeviceType;
  userInfo: any;

  constructor() {}

  ngOnChanges() {
    debugger;
  }

  ngOnInit(): void {
    this.currentDeviceType = getCurrentDeviceType();
    this.calculateDrawerWidth();
  }
  openDrawer(match: Match, userInfo: any) {
    this.isVisibleDrawer = true;
    this.match = match;
    this.userInfo = userInfo;
    this.drawerTitle = `Kèo ${match.timeSection} ${match.timeWeekDay} ${match.stadiumName}`;
  }
  closeDrawer() {
    this.isVisibleDrawer = false;
  }
  calculateDrawerWidth() {
    if (this.currentDeviceType == DeviceType.MOBILE) {
      this.drawerWidth = '100%';
    } else {
      this.drawerWidth = '40%';
    }
  }
  updateMatchAttendMember(match: Match) {}
  updateMatchDenyMember(match: Match) {}
  changeVote() {
    this.onChangeVote.emit(this.match);
  }
  voteMatch(voteStatus: any) {
    this.onVoteMatch.emit({ match: this.match, voteStatus });
  }
}
