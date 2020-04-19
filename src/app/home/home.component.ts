import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selection: String;
  weblogicFlag: boolean;

  weblogicForm: FormGroup;
  nonWeblogicForm: FormGroup;
  submitFlag: boolean;
  constructor(private fb: FormBuilder){

  }
  // getter to get a reference to weblogicParamDetails form array in myForm form group
  get weblogicParamDetails():FormArray{
    return <FormArray>this.weblogicForm.get('weblogicParamDetails')
  }

  // getter to get a reference to nonWeblogicParamDetails form array in myForm form group
  get nonWeblogicParamDetails():FormArray{
    return <FormArray>this.nonWeblogicForm.get('nonWeblogicParamDetails')
  }
  // add a new row, get reference to form array using getter method and push form group into it   
  addRow(){
    this.submitFlag = false;
    console.log(this.selection);
    if(this.selection == "Weblogic Parameters") {
      this.weblogicParamDetails.push(this.initWeblogicParamDetails());
    } else {
      this.nonWeblogicParamDetails.push(this.initNonWeblogicParamDetails());
    }

    
  }
  // make a form for each row!
  initWeblogicParamDetails(): FormGroup{
    return this.fb.group({
              installationPath: [null, Validators.required],
              tierName: [null, Validators.required],
              host: [null, Validators.required],
              jvmInstanceName: [null, Validators.required],
              applicationName: [null, Validators.required]
          });
  }

  initNonWeblogicParamDetails(): FormGroup{
    return this.fb.group({
              installationPath: [null, Validators.required],
              tierName: [null, Validators.required],
              host: [null, Validators.required],
              applicationName: [null, Validators.required]
          });
  }

  submit(){
    this.submitFlag = true;
    console.log(this.weblogicForm.value);
  }

  ngOnInit() {
    this.selection = "Weblogic Parameters";
    this.weblogicFlag = true;
    this.submitFlag = false;
    this.initializeWeblogicForm();
    this.initializeNonWeblogicForm();
  }

  initializeWeblogicForm(){
    this.weblogicForm = this.fb.group({
      weblogicParamDetails: this.fb.array([this.initWeblogicParamDetails()])
    });
  }

  initializeNonWeblogicForm() {
    this.nonWeblogicForm = this.fb.group({
      nonWeblogicParamDetails: this.fb.array([this.initNonWeblogicParamDetails()])
    });
  }

  change(val:String) {
    if(val == "Weblogic Parameters") {
      this.weblogicFlag = true;
      this.initializeNonWeblogicForm();
    } else {
      this.weblogicFlag = false;
      this.initializeWeblogicForm();
    }
    this.selection = val;
    this.submitFlag = false;
  }

  delete(idx: number) {
    console.log(idx);
    if(this.selection == "Weblogic Parameters") {
      this.weblogicParamDetails.removeAt(idx);
    } else {
      this.nonWeblogicParamDetails.removeAt(idx);
    }
  }
  

}
