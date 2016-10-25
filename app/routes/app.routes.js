"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('../components/home/home.component');
var profile_routes_1 = require('./profile.routes');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent }
].concat(profile_routes_1.ProfileRoutes, [
    { path: '**', redirectTo: '' }
]);
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map