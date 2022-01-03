import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssessmentFormDTO, SectionDTO, QuestionAnswerDTO, QuestionType } from '../_models/assessmentFormDTO';
import { AccountService } from '../_services/account.service';
import { AssessmentFormTemplateService } from '../_services/assessment-form.service';
import { SubscriptionService } from '../_services/subscription.service';
import { UsersService } from '../_services/users.service';
@Component({
  selector: 'app-add-assessment-form',
  templateUrl: './add-assessment-form.component.html',
  styleUrls: ['./add-assessment-form.component.css']
})
export class AddAssessmentFormComponent implements OnInit {
  template: AssessmentFormDTO;
  tempChoice:string;
  tempHidden:string
  fileBLOB: any
  question_Type = [
    { value: 'ShortAnswer', viewValue: 'ShortAnswer' },
    { value: 'Paragraph', viewValue: 'Paragraph' },
    { value: 'MultipleChoice', viewValue: 'MultipleChoice' },
    { value: 'Checkboxes', viewValue: 'Checkboxes' },
    { value: 'Dropdown', viewValue: 'Dropdown' },
    { value: 'FileUpload', viewValue: 'FileUpload' },
    { value: 'Date', viewValue: 'Date' },
    { value: 'Time', viewValue: 'Time' }
  ];
  tempId
  constructor(public accountService: AccountService, public userService: UsersService, public subService: SubscriptionService,
    public route: ActivatedRoute, public router: Router, public assessmentService: AssessmentFormTemplateService, public toastr: ToastrService) {
    this.template={_id:null, templateName:"", description:"",isActive:true, sections: []};
  }

  ngOnInit(): void {
    this.tempId=this.route.snapshot.paramMap.get('eaid')
    if(this.tempId){
      this.assessmentService.getTemplateById(this.tempId).subscribe(
        res=>{
          this.template=res
        },
        err=>console.log(err)
      )
    }
  }
  addSection(): void {
    let section:SectionDTO = {name:"Section", description:"", isHidden:false, order: this.template.sections.length+1,questions:[]};
    this.template.sections.push(section);
  }
  addQuestion(sectionIndex): void {
    let question:QuestionAnswerDTO={name:"Question", answer: null,helpText:"",isRequired:true,questionType:QuestionType.ShortAnswer,choices:[]};
    this.template.sections[sectionIndex].questions.push(question);
  }
  removeSections(index) {
    this.template.sections.splice(index,1)
  }
  removeQuestion(sectionIndex,questionIndex){
    this.template.sections[sectionIndex].questions.splice(questionIndex,1)
  }
  addChoice(sectionIndex,questionIndex) {
    this.template.sections[sectionIndex].questions[questionIndex].choices.push(this.tempChoice);
    this.tempChoice = "";
  }
  showMultipleOptions(questionType)
  {
    let showOptions = false;
    switch(questionType){
      case "MultipleChoice":
      case "Checkboxes":
      case "Dropdown":
        showOptions = true;
        break;
      default:
        showOptions = false;
        break;
    }
    return showOptions;
  }
  removeChoice(sectionIndex,questionIndex,index){
    this.template.sections[sectionIndex].questions[questionIndex].choices.splice(index,1)
  }
  addTemplate() {
    if(this.tempId){
      this.assessmentService.updateTemplate(this.tempId,this.template).subscribe(
        res=>{
          console.log(res)
        },
        err=>console.log(err)
      )
    }
    else{
      this.assessmentService.addTemplate(this.template).subscribe(
        res=>{
          console.log(res)
        },
        err=>console.log(err)
      )
    }
  }
}
 