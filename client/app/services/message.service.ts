import { Injectable }               from '@angular/core';

// RxJS
import { Subject }                  from 'rxjs/Subject';

@Injectable()
export class MessageService {
    
    // observable source
    private successesSrc = new Subject<String>();
    private errorsSrc = new Subject<String>();
    private infosSrc = new Subject<String>();

    // observable streams
    successes$ = this.successesSrc.asObservable();
    errors$ = this.errorsSrc.asObservable();
    infos$ = this.infosSrc.asObservable();
    
    constructor() { }

    addSuccess(msg) {
        this.successesSrc.next(msg);
    }
    
    clrSuccesses() {
        this.successesSrc.next();
    }

    addError(msg) {
        this.errorsSrc.next(msg);
    }
    
    clrErrors() {
        this.errorsSrc.next();
    }
    
    addInfo(msg) {
        this.infosSrc.next(msg);
    }
        
    clrInfos() {
        this.infosSrc.next();
    }
    
    clrMessages() {
        this.clrSuccesses();
        this.clrErrors();
        this.clrInfos();
    }
}
