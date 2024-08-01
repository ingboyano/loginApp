import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface MessageBody {
  sender_id: string;
  group_id: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private groupsUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-members-by-user/1';
  private messagesUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-messages-by-group/';
  private sendMessageUrlGroup = 'https://www.hostcatedral.com/api/app-chat/public/group-messages';
  private privateChatsUrl = 'https://www.hostcatedral.com/api/app-chat/public/private-chats/';
  private privateMessagesByUserUrl = 'https://www.hostcatedral.com/api/app-chat/public/private-messages-by-user/';
  private sendPrivateMessageUrl = 'https://www.hostcatedral.com/api/app-chat/public/private-messages'; // URL para enviar mensajes privados

  constructor(private http: HttpClient) { }

  getChatGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.groupsUrl).pipe(
      catchError(this.handleError)
    );
  }

  getGroupMessages(groupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.messagesUrl}${groupId}`).pipe(
      catchError(this.handleError)
    );
  }

  sendMessage(body: MessageBody): Observable<any> {
    // Convertir todas las propiedades del objeto a cadenas
    const stringifiedBody: MessageBody = {
      sender_id: String(body.sender_id),
      group_id: String(body.group_id),
      content: String(body.content)
    };

    console.log('Enviando Mensaje: ', stringifiedBody);

    return this.http.post<any>(this.sendMessageUrlGroup, stringifiedBody).pipe(
      catchError(this.handleError)
    );
  }

  getPrivateChats(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.privateChatsUrl}${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getPrivateMessagesByUser(receiverId: number,senderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.privateMessagesByUserUrl}${receiverId}/${senderId}`).pipe(
      catchError(this.handleError)
    );
  }

  sendPrivateMessage(body: any): Observable<any> {
    const stringifiedBody = {
      sender_id: String(body.sender_id),
      receiver_id: String(body.receiver_id),
      content: String(body.content)
    };

    console.log('Enviando Mensaje Privado: ', stringifiedBody);

    return this.http.post<any>(this.sendPrivateMessageUrl, stringifiedBody).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del servidor
      console.error(
        `Código de error del servidor ${error.status}, ` +
        `contenido: ${error.error}`);
    }
    return throwError(
      'Algo malo ocurrió; por favor, intente nuevamente más tarde.');
  }
}
