import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private groupsUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-members-by-user/1';
  private messagesUrl = 'https://www.hostcatedral.com/api/app-chat/public/group-messages-by-group/';

  constructor(private http: HttpClient) { }

  getChatGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.groupsUrl);
  }

  getGroupMessages(groupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.messagesUrl}${groupId}`);
  }
}