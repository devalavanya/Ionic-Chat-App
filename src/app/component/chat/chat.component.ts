import { Component, OnInit } from '@angular/core';
import {  NavParams, ModalController } from "@ionic/angular"; 
import { message } from "../../models/message";
import { ChatsService } from "../../services/chats.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat:any;

  public messages = [];
  
  // public message : message;

  public room :any;

  public msg : string;


  constructor(private navparams : NavParams , private modal : ModalController,private chatService : ChatsService) { }

  ngOnInit() {

this.chatService.getChatRoom(this.chat.id).subscribe(room => {
console.log(room);
this.room = room;
})

    this.chat = this.navparams.get('chat')
  }

  closechat(){
    this.modal.dismiss()
  }

  sendMessage(){
    const message : message ={
      content : this.msg,
      type : 'text',
      date : new Date()
    }
    this.chatService.sendMsgToFirebase(message ,this.chat.id);
    this.msg = "";
  }
  
}
