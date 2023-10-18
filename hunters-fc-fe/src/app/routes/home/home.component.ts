import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { USER_INFO } from 'src/app/constants/constants';
import { DeviceType, Role } from 'src/app/constants/enums';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class HomeComponent implements OnInit {
  userInfo: any;
  allUsers: any;
  allMatches: any;
  // listMember = [];
  allListMember = [];
  // currentMatchMember = [];
  visibleDetailMatchDrawer = false;
  currentDeviceType?: DeviceType;
  DeviceType = DeviceType;

  mobileNavVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private message: NzMessageService
  ) {
    this.getCurrentDeviceType();
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)?.data;
  }

  isAdmin() {
    return this.authService.role == Role.Admin;
  }

  getCurrentDeviceType() {
    if (window.innerWidth > 1024) {
      this.currentDeviceType = DeviceType.PC;
    } else if (window.innerWidth > 740) {
      this.currentDeviceType = DeviceType.TABLE;
    } else {
      this.currentDeviceType = DeviceType.MOBILE;
    }
  }


  openDetailMatchDrawer(): void {
    this.visibleDetailMatchDrawer = true;
  }

  closeDetailMatchDrawer(): void {
    this.visibleDetailMatchDrawer = false;
  }

  onCloseDrawer(ev: any) {}

  createBasicMessage(): void {
    this.message.info('Chức năng đang phát triển');
  }

  onClickLogOut() {
    localStorage.removeItem('currentUser'); // TODO
  }

  onResize(event: any) {
    // if (event.target.innerWidth < 1474) {
    // } else {
    // }
    this.getCurrentDeviceType();
  }

  openMobileNavDrawer() {
    this.mobileNavVisible = true;
  }

  closeMobileNavDrawer() {
    this.mobileNavVisible = false;
  }

  test() {
    debugger;
  }
}
