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
  onKeyPress(event) {
    if (event.key === 'Enter' || event.code === 'Enter' || event.keyCode === 13) {
      if (this.dashboardService.msgData.content !== '') {
        this.dashboardService.sendMessage();
      }
    }
  }
  getMsg() {
    if (this.dashboardService.chatData && this.dashboardService.activeChatUser &&
      this.dashboardService.chatData.hasOwnProperty(this.dashboardService.activeChatUser.id)) {
      return this.dashboardService.chatData[this.dashboardService.activeChatUser.id];
    }
    return [];
  }
  scrollOnUpdate() {
    document.getElementById('message-box').scroll(0, document.getElementById('message-box').scrollHeight);
  }

}
