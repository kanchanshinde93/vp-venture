import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-createportfolio',
  templateUrl: './createportfolio.component.html',
  styleUrls: ['./createportfolio.component.scss']
})
export class CreateportfolioComponent implements OnInit {
  public contentHeader: object
  protfolioForm: UntypedFormGroup;
  searchValue: string = "";
  results: any;
  inputChanged: string;
  autocomplete:boolean=false;
  public placeholder  = 'Enter the Country Name';
  keyword = 'fullName';
  constructor(public afs: AngularFirestore) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Create Portfolio',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Portfolio',
            isLink: true,
            link: '/'
          },
          {
            name: 'Create Portfolio',
            isLink: false
          }
        ]
      }
    };
    this.protfolioForm = new UntypedFormGroup({ // Login Form Input Field
      investorName: new UntypedFormControl('', [Validators.required]),
      amount: new UntypedFormControl('', [Validators.required]),
      lockingPeriod: new UntypedFormControl('', [Validators.required]),
    
     
    });
  }

  onSubmit() {
    console.log(this.protfolioForm.value);
  }
  
  onSelect(item: any) {
    this.searchValue = item;
  }
  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  search() {

    if(this.searchValue.length>=5){
      this.autocomplete=true;
      let self = this;
      self.results = this.afs.collection(`INVESTORS`, ref => ref
        .orderBy("fullName")
        .startAt(self.searchValue.toLowerCase())
        .endAt(self.searchValue.toLowerCase()+"\uf8ff")
        )
        .valueChanges()/* .subscribe((res:any)=>{
            console.log(res)
            this.keyword=res.fullName
        }); */
    }
    }
    onselectClient(name:any) {     
      if (name.ClientId != 0) {  
        //this.ClientName = ClientObj.ClientName;       
       // this.flag = false;  
      }  
      else {  
        return false;  
      }  
    }  

}
