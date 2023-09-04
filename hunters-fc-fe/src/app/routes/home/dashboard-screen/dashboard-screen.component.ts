import { Component, OnInit, ViewChild } from '@angular/core';
import { USER_INFO } from 'src/app/constants/constants';
import { Match } from 'src/app/models/match';
import { Player } from 'src/app/models/player';
import { Stadium } from 'src/app/models/stadium';
import { MatchService } from 'src/app/services/match/match.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { StadiumService } from 'src/app/services/stadium/stadium.service';
import { MatchDetailDrawerComponent } from './partials/match-detail-drawer/match-detail-drawer.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TelegramService } from 'src/app/services/telegram/telegram.service';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.css'],
})
export class DashboardScreenComponent implements OnInit {
  @ViewChild('matchDetailDrawer')
  matchDetailDrawer!: MatchDetailDrawerComponent;
  userInfo: any;
  matchList: Match[] = [];
  playerList: Player[] = [];
  stadiumList: Stadium[] = [];
  editingMatch!: Match;
  isVisibleChangeVoteModal: boolean = false;
  confirmChangeVoteMessage: string = 'loading...';

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private stadiumService: StadiumService,
    private msg: NzMessageService,
    private telegramService: TelegramService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getUserInfo();
    await this.getListStadium();
    await this.getListPlayer();
    this.getListMatch();
  }
  getUserInfo(): void {
    this.userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)?.data;
  }

  async getListMatch(): Promise<void> {
    await this.matchService
      .getList({})
      .toPromise()
      .then((res) => {
        if (res && res.result) {
          let resVal = res.result;
          resVal.forEach((element: any) => {
            this.transformData(element);
          });
          this.matchList = resVal;
        }
      });
  }

  async getListPlayer(): Promise<void> {
    await this.playerService
      .getList({})
      .toPromise()
      .then((res) => {
        if (res && res.result) {
          let resVal = res.result;
          resVal.forEach((element: any) => {
            this.transformDataPlayer(element);
          });
          this.playerList = resVal;
        }
      });
  }

  async getListStadium(): Promise<void> {
    await this.stadiumService
      .getList({})
      .toPromise()
      .then((res) => {
        if (res && res.result) {
          let resVal = res.result;
          this.stadiumList = resVal;
        }
      });
  }

  transformData(element: Match) {
    element.timeSection = this.getTimeSection(element.time);
    element.timeWeekDay = this.getTimeWeekDay(element.time);
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

  transformDataPlayer(element: Player) {
    element.fullName = element.lastName + ' ' + element.firstName;
  }

  onClickDetail(match: Match) {
    this.matchDetailDrawer.openDrawer(match, this.userInfo);
  }
  getTimeSection(date: Date): string {
    if (!date) return '';
    const fullDate = new Date(date);
    var hour = fullDate.getHours();
    var session: string;
    if (hour <= 11) {
      session = 'Sáng';
    } else if (hour >= 19) {
      session = 'Tối';
    } else {
      session = 'Chiều';
    }
    return session;
  }
  getTimeWeekDay(date: Date): string {
    if (!date) return '';
    const fullDate = new Date(date);
    var weekDay: string;
    switch (fullDate.getDay()) {
      case 0: {
        weekDay = 'Chủ Nhật';
        break;
      }
      case 1: {
        weekDay = 'Thứ Hai';
        break;
      }
      case 2: {
        weekDay = 'Thứ Ba';
        break;
      }
      case 3: {
        weekDay = 'Thứ Tư';
        break;
      }
      case 4: {
        weekDay = 'Thứ Năm';
        break;
      }
      case 5: {
        weekDay = 'Thứ Sáu';
        break;
      }
      case 6: {
        weekDay = 'Thứ Bảy';
        break;
      }
      default: {
        weekDay = 'Chủ Nhật';
        break;
      }
    }
    return weekDay;
  }
  async voteMatch(match: Match, voteStatus: any) {
    await this.matchService
      .voteMatch(match.id, { voteStatus: voteStatus })
      .toPromise()
      .then(async (res: any) => {
        await this.getListMatch();
        this.msg.create('success', `Đã bình chọn thành công`);
        let message = `Trận ${match.timeSection} ${match.timeWeekDay}:%0A<b>${
          this.userInfo.lastName
        } ${this.userInfo.firstName}</b> đã bình chọn ${
          voteStatus === 'yes' ? 'CÓ ĐÁ' : 'KHÔNG ĐÁ'
        }.%0ASố người đá hiện tại là ${res.result[0].attendMemberIds.length}/${
          res.result[0].attendMemberIds.length +
          res.result[0].denyMemberIds.length
        } người`;
        this.telegramService
          .sendMessage('5426764053', message)
          .toPromise()
          .then((res) => {});
      });
  }
  async onClickVoteMatch(event: any) {
    await this.voteMatch(event.match, event.voteStatus);
    this.matchDetailDrawer.match = this.matchList.find(
      (item) => item.id == event.match.id
    )!;
  }
  onClickChangeVote(match: Match) {
    this.editingMatch = match;
    var isAttending = match.attendMemberIds.includes(this.userInfo.id);
    this.isVisibleChangeVoteModal = true;
    if (isAttending)
      this.confirmChangeVoteMessage = `Bạn có chắc chắn muốn chuyển vote trận đấu thành KHÔNG ĐÁ?
        <br>
        <b>Các đồng đội sẽ buồn đó 🙁 </b>`;
    else
      this.confirmChangeVoteMessage =
        'Bạn có chắc chắn muốn chuyển vote trận đấu thành CÓ ĐÁ? 😁';
  }
  hideChangeVoteModal() {
    this.isVisibleChangeVoteModal = false;
  }
  async changeVote(match?: Match) {
    let messageStatus = '';
    let payload;
    var editingData = match ?? { ...this.editingMatch };
    const index = editingData.denyMemberIds.indexOf(this.userInfo.id, 0);
    if (index > -1) {
      payload = { voteStatus: 'yes' };
      messageStatus = 'Không đá thành CÓ ĐÁ';
    } else {
      payload = { voteStatus: 'no' };
      messageStatus = 'Có đá thành KHÔNG ĐÁ';
    }
    this.matchService
      .voteMatch(this.editingMatch.id, payload)
      .toPromise()
      .then(async (res: any) => {
        await this.getListMatch();
        this.matchDetailDrawer.match = this.matchList.find(
          (item) => item.id == this.editingMatch.id
        )!;
        this.isVisibleChangeVoteModal = false;
        this.msg.info('Thay đổi vote thành công');
        let message = `Trận ${editingData.timeSection} ${
          editingData.timeWeekDay
        }:%0A<b>${this.userInfo.lastName} ${
          this.userInfo.firstName
        }</b> đã đổi bình chọn ${messageStatus}.%0ASố người đá hiện tại là ${
          res.result[0].attendMemberIds.length
        }/${
          res.result[0].attendMemberIds.length +
          res.result[0].denyMemberIds.length
        } người`;
        this.telegramService
          .sendMessage('5426764053', message)
          .toPromise()
          .then((res) => {});
      });
  }
}
