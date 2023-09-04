import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchFormDrawerComponent } from './partials/match-form-drawer/match-form-drawer.component';
import { MatchService } from 'src/app/services/match/match.service';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-match-management',
  templateUrl: './match-management.component.html',
  styleUrls: ['./match-management.component.css'],
})
export class MatchManagementComponent implements OnInit {
  @ViewChild('matchFormDrawer')
  matchFormDrawer!: MatchFormDrawerComponent;
  allMatches: any;
  allUsers: any;
  currentMatch: any;
  visible = false;
  thisSaturday: any;
  thisSunday: any;

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private nzContextMenuService: NzContextMenuService,
    private nzMessageService: NzMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getListUsers();
    this.fetchData();
  }

  async fetchData() {
    await this.getListMatch();
  }

  async getListMatch() {
    var response = await this.matchService.getList({}).toPromise();
    this.allMatches = response;
  }

  async getListUsers() {
    var response = await this.playerService.getList({}).toPromise();
    this.allUsers = response;
  }

  // Drawer
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  async onClickCreate(data?: any) {
    this.matchFormDrawer.openDrawer(data, 'create', false, this.allUsers);
  }

  async onClickDetail(data: any) {
    this.matchFormDrawer.openDrawer(data, 'detail', false, this.allUsers);
  }

  async onClickDeleteMatch(deleteId: any) {
    // await this.matchService
    //   .deleteMatch(deleteId)
    //   .toPromise()
    //   .then((res) => {
    //     console.log(res);

    //     this.fetchData();
    //   });
  }

  onCloseDrawer(ev: any) {}

  contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    match: any
  ): void {
    this.nzContextMenuService.create($event, menu);
    this.currentMatch = match;
  }

  getSqlCode(data: any) {
    var listJoinMemberCode: any[] = [];
    data.attendMemberObj.forEach((playerId: any) => {
      listJoinMemberCode.push(
        "'" + this.allUsers.find((item: any) => item.id == playerId).code + "'"
      );
    });
    var listJoinMemberCodeString = listJoinMemberCode.join(', ');
    this.copyMessage(listJoinMemberCodeString);
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  buildMatchModel() {
    const matchModel = {
      name: 'Trận đấu QM-',
      day: null,
      stadium: 'SVĐ Vệ An',
      note: null,
      isKickedOff: false,
    };
    return matchModel;
  }

  getThisWeekend() {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    // var firstDay = new Date(curr.setDate(first + 7)).toUTCString();
    // var lastDay = new Date(curr.setDate(last)).toUTCString();
    var firstDay = new Date(curr.setDate(first + 7));
    var lastDay = new Date(curr.setDate(last));

    firstDay.setHours(6, 0, 0);
    lastDay.setHours(20, 30, 0);

    this.thisSunday = firstDay.toUTCString();
    this.thisSaturday = lastDay.toUTCString();
  }

  async onClickAutoCreate() {
    this.getThisWeekend();
    let match1 = this.buildMatchModel();
    match1.day = this.thisSaturday;
    let match2 = { ...match1, day: this.thisSunday, stadium: 'SVĐ Suối Hoa' };
    await this.matchService
      .create(match1)
      .toPromise()
      .then((result) => this.nzMessageService.info('Tạo trận đấu thành công'));
    await this.matchService
      .create(match2)
      .toPromise()
      .then((result) => this.nzMessageService.info('Tạo trận đấu thành công'));
    await this.fetchData();
  }
}
