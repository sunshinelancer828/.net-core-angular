import { Component, OnInit } from '@angular/core';
import { UserAssessmentFormService } from './../_services/user-assessment-form.service';
import { AssessmentFormTemplateService } from './../_services/assessment-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentFormDTO, UserAssessmentFormDTO, QuestionAnswerDTO, SectionDTO, QuestionType } from './../_models/assessmentFormDTO';
import { UsersService } from './../_services/users.service';
import { AccountService } from './../_services/account.service';

@Component({
  selector: 'app-user-assessment-form',
  templateUrl: './user-assessment-form.component.html',
  styleUrls: ['./user-assessment-form.component.css']
})
export class UserAssessmentFormComponent implements OnInit {
  tempId;
  assessmentForm:UserAssessmentFormDTO;
  template:AssessmentFormDTO
  questions:QuestionAnswerDTO
  sections:SectionDTO
  userId
  constructor(public accountService:AccountService,public userService:UsersService,public userAssFormService:UserAssessmentFormService,public assessmentService:AssessmentFormTemplateService, public route:ActivatedRoute,public router:Router) { 

    this.assessmentForm={_id:null,fkUserId:"",assessmentForm:this.template,isValid:false}
  this.template={_id:null, templateName:"", description:"",isActive:true, sections: []};
   this.sections = {name:"Section", description:"", isHidden:false, order: this.template.sections.length+1,questions:[]};
   this.questions={name:"Question", answer: [], helpText:"",isRequired:true,questionType:QuestionType.ShortAnswer,choices:[]};
  }


  ngOnInit(): void {
    (this.accountService.currentUser$).subscribe(
      res=>this.userId=res?.user['_id']
    )
    console.log(this.userId)
    this.userAssFormService.getUserAssessmentByUserId(this.userId).subscribe(
      res=>{
        console.log(res)
        this.template=res.assessmentForm
      }
    )
  }
  showMultipleOptions(questionType)
  {
    switch(questionType){
      case "MultipleChoice":
        return "MultipleChoice"
      case "Checkboxes":
        return "Checkboxes";
      case "Dropdown":
        return "Dropdown";
      case "Paragraph":
        return "Paragraph";
      case "FileUpload":
        return "FileUpload";
      default:
        return "ShortAnswer";
    }
  }
  addAnswer(i,j,answer){
    // this.assessmentForm.assessmentForm?.sections.forEach((d,i)=>{
    //   d.questions.forEach((e,j)=>{
    //     e.answer.push(answer)
    //   })
    // })
    this.assessmentForm.assessmentForm?.sections[i].questions[j].answer.push(answer)
  }
  addAssessmentForm(){ 
    // this.assessmentForm.assessmentForm?.sections.forEach((d)=>{
    //   d.questions.forEach((e)=>{
    //   e.answer.push(...e.answer)
    //   console.log("answer : "+e.answer)
    //   })
    // }) 
    this.assessmentForm.fkUserId=this.userId;
    console.log(this.assessmentForm.fkUserId) 
    this.assessmentForm.assessmentForm=this.template;
    
    // this.assessmentForm.submittedOn=Date();
    // console.log( this.assessmentForm.submittedOn
    console.log(this.assessmentForm)
    this.userAssFormService.addUserAssessmentForm(this.assessmentForm).subscribe(
      res=>{
        console.log(res)
      },
      err=>console.log(err)
    )
  }

}
