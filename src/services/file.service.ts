import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private authUrl = environment.apiBaseUrl + '/util/';

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  downloadLogs(file: String) {
    const body = { filename: file };

    return this.httpClient.post(this.authUrl + 'download', body, {
      responseType: 'blob',
      headers: this.authService.getHeaders()
    });
  }
}
