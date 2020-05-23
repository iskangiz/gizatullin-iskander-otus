import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiKey = 'trnsl.1.1.20200519T153249Z.9b2b1b9ea2fc8451.0ee9894a3c195ffccf095558470650ca90f1f935';
  private apiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

  constructor(private http: HttpClient) {
  }

  translate(langFrom: string, langTo: string, text: string) {
    let params = new HttpParams();
    params = params.append('key', this.apiKey);
    params = params.append('lang', `${langFrom}-${langTo}`);
    params = params.append('text', text);
    return this.http.get(this.apiUrl, {params});
  }
}
