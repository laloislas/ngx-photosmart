
import { NgxVideoPlayerComponent } from "../../Components/ngx-video-player/ngx-video-player.component";
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core';
import html2canvas from 'html2canvas';
@Component({
    selector: 'face-recognizer',
    standalone: true,
    templateUrl: './face-recognizer.component.html',
    styleUrl: './face-recognizer.component.scss',
    imports: [NgxVideoPlayerComponent]
})
export class FaceRecognizerComponent {
    @Output() photo = new EventEmitter<any>();
    @Output() endProcess = new EventEmitter<any>();
    @Input() width: number = 400;
    @Input() time: number = 3;
    @Input() actionSection: boolean = true;

    @Input() height: number = 400;

    public instruction: string = 'Ingresar';
    public currentStream: any;
    public dimentions: any;
    public capturedImage: any;
    public step = 1;
    public cameraAllow: boolean = true; //El usuario permitio usar camara
    public scoreFace: boolean = false; //Se encontro un rostro alineado

    //Variables de contador
    public counter = 3; //Contador para tomar foto
    private conteo: any;
    private counting: boolean = false;

    constructor(private rendered2: Renderer2) { }

    ngOnInit(): void {

        this.checkMediaSource();
    }

    ngOnChanges() {
        //this.getSizeCam(this.containerClass);
        this.counter = this.time;
    }

    ngOnDestroy(): void {

        //Apagamos la camara
        this.currentStream.getTracks().forEach((track: any) => {
            if (track.readyState == 'live' && track.kind === 'video') {
                track.stop();
            }
        });;
    }

    public onChangeStep(goPage: number) {
        this.step = goPage;
    }


    private checkMediaSource = () => {
        if (navigator && navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: true,
                })
                .then((stream: any) => {
                    this.currentStream = stream;
                    this.cameraAllow = true;
                })
                .catch(() => {
                    this.cameraAllow = false;
                    this.instruction = 'El usuario no permitio usar la camara';
                });
        } else {
            this.cameraAllow = false;
            this.instruction = 'El usuario no cuenta con camara';
        }
    };

    private getSizeCam = (container: string) => {
        const elementCam: HTMLElement = document.querySelector('.' + container)!;
        const { width, height } = elementCam.getBoundingClientRect();
        console.log(width, height);
        this.dimentions = { width, height };
    };

    public getPhoto(data: any) {
        //console.log(data);
    }

    public foundFace(data: any) {
        this.scoreFace = data;
        if (this.scoreFace) {
            this.startCounter();
        } else {
            this.resetCounter();
        }
    }

    private takePicture() {
        const element: HTMLElement = document.querySelector('.videoCheck__container__video')!;
        const elementCounter: HTMLElement = document.querySelector('.videoCheck__cointainer__conunter')!;

        this.rendered2.setStyle(element, 'border', 'none');
        this.rendered2.setStyle(element, 'border-radius', '0');
        this.rendered2.setStyle(elementCounter, 'border-radius', '0');

        if (!this.capturedImage) {
            html2canvas(element).then((canvas: any) => {
                this.capturedImage = canvas.toDataURL();
                //console.log(this.capturedImage)
                if (!this.actionSection) {
                    this.photo.emit(this.capturedImage);
                }
            });
        }

    }

    private startCounter() {
        if (!this.counting && !this.capturedImage) {
            this.counting = true;
            this.conteo = setInterval(() => {
                if (this.counter <= 1) {
                    this.stopCounter();
                }
                this.counter--;
            }, 1000);
        }
    }

    private stopCounter() {
        clearInterval(this.conteo);
        this.takePicture();
    }

    private resetCounter() {
        clearInterval(this.conteo);
        this.counting = false;
        this.counter = this.time;

    }

    public reintentCapture() {
        this.capturedImage = null;
        this.counting = false;
        this.counter = this.time;
        const elementCounter: HTMLElement = document.querySelector('.videoCheck__container__video')!;
        this.rendered2.setStyle(elementCounter, 'border-radius', '50%');
    }

    public saveCapture() {
        //this.photo.emit(this.capturedImage);

        this.endProcess.emit({ name: 'FACE', status: true });
    }


}
