import { Component, OnInit }    from '@angular/core';
import * as CryptoJS            from 'crypto-js/';

// services
import { MessageService }       from '../../services/message.service';

@Component({
    selector: 'crypto',
    templateUrl: './crypto.component.html',
})

export class CryptoComponent implements OnInit {
    
    h2: String = 'Crypto';
    message: String = 'Message a crypter';
    hashContext: String = '';
    hashHex: String = '';
    hashBase64: String = '';
    hashLatin1: String = '';
    
    progressive1: String = '';
    progressive2: String = '';
    progressive3: String = '';
    progressiveFinale: String = '';
    
    constructor(private messageService:MessageService) { }
        
    ngOnInit() {
        this.messageService.clrMessages();
    }
    
    doHash(event) {
        event.preventDefault();
        let CryptoJS = require("crypto-js");
        let hash = CryptoJS.SHA256(this.message);
        this.hashContext = hash;
        this.hashHex = hash.toString(CryptoJS.enc.Hex);
        this.hashBase64 = hash.toString(CryptoJS.enc.Base64);
        this.hashLatin1 = hash.toString(CryptoJS.enc.Latin1);
    }
    
    doProgressive(event) {
        event.preventDefault();
        let CryptoJS = require("crypto-js");
        let sha256 = CryptoJS.algo.SHA256.create();
        this.progressive1 = sha256.update(this.message + ' part 1');
        console.log(this.progressive1);
        this.progressive2 = sha256.update(this.message + ' part 2');
        console.log(this.progressive2);
        this.progressive3 = sha256.update(this.message + ' part 3');
        console.log(this.progressive3);
        this.progressiveFinale = sha256.finalize();
    }
}
