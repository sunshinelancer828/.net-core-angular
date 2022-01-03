import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent implements OnInit {
  weights = ["Kg", "Pounds"];
  selectedWeight = "Kg";
  selectedHeight = "Centimeter";
  userWeight = 0;
  userHeight = 0;
  userBMI = null;

  constructor() { }

  ngOnInit(): void {
    window.onload = () => {
      "use strict";
      const button =<HTMLElement> document.querySelector(".info-button");
      const close = <HTMLElement>document.querySelector(".close-button");
      const aside = <HTMLElement>document.querySelector(".aside");
      const main = <HTMLElement>document.querySelector(".main");
      const checkBtn = <HTMLElement>document.querySelector("#check");
      const spinner = <HTMLElement>document.querySelector("#spinner");
      const height = <HTMLInputElement>document.querySelector("#height");
      const weight = <HTMLInputElement>document.querySelector("#weight");
      const smallText = <HTMLElement>document.querySelector(".small-text");
      const bigText = <HTMLElement>document.querySelector(".value");
      let bmi = 0
      var expanded = false;
    
      button.addEventListener("click", handleClick);
      close.addEventListener("click", handleClick);
      checkBtn.addEventListener("click", showLevel);
      height.addEventListener("change", setBMI);
      weight.addEventListener("change", setBMI);
    
      function setBMI() {
        console.log(height.value, weight.value);
        // Calculation: [weight (kg) / height (cm) / height (cm)] x 10,000
        // bmi =
        // Math.round(
        // (+weight.value || 0) * 703 / Math.pow(+height.value || 0, 2) * 100) /
        // 100;
         bmi=Math.round( ((+weight.value || 0)/(+height.value || 0)/(+height.value || 0))*10000)


      }
    
      function handleClick() {
        if (!expanded) {
          main.style.marginLeft = "500px";
          aside.style.left = "0px";
        } else {
          aside.style.left = "-500px";
          main.style.marginLeft = "0";
        }
        expanded = !expanded;
      }
    
      function showLevel() {
        let m = 165 / 75;
        let c = 165 - m * 75;
        let val = bmi;
        if (val < 5) val = 5;
        if (val > 75) val = 75;
        let deg = m * val + c;
        spinner.style.transform = "Rotate(" + deg + "deg)";
    
        let status = showReport(bmi);
        smallText.innerHTML = status;
        bigText.innerHTML = bmi + " bmi";
      }
    
      function showReport(v) {
        let text = "";
        let bmis = {
          "very severly underweight": v <= 15,
          "severly underweight": v > 16 && v <= 16,
          underweight: v > 16 && v <= 18.5,
          "Normal (Healthy Weight)": v > 18.5 && v <= 25,
          Overweight: v > 25 && v <= 30,
          "Obese Class I (Moderately obese)": v > 30 && v <= 35,
          "Obese Class II (Severely obese)": v > 35 && v < 40,
          "Obese Class III (Very severely obese)": v > 40 && v <= 45,
          "Obese Class IV (Morbidly Obese)": v > 45 && v <= 50,
          "Obese Class V (Super Obese)": v > 50 && v <= 60,
          "Obese Class VI (Hyper Obese)": v > 60 };
    
        for (let i in bmis) {
          if (bmis[i]) {
            text += i;
            break;
          }
        }
        return text;
      }
    };
  }

  calculateBMI(): void {
    this.userBMI = 0;
    if(this.userWeight > 0 && this.userHeight > 0){
      const weightMultiplier = this.getWeightMultiplier(this.selectedWeight);
      const heightMultiplier = this.getHeightMultiplier(this.selectedHeight);
      this.userBMI = (this.userWeight*weightMultiplier)/((this.userHeight * heightMultiplier) * (this.userHeight * heightMultiplier));
    }
  }

  getWeightMultiplier(selectedWeight){
    switch(selectedWeight){
      case "Kg":
        return 1;
      case "Pound":
        return 0.453592;
      default:
        return 1;
    }
  }

  getHeightMultiplier(selectedHeight){
    switch(selectedHeight){
      case "Meter":
        return 1;
      case "Feet":
        return 0.3048;
      case "Inches":
        return 0.0254;
      case "Centimeter":
        return 0.01;
      default:
        return 1;
    }
  }
  
//  calculate(height, weight) {
//   weight = parseInt(weight);
//   height = parseInt(height);
//   console.log("Height", height);
//   console.log("Weight", weight);
//   weight = weight * 703;
//   height = height*height;
//   var bmi = weight/height;
//   console.log("BMI: ", bmi);
//   document.getElementById('bmi').innerHTML = bmi.toPrecision(3);
  
//   if(bmi < 18.5)
//     {
//       document.getElementById('range').innerHTML = "Underweight";
//       document.getElementById('range').classList.remove("neutral");
//       document.getElementById('range').classList.remove("good");                 
//       document.getElementById('range').classList.add("bad");
//     }
  
//    if(bmi >= 18.5 && bmi < 25)
//     {
//       document.getElementById('range').innerHTML = "Normal";
//       document.getElementById('range').classList.remove("neutral");
//       document.getElementById('range').classList.remove("bad");                   
//       document.getElementById('range').classList.add("good");
//     }
  
//    if(bmi >= 25 && bmi < 30)
//     {
//       document.getElementById('range').innerHTML = "Overweight";
//       document.getElementById('range').classList.remove("neutral");
//       document.getElementById('range').classList.remove("good");                 
//       document.getElementById('range').classList.add("bad");
//     }
  
//    if(bmi > 30)
//     {
//       document.getElementById('range').innerHTML = "Obese";
//       document.getElementById('range').classList.remove("neutral");
//       document.getElementById('range').classList.remove("good");                 
//       document.getElementById('range').classList.add("bad");
//     }
// };

// clear_calculator(){
//   console.log("Clear");
//   document.getElementById('range').classList.remove("bad");
//   document.getElementById('range').classList.remove("good");
//   document.getElementById('range').classList.add("neutral");
//   document.getElementById('range').innerHTML = "Enter Measurements";
//   document.getElementById('bmi').innerHTML = "--.--";
//   document.getElementById('height_input').nodeValue="";
//   document.getElementById('weight_input').nodeValue="";
//   document.getElementById('height_input').focus();
// };
}
