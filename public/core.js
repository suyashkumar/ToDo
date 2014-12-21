var simpleTodo=angular.module('simpleTodo',[]);

function mainController($scope, $http){
	// Init Lists and manage front-end display of list selection
	$scope.list1=['One','Two','Three','Four']; // Test list
	$scope.selectedIndex=0; // Currently selected list 

	// First load all todos
	refreshToDos($scope,$http);
	// Create todo
	$scope.createTodo= function() {
		$http.post('/api/todos/'+$scope.list1[$scope.selectedIndex],$scope.formData)
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
		$http.delete('/api/todos/'+$scope.list1[$scope.selectedIndex]+'/'+todoID)
		.success(function (data){
			$scope.todos=data;
			console.log('Delete Successful'); 

		})
		.error(function(data){
			console.log("Del error");
		});
	}

	
	// This function helps ensure the selected item (list of todos) is highlighted (and no others are)
	$scope.toggler=function(index){
		$scope.selectedIndex=index;
		refreshToDos($scope,$http);
	}

	// This function creates a new list 
	$scope.createList=function(){
		$scope.list1.push($scope.newList.text);
		$scope.newList.text="";

	}

}

function refreshToDos($scope,$http){
	$http.get('/api/todos/'+$scope.list1[$scope.selectedIndex])
	.success(
		function(data){ //data is json data response
			$scope.todos=data;
			console.log(data);

		})
	.error(function(data){
			console.log("ERROR "+ data);
		}); 

}