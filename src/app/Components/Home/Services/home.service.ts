import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

    private STATIC_API_URL = "https://raw.githubusercontent.com/tsopenteam/gundem/master/gundem.json";

    constructor(
        private _http: Http
    ) {

    }

    public GetAllData() {
        return this._http.get(this.STATIC_API_URL).map(x => x.json());
    }

}