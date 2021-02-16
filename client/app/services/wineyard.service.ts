import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';

// RxJS
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// service
import { MessageService }           from './message.service';

// model
import { Wineyard }     from '../models/wineyard/wineyard.model';

// mock
import { WINEYARDS }    from '../mocks/wineyard/wineyard.mock';

@Injectable()
export class WineyardService {
    
    private wineyardUrl = 'api/wineyard/';
    
    constructor(private messageService:MessageService, private http:Http) { }

    // Asynchronous promise version
    getWineyards(): Promise<Wineyard[]> {
        // Promise resolved with mock wineyards is returned.
        return Promise.resolve(WINEYARDS);

//        // Promise resolved with http wineyards is returned.
//        return this.http.get(this.wineyardsUrl)
//            .toPromise()
//            .then(response => response.json().data as Wineyard[])
//            .catch(this.handleError);
    }
    
    getWineyardsSlowly(): Promise<Wineyard[]> {
        return new Promise(resolve => {
            // Simulate server latency with 5 second delay.
            setTimeout(() => resolve(this.getWineyards()), 5000);
        });
    }
    
    private handleError(error: Response | any): Promise<any> {
        // For demo purposes only.
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

