import {Injectable} from '@angular/core';
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
    }.bind(this));
    this.socket.on('user_reset', function() {
      thisVar.socket.emit('set_available', thisVar.user.userData.id);
    }.bind(this));
    this.socket.on('user_status', function(user) {
      const alert = document.createElement('div');
      alert.classList.add('alert', 'alert-success', 'alert-dismissible');
      alert.innerHTML = '<button id="' + user.name.replace(' ', '') + '" type="button" class="close" data-dismiss="alert">&times;</button>\n' +
        '    <strong>' + user.name + '</strong> has logged ' + user.status  + '.';
      document.getElementById('alerts').append(alert);
      setTimeout(() => document.getElementById(user.name.replace(' ', '')).click(), 4000);
    }.bind(this));
    // available_users
    this.socket.emit('available_users');
    this.socket.on('chat-users', function(data) {
      thisVar.users = [];
      Object.keys(data).map((r: any) => {
        thisVar.users.push({id: r, name: data[r].name, online: data[r].online});
      });
      // console.log(thisVar.users);
    }.bind(this));

  }

  sendMessage() {
    const thisVar = this;
    this.msgData.receiverChatID = this.activeChatUser.id;
    this.socket.emit('send_message', thisVar.msgData);
    thisVar.addMsg(this.activeChatUser.id, Object.assign({}, this.msgData));
    this.msgData.content = '';
  }

  addMsg(user, data) {
    if (!this.chatData.hasOwnProperty(user)) {
      this.chatData[user] = [];
    }
    this.chatData[user].push({read: false, time: new Date(), ...data});
  }

  logout() {
    this.user.userData = null;
    this.chatData = null;
    sessionStorage.clear();
    this.socket.disconnect();
    this.router.navigate(['login']);
  }
}
