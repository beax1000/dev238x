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
  private subjectFieldName = "subject";
  sendMessageAttempted: boolean = false;
  messageSent: boolean = false;

  constructor() { 
    // rubric61
    // The form should show validation errors if the form isn’t filled out
    // correctly and the send button is pressed

    // rubric80
    // Used jQuery or Angular for data binding
    
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
    this.modelKeys.forEach( (elem) => {
      this.model[elem] = elem===this.subjectFieldName ? ContactInfo.subjects[this.form.value[elem]] : this.form.value[elem];
    });
    this.sendMessageAttempted = true;
    // rubric60
    // The send button should create an alert based on the message
    // sent
    this.messageSent = !this.form.invalid;
  }

}
