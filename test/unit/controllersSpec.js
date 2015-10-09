'use strict';

/* jasmine specs for controllers go here */

//describe('PostController Test\n', function(){
	//beforeEach(module('spBlogger.posts.controllers'));
	//beforeEach(module('spBlogger.posts.services'));
	
	//it('Should initialize controller with 4 posts', inject(function($rootScope, $controller, postService){
		//var $scope=$rootScope.$new();
		//$controller('PostController', {$scope:$scope, postService:postService});
		//expect($scope.posts.length).toBe(4);
	//}));
//})

//describe('PostDetailsController Test\n', function(){
	//beforeEach(module('spBlogger.posts.controllers'));
	//beforeEach(module('ui.router'));
	//beforeEach(module('spBlogger.posts.services'));
	
	//it('Should initialize controller with 1 post', inject(function($state,$stateParams,$rootScope,$controller,postService){
		//var $scope=$rootScope.$new();
		//$stateParams.id=2;
		//$controller('PostDetailsController',{$scope:$scope, $stateParams:$stateParams,$state:$state,postService:postService});
		//expect($scope.singlePost).not.toBe(undefined);
	//}));
//});
 
 beforeEach(module('spBlogger.posts.controllers'));
 beforeEach(module('spBlogger.posts.services'));
 beforeEach(module('spBlogger.admin.services'));
 beforeEach(module('ngResource'));
 beforeEach(module('ui.router'));
 
 describe('PostController Test\n', function(){
	 var $httpBackend;
	 
	 beforeEach(inject(function(_$httpBackend_){
					
				$httpBackend = _$httpBackend_; // store fake $httpBackend in a variable
				

				$httpBackend.expectGET('http://localhost:8080/api/posts').respond([{title:'Test',_id:1},
				{title:'Test2',_id:2}]); // respond with 2 post objects
			
	 }));
	 
	 it('Should initialize controller with 2 posts', inject(function($rootScope,$controller,Post){
		 
		 var $scope = $rootScope.$new(); // creat a new scope
		 
		 $controller('PostController',{$scope:$scope,Post:Post}); // instantiate controller
		 
		 $httpBackend.flush(); // flush so that responses are actually sent
		 
		 expect($scope.posts.length).toBe(2);  // Now we should have 2 post objects in model
	 }));
	 
 });
 
 describe('PostDetailsController Test\n', function(){
	 
	 var $httpBackend;
	 
	 beforeEach(inject(function(_$httpBackend_){
		 
		 $httpBackend=_$httpBackend_;
		 
		 $httpBackend.expectGET('http://localhost:8080/api/posts/2').respond({title:'Test2',_id:2});
		 // respond with a single object
	 }));
	 
	 it('Should initialize controller with 1 post', inject(function($state,$stateParams,$rootScope,$controller,Post){
		 
		 var $scope = $rootScope.$new();
		 
		 $stateParams.id=2;
		 
		 $controller('PostDetailsController',{$scope:$scope, $stateParams:$stateParams,$state:$state,Post:Post});
		 
		 $httpBackend.flush(); // flush so that responses are actually sent
		 
		 expect($scope.singlePost).not.toBe(undefined);  // make sure the model is initalized
		 
	 }));
	 
 });
 
 
 ////////// Koru Tests ////////////////////////
 
 beforeEach(module('spBlogger.admin.controllers'));
 
 describe('PostListController Test\n', function(){
	 
	 var $httpBackend; 
	 
	 beforeEach(inject(function(_$httpBackend_){
		 $httpBackend = _$httpBackend_;
		 
		 $httpBackend.expectGET('http://localhost:8080/api/posts').respond([{title:'Test',_id:1},
				{title:'Test2',_id:2}, {title:'Test3',_id:3}]); // respond with 3 post objects;
	 }));
	 
	 // 2 test specs inside one describe //
	 
	 
	 
	 it('Should initialize controller with 3 posts : K Test!', inject(function($rootScope,Post,popupService,$state,$controller){
		 
		 var $scope = $rootScope.$new();
		 
		 $controller('PostListController',{$scope:$scope,Post:Post,popupService:popupService,$state:$state});
		 
		 $httpBackend.flush();
		 
		 expect($scope.posts.length).toBe(3);
		
		 
	 }));
	 
	 it('The id of the second post must be 2 : K Test!', inject(function($rootScope,Post,popupService,$state,$controller){
		 
		 var $scope = $rootScope.$new();
		 
		 $controller('PostListController',{$scope:$scope,Post:Post,popupService:popupService,$state:$state});
		 
		 $httpBackend.flush();
		 
		 expect($scope.posts[1]._id).toEqual(2);
		 
	 }));	  
	 
 });
 
 
 

 
 describe('PostUpdateController \n', function(){
	 
	 var $httpBackend; 	var $stateParams = {'state' : 'what'};
			
	 
	 beforeEach(inject(function(_$httpBackend_){
		 $httpBackend = _$httpBackend_;
		  
		  $httpBackend.expectGET('http://localhost:8080/api/posts/2').respond(200,{title:'Test2',_id:2});
		 
		  $stateParams.id=2;
		
	 }));
	 
	 it('returns true confirming a post has happened : K Test', inject(function($rootScope,Post,$stateParams,$state,$controller){
		  var $scope = $rootScope.$new();
		  
		   $stateParams.id=2; 
		  
		  $controller('PostUpdateController',{$scope:$scope,Post:Post,$stateParams:$stateParams,$state:$state});
		  
		  $httpBackend.flush(); //console.log($scope);
		   
		    expect($scope.post).not.toBe(undefined);  // make sure the model is initalized
		   // console.log($scope.post);
		  
	 }));
	 
	  it('confirms that the button contains the correct text "UPDATE" : Koru Test', inject(function($rootScope,Post,$stateParams,$state,$controller){
		  var $scope = $rootScope.$new();
		  
		   $stateParams.id=2; 
		  
		  $controller('PostUpdateController',{$scope:$scope,Post:Post,$stateParams:$stateParams,$state:$state});
		  
		  $httpBackend.flush(); //console.log($scope);
		  
		   expect($scope.buttonText).toEqual('Update');  
		   
		  
	 }));
 });
 
 
 
 
 // mucking around
 //describe('sorting the list of users', function() {
  //it('sorts in descending order by default', function() {
    //var users = ['jack', 'igor', 'jeff'];
   //// var sorted = sortUsers(users);
    //expect(users).toContain('igor');
  //});
//});

