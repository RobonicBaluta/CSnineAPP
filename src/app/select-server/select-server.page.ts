import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-server',
  templateUrl: './select-server.page.html',
  styleUrls: ['./select-server.page.scss'],
})
export class SelectServerPage implements OnInit {
servers: Observable <any>;
email:any;
  constructor(
    private formBuilder: FormBuilder,
    public api: RestApiService,
    public loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
  
  }
  async getServers(){
 
  await this.api.checkServer(this.email).subscribe(info=>{this.servers=info
    console.log(this.servers);
   
    this.api.setServers(this.servers,this.email);
    // this.router.navigate(['/login']);
    });   
     

  }

}
