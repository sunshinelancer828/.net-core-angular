import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../constants/app-config';
import { AssessmentFormDTO } from '../_models/assessmentFormDTO';

@Injectable({
  providedIn: 'root'
})
export class AssessmentFormTemplateService {
  baseUrl = AppConfig.URL_AppServices;

  constructor(private http: HttpClient) { }

  getTemplates() {
    return this.http.get(this.baseUrl + "AssessmentFormTemplate/GetTemplates").pipe(
      map((response: AssessmentFormDTO[]) => {
        return response;
      })
    );
  }
  addTemplate(formData) {
    const headers={
      'content-type':'application/json'
    }
    return this.http.post(this.baseUrl + "AssessmentFormTemplate/CreateTemplate", formData,{headers:headers}).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getTemplateById(id) {
    return this.http.get(this.baseUrl + `AssessmentFormTemplate/GetTemplateById?templateId=${id}`).pipe(
      map((response:any) => {
        return response;
      })
    );
  }
  updateTemplate(id, formData) {
    return this.http.post(this.baseUrl + `AssessmentFormTemplate/UpdateTemplate?id=${id}`, formData).pipe(
      map((response: AssessmentFormDTO) => {
        return response;
      })
    );
  }

}

