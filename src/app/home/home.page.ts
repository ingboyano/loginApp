import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  chatGroups: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getChatGroups().subscribe((data: any[]) => {
      this.chatGroups = data;
    });
  }
}