import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {UserService} from '../auth/user.service';
import {API_ROOT} from '../app.constants';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  chatData: any = {};
  users = [];
  activeChatUser: any;
  socket: any;
  msgData = {
    content: '',
    senderChatID: '',
    receiverChatID: '',
  };
  constructor(private user: UserService,
              private router: Router) {
    this.msgData.senderChatID = this.user.userData.id;
  }
  setSocket() {
    this.socket = io(API_ROOT + '?token=' + this.user.userData.token);
    const thisVar = this;
    this.socket.on('receive_message', function(data) {
      thisVar.addMsg(data.senderChatID, data);
      console.log(thisVar.chatData);
    }.bind(this));
    this.socket.on('user_reset', function() {
      thisVar.socket.emit('set_available', thisVar.user.userData.id);
    }.bind(this));
    // available_users
    this.socket.emit('available_users');
    this.socket.on('chat-users', function(data) {
      thisVar.users = [];
      Object.keys(data).map((r: any) => {
        thisVar.users.push({id: r, name: data[r].name, online: data[r].online});
      });
      console.log(thisVar.users);
    }.bind(this));

  }
  sendMessage() {
    const thisVar = this;
    this.msgData.receiverChatID = this.activeChatUser.id;
    this.socket.emit('send_message', thisVar.msgData);
    thisVar.addMsg(this.activeChatUser.id, Object.assign({}, this.msgData));
    this.msgData.content = '';
    console.log(this.chatData);
  }
  addMsg(user, data) {
    if (!this.chatData.hasOwnProperty(user)) {
      this.chatData[user] = [];
    }
    this.chatData[user].push({read: false, time: new Date(), ...data});
  }
  logout() {
    this.user.userData = null;
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
