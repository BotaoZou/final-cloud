var shop = angular.module('worryShopServer', [])

shop.factory('Users', ['$http',function($http) {
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
}]);

shop.factory('Wishes', ['$http',function($http) {
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