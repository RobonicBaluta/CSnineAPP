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
    public api: RestApiService,
    public loadingController: LoadingController,
    private router: Router) { }
    
    ngOnInit() {
      
    }
    async getServers(){
      const loading = await this.loadingController.create({
        message: 'Anschließen'
      });
      await loading.present();
      await this.api.checkServer(this.email).subscribe(info=>{
        if(info!='' && info!=null){
          
          this.servers=info
          // console.log(this.servers);
          loading.dismiss();
          this.api.setServers(this.servers,this.email);
          // this.router.navigate(['/login']);
        }else{
          window.alert('E-Mail nicht im System gefunden')
          loading.dismiss();
        }
      });   
      
      
    }
    
  }
  