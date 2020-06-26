import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ChatsService , chat } from "../services/chats.service";
import { ModalController } from "@ionic/angular";
import { ChatComponent } from "../component/chat/chat.component";
import { ActionSheetController } from '@ionic/angular';

 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public ChatsRooms :any = []; 

  constructor(public authservice : AuthService,public chatservice : ChatsService,private modal : ModalController,public actionSheetController: ActionSheetController) {}

  Onlogout(){
    this.authservice.logout();
  }

  ngOnInit(){
    this.chatservice.getChatRooms().subscribe( chats => {
      // chats.map(chat =>{

      //   const data : chat =chat.payload.doc.data() as chat;
      //   data.id = chat.payload.doc.id;

      //   this.ChatsRooms.push(data);
      // })
      this.ChatsRooms = chats;
      
    })
  }

  openchat(chat){

    this.modal.create({
      component: ChatComponent,
      componentProps : {
        chat: chat
      }
    }).then( (modal) => modal.present())
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Disconnect',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.Onlogout();
        }
      
      }]
    });
    await actionSheet.present();
  }

}
