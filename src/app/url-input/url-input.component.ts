import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent {
  url: string = '';

  constructor(private http: HttpClient) { }

  submit() {
    console.log(this.url);

    this.http.post('http://localhost:8080/qrcode/generate', { url: this.url }, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        // Create an Image object and set its src to the blob URL
        const img = new Image();
        img.src = URL.createObjectURL(data);

        // Get a reference to the DOM element where you want to display the image
        const imgContainer = document.getElementById('image-container');

        // Append the image to the DOM element
        imgContainer!.appendChild(img);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
