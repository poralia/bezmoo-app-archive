import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraPreview, CameraPreviewFlashMode, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { BarcodeFormat, BarcodeScanner, ReadBarcodesFromImageOptions } from '@capacitor-mlkit/barcode-scanning';
import { DeleteFileOptions, Directory, Filesystem, MkdirOptions, WriteFileOptions } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-customer-scanner',
  templateUrl: './customer-scanner.component.html',
  styleUrls: ['./customer-scanner.component.scss'],
})
export class CustomerScannerComponent  implements OnInit {

  @Input('height') height: number = 0;
  
  @Output() onCameraOpened: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  private win: any = window;

  public cameraOn: boolean = false;
  public scanResult: any;
  public hasResult: boolean = false;
  public marginTop: number = 0;
  public fileUri: string = '';

  constructor(
    private platform: Platform,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() { }

  ngAfterViewInit() {
    this.marginTop = this.platform.height() / 2;
  }

  sanitizedFileUri(fileUri: string) {
    return this.win.Ionic.WebView.convertFileSrc(this.fileUri);
  }

  async saveAsFile(base64: any) {
    const fileName = 'bezmoo-scanner-' + (new Date().getTime()).toString(16);
    const filePath = `barcode/${fileName}.jpg`;

    const options: WriteFileOptions = {
      path: filePath,
      data: base64,
      recursive: true,
      directory: Directory.Cache,
    }

    try {
      const mkdirOptins: MkdirOptions = {
        path: 'barcode',
        directory: Directory.Cache,
        recursive: true,
      }
      const dir = await Filesystem.mkdir(mkdirOptins);

      console.log(dir, 'DIR');
    }
    catch (e) {
      console.log(e);
    }

    const { uri } = await Filesystem.writeFile(options);
    console.log(uri);
    this.fileUri = uri;
    this.scanBarcode(uri, filePath);
  }

  b64toBlob(b64Data: any, contentType: any) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  async scanBarcode(fileUri: any, filePath: string) {
    const options: ReadBarcodesFromImageOptions = {
      path: fileUri,
      formats: [BarcodeFormat.QrCode],
    }
    const { barcodes } = await BarcodeScanner.readBarcodesFromImage(options);
    console.log(barcodes);
    
    if (barcodes.length > 0) {
      this.hasResult = true;
      this.scanResult = barcodes;
      this.result.emit(this.scanResult);

      // stop camera
      await CameraPreview.stop();
    }

    // delete file
    const deleteOptions: DeleteFileOptions = {
      path: filePath,
      directory: Directory.Cache,
    }

    try {
      const deleted = await Filesystem.deleteFile(deleteOptions);
      console.log('deleted', deleted);
    }
    catch (e) {
      console.log(e);
    }
  }

  async start() {
    this.hasResult = false;
    this.scanResult = '';

    const width: number = this.platform.width();

    if (this.height === 0) {
      this.height = this.platform.height() / 2;
    }

    const options: CameraPreviewOptions = {
      parent: 'cameraPreview',
      toBack: true,
      width: width,
      height: this.height,
      enableZoom: true,
      enableHighResolution: false,
    }

    CameraPreview.start(options).then(async () => {
      console.log('Camera preview started');
      this.cameraOn = true;
      this.onCameraOpened.emit(this.cameraOn);
    
      let interval = setInterval(async () => {
        if (this.hasResult) {
          clearInterval(interval);
        } else {
          const captureOptions: CameraPreviewPictureOptions = {
            quality: 50,
          }
  
          const result = await CameraPreview.captureSample(captureOptions);
          const value = result.value;
  
          this.saveAsFile(value);
        }
      }, 500);
    });
  }

  async stop() {
    await CameraPreview.stop();

    this.hasResult = false;
    this.scanResult = '';
  }

  async reset() {
    await this.stop();
    await this.start();
  }

  async turnOnFlashlight() {
    const flashModes = await CameraPreview.getSupportedFlashModes();
    const supportedFlashModes: CameraPreviewFlashMode[] = flashModes.result;
    
    const cameraPreviewFlashMode: CameraPreviewFlashMode = 'torch';
    await CameraPreview.setFlashMode({ flashMode: cameraPreviewFlashMode });
  }

  async turnOffFlashlight() {
    const cameraPreviewFlashMode: CameraPreviewFlashMode = 'off';
    await CameraPreview.setFlashMode({ flashMode: cameraPreviewFlashMode });
  }

  ngOnDestroy() {
    this.stop();
  }

}
