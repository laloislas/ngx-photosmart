import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaceRecognizerComponent } from "./Modules/FaceScan/Page/face-recognizer/face-recognizer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FaceRecognizerComponent]
})
export class AppComponent {
  title = 'ngxPhotosmart';
}
