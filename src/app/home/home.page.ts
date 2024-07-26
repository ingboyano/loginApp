import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  chatGroups: any[] = [];

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.loadChatGroups();
  }

  loadChatGroups() {
    this.chatService.getChatGroups().subscribe((groups) => {
      this.chatGroups = groups;
    });
  }

  openChat(group: any) {
    this.router.navigate(['/chat', group.group_id]);
  }
}