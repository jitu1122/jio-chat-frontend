import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('close', {static: false})
  public close: ElementRef;

  constructor(public dashboardService: DashboardService) {
  }

  ngOnInit(): void {
  }

  getMsg() {
    if (this.dashboardService.chatData && this.dashboardService.activeChatUser &&
      this.dashboardService.chatData.hasOwnProperty(this.dashboardService.activeChatUser.id)) {
      return this.dashboardService.chatData[this.dashboardService.activeChatUser.id];
    }
    return [];
  }

}
