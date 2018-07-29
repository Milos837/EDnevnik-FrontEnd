import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css']
})
export class AdminLogComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  download() {
    const filename = 'logs.txt';

    this.fileService.downloadLogs(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

}
