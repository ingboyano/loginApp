import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private groupsUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-members-by-user/1';
  private messagesUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-messages-by-group';
v  private privateChatsUrl = 'https://www.hostcatedral.com/api/app-chat/public/private-chats/';
  private privateMessagesByUserUrl = 'https://www.hostcatedral.com/api/app-chat/public/private-messages-by-user/';

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

  sendMessage(body: any): Observable<any> {
    console.log('Enviando Mensaje: ', body);
    return this.http.post<any>(this.sendMessageUrl, body).pipe(
      catchError(this.handleError)
    );
  }

  getPrivateChats(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.privateChatsUrl}${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getPrivateMessagesByUser(senderId: number, receiverId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.privateMessagesByUserUrl}${senderId}/${receiverId}`).pipe(
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
