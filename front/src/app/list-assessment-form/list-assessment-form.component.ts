import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AssessmentFormTemplateService } from '../_services/assessment-form.service';
import { AssessmentFormDTO, SectionDTO, UserAssessmentFormDTO, QuestionAnswerDTO, QuestionType } from './../_models/assessmentFormDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAssessmentFormService } from './../_services/user-assessment-form.service';

@Component({
  selector: 'app-list-assessment-form',
  templateUrl: './list-assessment-form.component.html',
  styleUrls: ['./list-assessment-form.component.css']
})
export class ListAssessmentFormComponent implements OnInit {
  assForm
  clientId:string
  template:AssessmentFormDTO
  sections:SectionDTO
  questions:QuestionAnswerDTO
  userAssessmentForm:UserAssessmentFormDTO

  constructor(private afService:AssessmentFormTemplateService,
    public accountService:AccountService,public route:ActivatedRoute,public userAssessmentService:UserAssessmentFormService,public router:Router) {
      this.userAssessmentForm={_id:null,fkUserId:"",assessmentForm:this.template,isValid:false}

      this.template={_id:null, templateName:"", description:"",isActive:true, sections: []};

       this.sections = {name:"Section", description:"", isHidden:false, order: this.template.sections.length+1,questions:[]};

       this.questions={name:"Question", answer: [], helpText:"",isRequired:true,questionType:QuestionType.ShortAnswer,choices:[]};
     }

  ngOnInit(): void {
    this.clientId=this.route.snapshot.paramMap.get('userId')
    this.afService.getTemplates().subscribe(
      res=>{
        this.assForm=res
      },
      err=>console.log(err)
    )
  }

  addAssessmentToUser(assId){
      this.afService.getTemplateById(assId).subscribe(
        res=>{
          this.template=res
          this.userAssessmentForm.assessmentForm=this.template
          console.log(this.userAssessmentForm.assessmentForm)
          console.log(this.clientId)
          this.userAssessmentForm.fkUserId=this.clientId
          console.log(this.userAssessmentForm)
          this.userAssessmentService.addUserAssessmentForm(this.userAssessmentForm).subscribe(
           res=>{
          console.log(res)
          alert("Assesment Form Added to selected User")
          this.router.navigate(['/dashboard'])
        },
        err=>console.log(err)
      )
        },
        err=>console.log(err)
      )
      
  }

}
