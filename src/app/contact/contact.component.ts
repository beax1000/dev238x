import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ContactInfo} from '../models/contactInfo';
import { AppValidators } from '../validators/app-validators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  formControls = {};
  model: ContactInfo = new ContactInfo('', '', '', '');
  modelKeys: string[] = Object.keys(this.model);
  private nameFieldName = "name";
  private emailFieldName = "email";

  constructor() { 
    this.modelKeys.forEach( (key) => {
      let validators = [];
      // we want to make all fields required
      validators.push(Validators.required);
      
      
      if (key === this.nameFieldName) {
        // no special chars on name field
        validators.push(AppValidators.noSpecialChars);
      }
      else if (key === this.emailFieldName) {
        // validate email address
        validators.push(Validators.email);
      }
      
      this.formControls[key] = new FormControl(this.model[key], validators);
    });
    this.form = new FormGroup(this.formControls);
  }

  get subjects(): string[] {
    return ContactInfo.subjects;
  }

  ngOnInit() {
  }

  contactUs() {

  }

}
