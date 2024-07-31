import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private groupsUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-members-by-user/1';
  private messagesUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-messages-by-group/';
  private sendMessageUrl = 'https://www.hostcatedral.com/api/app-chat/public/private-messages';

  constructor(private http: HttpClient) { }

  getChatGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.groupsUrl);
  }

  getGroupMessages(groupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.messagesUrl}${groupId}`);
  }

  sendMessage(body: any): Observable<any> {
    return this.http.post<any>(this.sendMessageUrl, body);
  }
}
