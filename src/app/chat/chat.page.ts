import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  groupId: number = 0;
  messages: any[] = [];

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.groupId = +id;
      this.loadMessages();
    }
  }

  loadMessages() {
    this.chatService.getGroupMessages(this.groupId).subscribe((data: any) => {
      this.messages = data;
    });
  }
}