import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  baseUrl: string =
    'https://api.telegram.org/bot5898997604:AAEMTODc64xcrLeP1yBMAXOJbt6ziaJmIEc/';
  constructor(private http: HttpClient) {}

  sendMessage(chatId: any, message: string) {
    var sendMessageUrl = `${this.baseUrl}sendMessage?chat_id=${chatId}&text=${message}&parse_mode=html`;
    return this.http.get(sendMessageUrl);
  }
}
