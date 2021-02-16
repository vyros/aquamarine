import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';

// RxJS
import { Subject }                  from 'rxjs/Subject';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// service
import { MessageService }           from './message.service';

// model
import { User }                     from '../models/user/user.model';
//import { USER }                     from '../mocks/user.mock'; //testing

@Injectable()
export class AuthService {
    
    private authUrl     = 'auth/user/';
    private passwordUrl = 'auth/password/';
    private signinUrl   = 'auth/signin/';
    private signoutUrl  = 'auth/signout/';
    
    // observable user source
    private userSource = new Subject<User>();

    // observable user stream
    user$ = this.userSource.asObservable();
    
    constructor(private messageService:MessageService, private http:Http) { }

    getAuthUser(): Observable<User> {
        return this.http
                .get(this.authUrl)
                .map(res => res.json())
                .catch(this.handleError);
    }

    setAuthUser(user) {
        this.userSource.next(user);
    }
    
    // danger, all in req.user
    clrAuthUser() {
        this.userSource.next();
    }
    
    isCurrentPassword(username, password): Observable<any> {
        var object = {
            'username': username,
            'password': password
        }
        var headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.passwordUrl, JSON.stringify(object), {headers: headers})
                .map(res => res.json());
    }
    
    getSigninUser(username, password): Observable<any> {
        var object = {
            'username': username,
            'password': password
        }
        var headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.signinUrl, JSON.stringify(object), {headers: headers})
                .map(res => res.json());
//                .catch(this.handleError);
    }
    
    getSignoutUser(): Observable<any> {
        return this.http
                .get(this.signoutUrl)
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    // client error handler
    private handleError(error: Response | any): Observable<any> {
        // For demo purposes only.
        console.error('An error occurred', error);
//        return Observable.throw(error.message || error);
        return new Observable();
    }
    
//TODO
//    // client error handler
//    private handleError(err) {
//        var error = JSON.parse(err._body);
//        console.log(error.msg);
//        this.messageService.addError(error.msg);
//    }
}



