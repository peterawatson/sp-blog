'use strict'

angular.module('spBlogger.admin.controllers',[]).controller('PostCreationController',['$scope','$state','Post','permalinkFilter', function($scope,$state,Post,permalinkFilter){
	$scope.post=new Post(); // Create an empty Post instance
	
	$scope.buttonText="Create"; // Set initial label for button
	
	$scope.savePost=function(){
		$scope.buttonText="Saving..."; // Once clicked change button text
		//$scope.post.permalink=angular.lowercase($scope.post.title).replace(/[\s]/g,'-');  // generate permalink
		$scope.post.permalink = permalinkFilter($scope.post.title); // create the permalink with the permalink filter
		$scope.post.$save(function(){
			$state.go('admin.postViewAll'); // Once saved go to state admin.postViewAll
		});
	}
}]);

angular.module('spBlogger.admin.controllers').controller('PostUpdateController',['$scope','Post','$stateParams','$state',function($scope,Post,$stateParams,$state){
	//alert($stateParams.id);
	$scope.post=Post.get({id:$stateParams.id}); // Obtain the Post from backend. Search by Id
	$scope.buttonText="Update";  // Set initial label for button
	$scope.updatePost=function(){
		$scope.buttonText="Updating..."; // Once clicked change button text
		$scope.post.$update(function(){
			$state.go('admin.postViewAll');  // Once updated go to state 'admin.postViewAll
		});
	}
}]);

angular.module('spBlogger.admin.controllers').controller('PostListController',['$scope','Post','popupService','$state',function($scope,Post,popupService,$state){
	$scope.posts=Post.query();  // Obtain all the posts from backend
	$scope.deletePost=function(post){
		if(popupService.showPopup('Really delete this?')){  // Ask for confirmation
			post.$delete(function(){
				$state.go('admin.postViewAll',undefined,{  // once deleted reload the state
					reload:true
				});
			});
		}
	}
}]).controller('LoginController',['$scope','authService','$state',function($scope,authService,$state){

    $scope.buttonText="Login";

    $scope.login=function(){

        $scope.buttonText="Logging in. . .";

        authService.login($scope.credentials.username,$scope.credentials.password).then(function(data){
            $state.go('admin.postViewAll');
        },function(err){
            $scope.invalidLogin=true;
        }).finally(function(){
            $scope.buttonText="Login";
        });
    }
}]).controller('AdminController',['$scope','authService','$state','user',function($scope,authService,$state,user){

    $scope.logout=function(){
        authService.logout().then(function(){
            $state.go('login');
        });
    }
}]);

// added this?

//angular.module('spBlogger.admin.controllers').controller('AdminController',['$scope',function($scope){
	
//}]);

//angular.module('spBlogger.admin.controllers').controller('LoginController',['$scope','authService','$state',function($scope,authService,$state){
//$scope.buttonText="Login";
//$scope.login=function(){
//$scope.buttonText="Logging in. . .";
//authService.login($scope.credentials.username,$scope.credentials.password).then(function(data){
//$state.go('admin.postViewAll');
//},function(err){
//$scope.invalidLogin=true;
//}).finally(function(){
//$scope.buttonText="Login";
//});
//}
//}]);


//angular.module('spBlogger.admin.controllers',[]).controller('AdminController',['$scope',function($scope){
	
//}]).controller('PostUpdateController',['$scope',function($scope){
	
//}]).controller('PostListController',['$scope',function($scope){
	
//}]).controller('PostCreationController',['$scope',function($scope){ // added this controller
	
//}]);
// the first controller is part of the declaration of the module. the next call the module and add more controllers to it
