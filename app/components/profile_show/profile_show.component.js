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
var core_1 = require('@angular/core');
var auth_service_1 = require('../../services/auth0/auth.service');
var ProfileShow = (function () {
    function ProfileShow(auth) {
        this.auth = auth;
    }
    ProfileShow.prototype.linkAccount = function () {
        this.auth.linkAccount();
    };
    ProfileShow.prototype.unLinkAccount = function (identity) {
        this.auth.unLinkAccount(identity);
    };
    ProfileShow.prototype.linkedAccounts = function () {
        var _this = this;
        return this.auth.userProfile.identities.filter(function (identity) {
            return _this.auth.userProfile.user_id != identity.provider + '|' + identity.user_id;
        });
    };
    ProfileShow = __decorate([
        core_1.Component({
            selector: 'profile_show',
            templateUrl: './app/components/profile_show/profile_show.template.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], ProfileShow);
    return ProfileShow;
}());
exports.ProfileShow = ProfileShow;
;
//# sourceMappingURL=profile_show.component.js.map