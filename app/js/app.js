'use strict'

angular.module('spBlogger',['ngResource','ui.router','ngAnimate','pascalprecht.translate','ngCookies','spBlogger.controllers','spBlogger.posts','spBlogger.admin','spBlogger.directives','spBlogger.filters','spBlogger.services']);

angular.module('spBlogger').value('version','V1.0');  // value


angular.module('spBlogger').config(['$translateProvider',function($translateProvider){
$translateProvider.translations('en', {
TITLE: 'The Single Page Blogger',
SUBTITLE: 'One Stop Blogging Solution',
COMMENTS: 'Comments',
BY:'By',
ADD:'Add'
});
$translateProvider.translations('de', {
TITLE: 'Single Page Blogger',
SUBTITLE: 'Die Komplettlösung für Ihr Blog',
COMMENTS: 'Kommentare',
BY:'Von',
ADD:'Hinzufügen'
});
$translateProvider.preferredLanguage('en');

//$httpProvider.defaults.withCredentials = true;

}]);

angular.module('spBlogger').config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])


angular.module('spBlogger').run(['$state','$rootScope','$translate',function($state,$rootScope,$translate){
		$state.go('allPosts');  // first state on entry to the site  // run is run when all modules are loaded
	
		$rootScope.languagePreference={currentLanguage:'en'};
		$rootScope.languagePreference.switchLanguage=function(key){
		$translate.use(key);
		$rootScope.languagePreference.currentLanguage=key;
		}
	
	}]); 
