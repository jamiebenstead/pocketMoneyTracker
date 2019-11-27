import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private nativeStorage: NativeStorage, private localNotifications: LocalNotifications, public plt: Platform) {   
    this.plt.ready().then(() => {
      this.onLoadGetSchedule();
    });
  }

  amount;
  schedule;
  time;
  dayChoice;
  
  //view
  daily;
  weekly;

  onLoadGetSchedule(){
    this.nativeStorage.getItem("schedule")
      .then(  
        data => this.schedule = data,
        error => console.error(error)
      )

      this.nativeStorage.getItem("amount")
      .then(  
        data => this.amount = data,
        error => console.error(error)
      )
  }

  setSchedule(){
    if(this.schedule === 'daily'){
      this.daily = true;
      this.weekly = false;
    } 
    if(this.schedule === 'weekly'){
      this.daily = false;
      this.weekly = true;
    }
  }

  saveSettings(){    
    this.nativeStorage.setItem('amount', this.amount)
      .then(
        () => console.log("Stored: " + this.amount),
        error => console.error("Error storing amount", error)
      );

    this.nativeStorage.setItem('schedule', this.schedule)
      .then(
        () => console.log("Stored: " + this.schedule),
        error => console.error("Error storing amount", error)
      );

    this.nativeStorage.setItem('time', this.time)
        .then(
          () => console.log("Stored: " + this.time),
          error => console.error("Error storing time", error)
        );

  }

  getAmount(){
    this.nativeStorage.getItem('schedule')
      .then(
        data => { this.schedule = data},
        error => console.error(error)
    );

    this.nativeStorage.getItem('amount')
      .then(
        data => { this.amount = data},
        error => console.error(error)
    );
  }

  logValues(){
    console.log(this.amount);
    console.log(this.schedule);
    console.log(this.time);
    console.log(this.dayChoice);

    

    this.localNotifications.schedule({
      id: 1,
      text: 'Test Notifications',
      trigger: {at: new Date(new Date().getTime() + 5000)},
      actions: [
        {id: 'yes', title: 'yes'},
        {id: 'no', title: 'no'}
      ]
    });
  }

}
