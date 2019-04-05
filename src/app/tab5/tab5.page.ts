import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  info=null;
  company=null;
  

  constructor(public api: RestApiService,) { }
 
  ngOnInit() {

    this.getProfile();
   // this.getCompanyInfo(id);
  }

  async getProfile() {
 return this.api.getProfile().subscribe(profile=>{this.info=profile});

    
  }

  async getCompanyInfo(id:number){

    this.api.getCompanyById(id).subscribe(result=>{
      this.company=result;
    })
  }

}
