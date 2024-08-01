import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {
  senderId: number;
  receiverId: number | null = null;
  messages: any[] = [];
  @ViewChild(IonContent, { static: false }) content: IonContent | null = null;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {
    this.senderId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.receiverId = +id;
      this.loadMessages();
    }
  }

  loadMessages() {
    if (this.receiverId !== null) {
      this.chatService.getPrivateMessagesByUser(this.senderId, this.receiverId).subscribe((data: any[]) => {
        this.messages = data;
      });
    }
  }
}
