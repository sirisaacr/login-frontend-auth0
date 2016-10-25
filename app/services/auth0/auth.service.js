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
var angular2_jwt_1 = require('angular2-jwt');
var angular2_jwt_2 = require('angular2-jwt');
var router_1 = require('@angular/router');
var auth_config_1 = require('./auth.config');
require('rxjs/add/operator/map');
var Auth = (function () {
    function Auth(authHttp, router) {
        var _this = this;
        this.authHttp = authHttp;
        this.router = router;
        // Configure Auth0Lock
        this.lock = new Auth0Lock(auth_config_1.myConfig.clientID, auth_config_1.myConfig.domain);
        this.lockLink = new Auth0Lock(auth_config_1.myConfig.clientID, auth_config_1.myConfig.domain, {
            auth: { params: { state: "linking" } },
            allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
            languageDictionary: {
                title: "Link with:"
            }
        });
        // Set userProfile attribute if already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", function (authResult) {
            // Every lock instance listen to the same event, so we have to check if
            // it's not the linking login here.
            if (authResult.state != "linking") {
                localStorage.setItem('id_token', authResult.idToken);
                _this.fetchProfile(authResult.idToken);
            }
        });
        // Add callback for lockLink `authenticated` event
        this.lockLink.on("authenticated", function (authResult) {
            // Every lock instance listen to the same event, so we have to check if
            // it's the linking login here.
            if (authResult.state == "linking") {
                // If it's the linking login, then do the link through the API.
                _this.doLinkAccounts(authResult.idToken);
            }
        });
    }
    ;
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    ;
    Auth.prototype.linkAccount = function () {
        this.lockLink.show();
    };
    Auth.prototype.doLinkAccounts = function (accountToLinkJWT) {
        var _this = this;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        var data = JSON.stringify({
            link_with: accountToLinkJWT
        });
        this.authHttp
            .post('https://' + auth_config_1.myConfig.domain + '/api/v2/users/' + this.userProfile.user_id + '/identities', data, { headers: headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            console.log("accounts linked");
            _this.fetchProfile(localStorage.getItem('id_token'));
            _this.router.navigate(['/profile']);
        }, function (error) { return alert(error.json().message); });
    };
    Auth.prototype.unLinkAccount = function (identity) {
        var _this = this;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        this.authHttp
            .delete('https://' + auth_config_1.myConfig.domain + '/api/v2/users/' + this.userProfile.user_id + '/identities/' + identity.provider + "/" + identity.user_id, { headers: headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            console.log("unlinked account");
            _this.fetchProfile(localStorage.getItem('id_token'));
            _this.router.navigate(['/profile']);
        }, function (error) { return alert(error.json().message); });
    };
    Auth.prototype.linkedAccounts = function () {
        var _this = this;
        return this.userProfile.identities.filter(function (identity) {
            return _this.userProfile.user_id != identity.provider + '|' + identity.user_id;
        });
    };
    Auth.prototype.fetchProfile = function (token) {
        var _this = this;
        this.userProfile = null;
        // Fetch profile information
        this.lock.getProfile(token, function (error, profile) {
            if (error) {
                // Handle error
                alert(error);
                return;
            }
            profile.user_metadata = profile.user_metadata || {};
            localStorage.setItem('profile', JSON.stringify(profile));
            _this.userProfile = profile;
        });
    };
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return angular2_jwt_1.tokenNotExpired();
    };
    ;
    Auth.prototype.logout = function () {
        // Remove token and profile from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = null;
    };
    ;
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_2.AuthHttp, router_1.Router])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map