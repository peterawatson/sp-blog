'use strict'

// post service from the admin module.......
angular.module('spBlogger.posts.controllers',[]).controller('PostController',['$scope','Post',function($scope,Post){

	$scope.posts=Post.query();   // obtain all the posts

}]).controller('PostDetailsController',['$stateParams','$state','$scope','Post',function($stateParams,$state,$scope,Post){

    $scope.closePost=function(){
        $state.go('allPosts');
    };
		
			//alert("we need an id here .. "+ $stateParams.id);
			
    $scope.singlePost=Post.get({id:$stateParams.id}); // obtain a single post // Nb this post will also be passed to the directive
    //console.log($scope.singlePost);

}]);

//angular.module('spBlogger.posts.controllers',[]).controller
//('PostController',['$scope','postService',
//function($scope,postService){
	//$scope.getAllPosts=function(){
		//return postService.getAll();
	//};
	
	//$scope.posts=$scope.getAllPosts();
	
//}]).controller('PostDetailsController',['$stateParams','$state',
//'$scope','postService',function($stateParams,$state,$scope,postService){
	//$scope.getPostById=function(id){
		//return postService.getPostById(id);
	//};
	//$scope.closePost=function(){
		//$state.go('allPosts');
	//};
	//$scope.singlePost=$scope.getPostById($stateParams.id);
	
//}]);
