import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { IonContent } from '@ionic/angular';

interface PrivateMessage {
  sender_id: number;
  receiver_id: number | null;
  content: string;
  id?: number;
  sent_at?: string;
}

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {
  senderId: number;
  receiverId: number | null = null;
  messages: PrivateMessage[] = [];
  mensaje: string = '';
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
      this.chatService.getPrivateMessagesByUser(this.senderId, this.receiverId).subscribe((data: PrivateMessage[]) => {
        this.messages = this.messages.concat(data);
        this.sortAndScrollMessages();
      });
      this.chatService.getPrivateMessagesByUser(this.receiverId, this.senderId).subscribe((data: PrivateMessage[]) => {
        this.messages = this.messages.concat(data);
        this.sortAndScrollMessages();
      });
    }
  }

  sortAndScrollMessages() {
    this.messages.sort((a, b) => {
      const dateA = a.sent_at ? new Date(a.sent_at).getTime() : 0;
      const dateB = b.sent_at ? new Date(b.sent_at).getTime() : 0;
      return dateA - dateB;
    });

    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(200);
      }
    }, 200);
  }

  enviarMensajePrivado() {
    if (!this.mensaje || this.mensaje.trim() === '') {
      return;
    }

    const body: PrivateMessage = {
      sender_id: this.senderId,
      receiver_id: this.receiverId,
      content: this.mensaje
    };

    this.chatService.sendPrivateMessage(body).subscribe({
      next: (resp: any) => {
        console.log('MENSAJE PRIVADO ENVIADO', resp);
        this.mensaje = '';  // Limpia el campo de entrada

        // Agrega la fecha de envío
        body.id = resp.message_id;
        body.sent_at = new Date().toISOString();

        this.messages.push(body);
        this.sortAndScrollMessages();
      },
      error: (error: any) => {
        console.error('ERROR EN EL ENVÍO DE MENSAJE PRIVADO', error);
      }
    });
  }
}
