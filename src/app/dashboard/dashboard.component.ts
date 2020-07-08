import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.setSocket();
  }

  setActiveChat(user) {
    this.dashboardService.activeChatUser = user;
    if (this.dashboardService.chatData && this.dashboardService.chatData[user.id] && this.dashboardService.chatData[user.id].length > 0) {
      let i = this.dashboardService.chatData[user.id].length - 1;
      while (i > -1) {
        if (this.dashboardService.chatData[user.id][i].senderChatID === user.id) {
          this.dashboardService.chatData[user.id][i].read = true;
          return;
        }
        i--;
      }

    }
  }

  getLastMsg(id) {
    if (this.dashboardService.chatData && this.dashboardService.chatData[id] && this.dashboardService.chatData[id].length > 0) {
      let i = this.dashboardService.chatData[id].length - 1;
      while (i > -1) {
        if (this.dashboardService.chatData[id][i].senderChatID === id) {
          return {
            read: this.dashboardService.chatData[id][i].read,
            msg: this.dashboardService.chatData[id][i].content,
            time: this.dashboardService.chatData[id][i].time
          };
        }
        i--;
      }
    }
    return null;
  }
}
