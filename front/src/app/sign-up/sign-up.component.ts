import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './../_services/users.service';
import { appUserDTO,BusinessDTO } from './../_models/appUserDTO';
import { AccountService } from './../_services/account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget | null;
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signup:appUserDTO;
  public business:BusinessDTO;
  currentUserId;
  currentUserType
  photoFile:File
  fileToUpload: ImageSnippet;
  fileName: any;
  imageUrl: string | ArrayBuffer;
  @ViewChild('fileInput') fileInput;
private file: File;
public uploading = false;
public staged = false;
  constructor(private userService:UsersService,public accountService:AccountService,public router:Router) { 
    this.signup={
      email:"",
      password:"",
      userType:"",
      firstName:"",
      lastName:"",
      contact:"",
      address:"",
      photoPath:"",
      business:{
        name:"",
        logoPath:"",
        description:"",
        email:"",
        address:"",
        contact:""
      },
      servicedByUser:""
    }
  }
  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  });
  imgFile:string;

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      res=>{
        this.currentUserId=res.user?.['_id'];
        this.currentUserType=res.user?.['userType']
      }
    )
  }
  
  public stageFile(): void {
    this.staged = true;
    this.file = this.fileInput.nativeElement.files[0];
    // console.log(this.file)
}

public fileUpload():void {
    this.uploading = true;
    this.staged = false;
    this.uploading = false;
}
  createUser(){ 
    this.signup.photoPath=""
    this.signup.servicedByUser=this.currentUserId
    if(this.currentUserType=="DA"){
      this.signup.userType="CA"
    }
    else{
      this.signup.userType="DA"
    }
    // console.log(this.signup);
      if (this.file != null) 
        this.userService.createUser(this.signup,this.file).subscribe(
          res=>{
            // console.log("File and Data Uploaded...")
            this.router.navigate(['/dashboard'])
          },
          err=>{
            console.log(err)
          }
        )
}

}
