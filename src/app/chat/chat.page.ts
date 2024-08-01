import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  groupId: number | null = null;
  messages: any[] = [];
  usuarioActual: any = { id: 1, username: 'user1' }; // Inicializa con datos reales
  mensaje: string = '';
  @ViewChild(IonContent, { static: false }) content: IonContent | null = null;

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.groupId = +id;
      this.loadMessages();
    }
  }

  loadMessages() {
    if (this.groupId !== null) {
      this.chatService.getGroupMessages(this.groupId).subscribe((data: any[]) => {
        this.messages = data;
      });
    }
  }

  enviarMensaje() {
    if (!this.mensaje || this.mensaje.trim() === '') {
      // No se puede enviar un mensaje vacío
      return;
    }
    console.log('EL MENSAJE ES: ',this.mensaje);

    const body: any = {
      sender_id: String(this.usuarioActual.id),
      group_id: String(1),
      content: this.mensaje
    };

    this.chatService.sendMessage(body).subscribe({
      next: (resp: any) => {
        console.log('MENSAJE ENVIADO', resp);
        this.mensaje = '';  // Limpia el campo de entrada

        // Agrega la fecha de envío
        body['id'] = resp.message_id;
        body['sent_at'] = new Date().toISOString();

        this.messages.push(body);
        console.log(this.messages);

        // Hace un scroll con delay
        setTimeout(() => {
          if (this.content) {
            this.content.scrollToBottom(200);
          }
        }, 200);
      },
      error: (error: any) => {
        console.error('ERROR EN EL ENVÍO DE MENSAJE', error);
      }
    });
  }
}
