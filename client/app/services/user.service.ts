import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';

// RxJS
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// service
import { MessageService }           from './message.service';

// model
import { User }                     from '../models/user/user.model';

@Injectable()
export class UserService {
    
    private userUrl = 'api/user/';

    constructor(private messageService:MessageService, private http:Http) { }
    
    isUsernameExists(username) {
        var object = { 'username': username }
        var headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'isUsernameExists', JSON.stringify(object), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    isEmailExists(email) {
        var object = { 'email': email }
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'isEmailExists', JSON.stringify(object), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }

    isFakeDomain(email) {
        var object = { 'email': email }
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'isFakeDomain', JSON.stringify(object), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }

    getForgottenUser(email) {
        var object = { 'email': email }
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'getForgottenUser', JSON.stringify(object), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }

    getValidatedUser(id, token) {
        var object = { 'id': id, 'token': token }
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'getValidatedUser', JSON.stringify(object), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    getResetUser(id, token) {
        var object = { 'id': id, 'token': token }
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'getResetUser', JSON.stringify(object), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }

    setReset(user): Observable<any> {
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .put(this.userUrl + 'reset', JSON.stringify(user), {headers: headers})
                .map(res => res.json());
//                .catch(this.handleError);
    }

    setEmailRetriever(email): Observable<any> {
        var object = { 'email': email }
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'setEmailRetriever', JSON.stringify(object), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    create(user) {
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl, JSON.stringify(user), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }

    update(user) {
        var headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        return this.http
                .put(this.userUrl, JSON.stringify(user), {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    delete(user) {
        return this.http
                .delete(this.userUrl)
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    profile(formData) {
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.userUrl + 'profile', formData, {headers: headers})
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    private handleError(error: Response | any): Observable<any> {
        // For demo purposes only.
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}


