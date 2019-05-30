angular.module('todoService', [])

	// super simple service
	// each function returns a promise object
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}])
	.factory('Users', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/users');
			},
			create : function(userData) {
				return $http.post('/api/users', userData);
			},
			delete : function(id) {
				return $http.delete('/api/users/' + id);
			}
		}
	}])
	.factory('Wishes', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/wishes');
			},
			create : function(wishData) {
				return $http.post('/api/wishes', wishData);
			},
			delete : function(id) {
				return $http.delete('/api/wishes/' + id);
			}
		}
	}]);

