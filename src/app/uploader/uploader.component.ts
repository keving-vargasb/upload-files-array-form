import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {

  productForm: FormArray = this.formBuilder.array([]);

  constructor(private formBuilder: FormBuilder) { 
    this.addProductToForm()
  }

  addProductToForm() {
    this.productForm.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        main_image: ['', Validators.required],
        photos: this.formBuilder.array([])
      })
    )
  }

    mainImageOnChange(event, index) {
     
      let file = event.target.files[0];
      
      if (file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(file)
          this.productForm.controls[index]["controls"]["main_image"].setValue({
            file,
            url: e.target.result
          })
        }
        reader.readAsDataURL(file);
      }
    }

    detectFiles(event, index) {
      let files = event.target.files;
      if (files) {
          for (let file of files) {
              let reader = new FileReader();
              reader.onload = (e: any) => {
                this.productForm.controls[index]["controls"]["photos"].push(this.createItem({
                      file,
                      url: e.target.result  //Base64 string for preview image
                  }));
              }
              reader.readAsDataURL(file);
          }
      }
   }

   createItem(data): FormGroup {
    return this.formBuilder.group(data);
   }

   submit() {
     console.log(this.productForm.value)
   }


}
