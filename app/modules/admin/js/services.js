'use strict'

angular.module('spBlogger.admin.services', []).factory('Post',['$resource','API_ENDPOINT',function($resource,API_ENDPOINT){
    return $resource(API_ENDPOINT, { id: '@_id' }, { // use $resource service for simplified $http to rest server CRUD operations 
        update: {
            method: 'PUT'
        }
    });
}]).service('popupService',['$window',function($window){
    this.showPopup=function(message){
        return $window.confirm(message); //Ask the users if they really want to delete the post entry
    }
}]).factory('authService',['AUTH_ENDPOINT','LOGOUT_ENDPOINT','$http','$cookieStore',function(AUTH_ENDPOINT,LOGOUT_ENDPOINT,$http,$cookieStore){

    var auth={};

    auth.login=function(username,password){
        return $http.post(AUTH_ENDPOINT,{username:username,password:password}).then(function(response,status){
            auth.user=response.data; console.log(auth.user);
            $cookieStore.put('user',auth.user);
            return auth.user;
        });
    }

    auth.logout=function(){
        return $http.post(LOGOUT_ENDPOINT).then(function(response){
            auth.user=undefined;
            $cookieStore.remove('user');
        });
    }

    return auth;

}]);


angular.module('spBlogger.admin.services').value('API_ENDPOINT','http://localhost:8080/api/posts/:id'); // This is our end point
angular.module('spBlogger.admin.services').value('AUTH_ENDPOINT','http://localhost:8080/login');
angular.module('spBlogger.admin.services').value('LOGOUT_ENDPOINT','http://localhost:8080/logout');











