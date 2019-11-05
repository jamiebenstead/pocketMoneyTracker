import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public plt: Platform) {
    nativeStorage: NativeStorage; 
   
    this.plt.ready().then(() => {
      this.getAmount();
      this.setSchedule();
    }
      
      
    )

    //this.getAmount();
    //this.getSchedule();
  }

  

  

  amount;
  schedule;
  time;
  dayChoice;
  
  daily;
  weekly;

  getSchedule(){
    NativeStorage.getItem('schedule')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

  setSchedule(){
    console.log(this.schedule);
    console.log("setSchedule...");
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
    NativeStorage.setItem('amount', this.amount)
      .then(
        () => console.log("Stored: " + this.amount),
        error => console.error("Error storing amount", error)
    );

    NativeStorage.setItem('schedule', this.schedule)
      .then(
        () => console.log("Stored: " + this.schedule),
        error => console.error("Error storing amount", error)
    );

  }

  getAmount(){
    
    NativeStorage.getItem('schedule')
      .then(
        data => { this.schedule = data},
        error => console.error(error)
    );

    NativeStorage.getItem('amount')
      .then(
        data => { this.amount = data},
        error => console.error(error)
    );
    //this.setSchedule();
  }

  logValues(){
    console.log(this.amount);
    console.log(this.schedule);
    //console.log(this.time);
    //console.log(this.dayChoice);
  }

}
