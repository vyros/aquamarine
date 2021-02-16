//import { Component, ElementRef, 
//    Input, ViewChild }                      from '@angular/core';
import { Component, Input, OnInit }         from '@angular/core';
import { Http, Headers, RequestOptions }    from '@angular/http';

// services
import { MessageService }       from '../../services/message.service';
import { AuthService }          from '../../services/auth.service';
import { UserService }          from '../../services/user.service';

// model
import { User }                 from '../../models/user/user.model';

@Component({
    selector: 'file-upload',
    template: '<input type="file" [multiple]="multiple" [accept]="accept" />'
})

export class FileUploadComponent implements OnInit {
    
    @Input() accept: String = 'image/*';
    @Input() multiple: boolean = false;
    user: User;

    constructor(private messageService:MessageService, 
        private authService:AuthService,
        private userService:UserService, private http:Http) { }

    ngOnInit() {
        this.authService.user$.subscribe(user => this.user = user);
    }

    upload(event) {
        this.messageService.clrMessages();
        let fileList: FileList = event.target.files;
        
        if (fileList.length) {
            let file: File;
            let formData: FormData = new FormData();
            for(let i = 0; i < fileList.length; i++) {
                file = fileList[i];
                formData.append('file', file, file.name);
            }
            
//            this.userService.profile(formData).subscribe(user => {
//                if (user) {
//                    this.messageService.addSuccess('Téléversement réussi');
//                    this.authService.setAuthUser(user);
//                }
//            });
            
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            var options = new RequestOptions({ headers: headers });
            
            this.http
                .post('api/user/profile', formData, { headers: headers }).subscribe(user => {
                    if (user) {
//                        let newUser = new User(user);
                        this.messageService.addSuccess('Téléversement réussi');
//                        this.user = user._body;
                        this.authService.setAuthUser(JSON.parse(user["_data"]));
                    }
                });
        }
    }
}
