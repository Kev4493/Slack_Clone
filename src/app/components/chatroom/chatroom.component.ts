import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  channelId = ''

  channel: Channel = new Channel;
  message: Message = new Message;


  constructor(private route:ActivatedRoute, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    // ID aus der aktuellen URL holen und in Variable channelId speichern:
    this.route.paramMap.subscribe( paramMap => {
      this.channelId = paramMap.get('id');
      // console.log('Current Channel ID:', this.channelId);

      // Channelinfos aus der jeweiligen ID holen:
      this.getCurrentChannelInfos();
    })
  }


  getCurrentChannelInfos() {
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((channel: any) => {
      this.channel = new Channel(channel);
      // console.log('Retrieved current channel:', this.channel);
    })
  }

  sendMessage() {
    this.message.createdAt = new Date().getTime();
    console.log('Current Message is:', this.message);
  }

}
