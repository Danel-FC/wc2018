import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html?v=${new Date().getTime()}',
  styleUrls: ['./app.component.css?v=${new Date().getTime()}']
})
export class AppComponent {
  user:string;
  pass:string;
  invalidLogin:boolean=false;

  @ViewChild('closeModalButton') 
  closeModalButton: ElementRef;
  
  constructor(public data:DataService) { }

  onOkClick(): void {
    this.data.login(this.user, this.pass, (success:boolean) => {
      this.invalidLogin=!success;
      if(success){
        this.closeModalButton.nativeElement.click();
      }
    });
  }
}
