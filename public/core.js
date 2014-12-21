var simpleTodo=angular.module('simpleTodo',[]);

function mainController($scope, $http){

	// First load all todos
	$http.get('/api/todos')
	.success(
		function(data){ //data is json data response
			$scope.todos=data;
			console.log(data);

		})
	.error(function(data){
			console.log("ERROR "+ data);
		}); 
	// Create todo
	$scope.createTodo= function() {
		$http.post('/api/todos',$scope.formData)
		.success(
			function(data){
				$scope.todos=data;
				console.log($scope.formData);
				$scope.formData={}; // Clear form data object
				console.log('Add Success');
			})
		.error(function(data){
				console.log("Add Todo Error"); 
			});

	}
	// Delete ToDo
	$scope.deleteTodo=function(todoID){
		$http.delete('/api/todos/'+todoID)
		.success(function (data){
			$scope.todos=data;
			console.log('Delete Successful'); 

		})
		.error(function(data){
			console.log("Del error");
		});
	}

	// Init Lists and manage front-end display of list selection
	$scope.list1=['One','Two','Three','Four']; // Test list
	$scope.selectedIndex=0; // Currently selected list 
	// This function helps ensure the selected item (list of todos) is highlighted (and no others are)
	$scope.toggler=function(index){
		$scope.selectedIndex=index;
	}

}