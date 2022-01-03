import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from '../constants/app-config';
import { AccountService } from '../_services/account.service';
import { SubscriptionService } from '../_services/subscription.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  baseUrl = AppConfig.URL_AppServices;
  current_User
  id
  ImgUrl
  @ViewChild('fileInput') fileInput;
  private file: File;
  public uploading = false;
  public staged = false;
  constructor(private sanitizer: DomSanitizer,public router:Router,public userService:UsersService,public subService:SubscriptionService,public accountService:AccountService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    (this.accountService.currentUser$).subscribe(
      res=>{
        this.id=res?.user['_id']
      }
    )

    this.userService.getUserById(this.id).subscribe(
      res=>{
        this.current_User=res;
        // console.log(res);
        // this.ImgUrl = 'data:image/png;base64,' + this.current_User?.photoPath;  
        this.ImgUrl=this.stringSlice(this.current_User.photoPath);
        // console.log(this.ImgUrl)
      }
    )
  }
  // F:\data backup\desktop\AngularMat\UI2\dietowl-api\wwwroot\
  stringSlice(imgURL:string){
    const imagePth=this.baseUrl+imgURL.slice(58);
    return imagePth;
  } 
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }



  public stageFile(): void {
    this.staged = true;
    this.file = this.fileInput.nativeElement.files[0];
    // console.log(this.file)
    if (this.file != null) 
      this.userService.uploadFileById(this.id,this.file).subscribe(
        res=>{
          // console.log("Fil Uploaded...")
          // this.router.navigate(['/myprofile'])
          window.location.reload();
        },
        err=>{
          console.log(err)
        }
      )
}

public fileUpload():void {
    this.uploading = true;
    this.staged = false;
    this.uploading = false;
}

}
