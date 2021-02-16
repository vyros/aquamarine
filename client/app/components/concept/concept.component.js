"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
// services
var message_service_1 = require("../../services/message.service");
var ConceptComponent = (function () {
    function ConceptComponent(messageService) {
        this.messageService = messageService;
        this.h2 = 'Concept';
    }
    ConceptComponent.prototype.ngOnInit = function () {
        this.messageService.clrMessages();
    };
    // doesn't work
    ConceptComponent.prototype.ngAfterViewInit = function () {
        var angle = 0;
        function galleryspin(sign) {
            var spinner = document.querySelector("#spinner");
            if (!sign) {
                angle = angle + 45;
            }
            else {
                angle = angle - 45;
            }
            spinner.setAttribute("style", "-webkit-transform: rotateY(" + angle + "deg); -moz-transform: rotateY(" + angle + "deg); transform: rotateY(" + angle + "deg);");
        }
    };
    return ConceptComponent;
}());
ConceptComponent = __decorate([
    core_1.Component({
        selector: 'concept',
        templateUrl: './concept.component.html',
        styleUrls: ['./carousel.css']
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], ConceptComponent);
exports.ConceptComponent = ConceptComponent;
//# sourceMappingURL=concept.component.js.map