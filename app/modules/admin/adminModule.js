angular.module('spBlogger.admin',['spBlogger.admin.controllers','spBlogger.admin.services','spBlogger.admin.filters']); 

angular.module('spBlogger.admin').config(['$stateProvider',function($stateProvider){
	$stateProvider.state('admin',{ // route definition object
		url:'/admin',
		abstract:true,  // cant be loaded directly, only loaded when one of the children are loaded
		controller:'AdminController',
		  resolve:{  // has to be resolved for controller to fire
            user:['authService','$q',function(authService,$q){
                return authService.user || $q.reject({unAuthorized:true});
            }]
        },
		templateUrl:'modules/admin/views/admin-home.html'
	}).state('admin.postNew',{
		url:'/posts/new',
		controller: 'PostCreationController',
		templateUrl: 'modules/admin/views/admin-new-post.html'
	}).state('admin.postUpdate',{
		url:'/posts/:id/edit',
		controller: 'PostUpdateController',
		templateUrl: 'modules/admin/views/admin-update-post.html'
	}).state('admin.postViewAll',{
		url:'',  // default state
		controller: 'PostListController',
		templateUrl: 'modules/admin/views/admin-all-posts.html'
	}).state('login',{
		url:'/login',
		controller:'LoginController', resolve:{
            user:['authService','$q',function(authService,$q){
                if(authService.user){
                    return $q.reject({authorized:true});
                }
            }]
        },
		templateUrl:'modules/admin/views/login.html'
	});
}]).run(['$rootScope','$state','$cookieStore','authService',function($rootScope,$state,$cookieStore,authService){

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

        if(error.unAuthorized) {
            $state.go('login');
        }
        else if(error.authorized){
            $state.go('admin.postViewAll');
        }
    });

    authService.user=$cookieStore.get('user');

}]);;
