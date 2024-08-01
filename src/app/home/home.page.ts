import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  chatGroups: any[] = [];
  privateChats: any[] = [];
  userId: number;
  errorMessage: string = '';

  constructor(private chatService: ChatService, private router: Router) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadChatGroups();
    this.loadPrivateChats();
  }

  loadChatGroups() {
    this.chatService.getChatGroups().subscribe(
      (data: any[]) => {
        this.chatGroups = data;
      },
      (error: any) => {
        this.errorMessage = 'Error al cargar grupos de chat';
        console.error('Error al cargar grupos de chat:', error);
      }
    );
  }

  loadPrivateChats() {
    const users = [1, 2, 3];
    this.privateChats = users.filter(id => id !== this.userId).map(id => ({ id, name: `user${id}` }));
  }

  openChat(groupId: number | undefined) {
    if (groupId !== undefined) {
      this.router.navigate(['/chat', groupId]);
    } else {
      this.errorMessage = 'groupId is undefined';
    }
  }

  openPrivateChat(chatId: number | undefined) {
    if (chatId !== undefined) {
      this.router.navigate(['/private-chat', chatId]);
    } else {
      this.errorMessage = 'chatId is undefined';
    }
  }
}
