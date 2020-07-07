import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent
    }]),
    FormsModule,
  ]
})
export class DashboardModule {
}
