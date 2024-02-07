import { Injectable, EventEmitter } from '@angular/core';
import * as faceapi from 'face-api.js';
@Injectable({
  providedIn: 'root'
})
export class FaceApiService {

  public globalFace: any;
  private modelsForLoad = [
    faceapi.nets.ssdMobilenetv1.loadFromUri('./../assets/Models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./../assets/Models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./../assets/Models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./../assets/Models'),
  ];

  cbModels: EventEmitter<any> = new EventEmitter<any>();

  public loadModels() {
    Promise.all(this.modelsForLoad).then((res: any) => {
      this.cbModels.emit(true);
    });
  }

  constructor() {
    this.globalFace = faceapi;
    this.loadModels();
  }
}
