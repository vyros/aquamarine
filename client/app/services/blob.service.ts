import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';

// RxJS
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// model
import { Blob }                     from '../models/blob/blob.model';

@Injectable()
export class BlobService {
    
    private blobUrl = 'api/blob/';
    
    constructor(private http:Http) {
        console.log('Blob Service initialized...');
    }

    // Asynchronous observable version
    getBlobs(): Observable<Blob[]> {
        return this.http
                .get(this.blobUrl)
                .map(res => res.json())
                .catch(this.handleError);
    }

    addBlob(newBlob) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.blobUrl, JSON.stringify(newBlob), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }

    deleteBlob(id) {
        return this.http
                .delete(this.blobUrl + id)
                .map(res => res.json())
                .catch(this.handleError);
    }

    updateLoved(blob) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
                .put(this.blobUrl + blob._id, JSON.stringify(blob), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    private handleError(error: Response | any): Observable<any> {
        // For demo purposes only.
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}


