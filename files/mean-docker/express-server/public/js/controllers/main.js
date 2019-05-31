var ctrl = angular.module('Controller', []);


ctrl.controller('Register', ['$scope', '$http', '$rootScope', 'Users', function ($scope, $rootScope, $http, Users) {
	$scope.fromUserData = {};
	$scope.registering = true;
	$scope.regSuccess = false;
	$rootScope.usedName = [];
	$rootScope.usedEmail = [];
	$rootScope.usedCode = [];
	$rootScope.users = null;

	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos
	Users.get()
	.success(function (data) {
		console.log(data);
		$rootScope.users = data;
		$scope.registering = false;
		departUsers();
	});

	// CREATE ==================================================================
	// when submitting the add form, send the text to the node API
	$scope.createUser = function () {

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		console.log($scope.fromUserData);
		if ($scope.fromUserData.user_name != undefined) {
			$scope.registering = true;

			// call the create function from our service (returns a promise object)
			Users.create($scope.fromUserData).success(function (data) {
				$scope.registering = false;
				$scope.fromUserData = {}; // clear the form so our user is ready to enter another
				$rootScope.users = data;
				departUsers();
				$scope.regSuccess = true;
			});
		}

	};

	departUsers = function () {
		$rootScope.usedName = [];
		$rootScope.usedEmail = [];
		$rootScope.usedCode = [];

		for (u in $rootScope.users) {
			$rootScope.usedCode.push($rootScope.users[u].code);
			$rootScope.usedName.push($rootScope.users[u].user_name);
			$rootScope.usedEmail.push($rootScope.users[u].email);
		}
	};

	isDigitOrLetter = function (s) {
		var re = /^[0-9a-zA-Z]*$/g;
		if (!re.test(s))
			return false;
		return true;
	};

	isEmail = function (s) {
		var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (!pattern.test(s))
			return false;
		return true;
	};

	$scope.userNameFormmatRight = function () {
		if ('user_name' in $scope.fromUserData && $scope.fromUserData.user_name != undefined) {
			return $scope.userNameValid();
		}
		return true;
	};

	$scope.userNameValid = function () {
		if (!'user_name' in $scope.fromUserData || $scope.fromUserData.user_name == undefined)
			return false;
		var user_name = $scope.fromUserData.user_name;
		return isDigitOrLetter(user_name) && user_name.length >= 6 && user_name.length <= 15;
	};

	$scope.codeFormmatRight = function () {
		if ('code' in $scope.fromUserData && $scope.fromUserData.code != undefined) {
			var code = $scope.fromUserData.code;
			return isDigitOrLetter(code) && code.length >= 6;
		}
		return true;
	};

	$scope.emailFormmatRight = function () {
		if ('email' in $scope.fromUserData && $scope.fromUserData.email != undefined) {
			var email = $scope.fromUserData.email;
			return isEmail(email);
		}
		return true;
	};

	emailValid = function () {
		if (!'email' in $scope.fromUserData || $scope.fromUserData.email == undefined)
			return false;
		return isEmail($scope.fromUserData.email);
	};


	codeValid = function () {
		if (!'code' in $scope.fromUserData)
			return false;
		else
			return $scope.fromUserData.code && $scope.codeAgain && $scope.codeFormmatRight() && $scope.fromUserData.code == $scope.codeAgain;
	};

	$scope.userNameUsedFormat = function () {
		if (!'user_name' in $scope.fromUserData || !$scope.fromUserData.user_name)
			return false;
		else
			return userNameUsed();
	};

	$scope.emailUsedFormat = function () {
		if (!'email' in $scope.fromUserData || !$scope.fromUserData.email)
			return false;
		else
			return emailUsed();
	};

	userNameUsed = function () {
		if (!$scope.fromUserData.user_name || $scope.fromUserData.user_name == undefined)
			return false;
		var index = $rootScope.usedName.indexOf($scope.fromUserData.user_name);
		if (index == -1)
			return false;
		else
			return true;
	};

	emailUsed = function () {
		if (!$scope.fromUserData.email || $scope.fromUserData.email == undefined)
			return true;
		var index = $rootScope.usedEmail.indexOf($scope.fromUserData.email);
		if (index == -1)
			return false;
		else
			return true;
	};
	$scope.allRight = function () {
		var allRight = $scope.userNameValid() && codeValid() && emailValid() && !userNameUsed() && !emailUsed();
		return allRight;
	};


	$scope.submit = function () {
		$scope.createUser();
	};

}]);

ctrl.controller('Login', ['$scope', '$http', '$rootScope', 'Users', function ($scope, $rootScope, $http, Users) {
	$scope.user_name = null;
	$scope.code = null;
	$scope.logining = true;
	$scope.loginSuccess = false;
	$rootScope.userName = null;


	$scope.userNameFormatValid = function () {
		if ($scope.user_name == null || $scope.user_name == undefined)
			return true;
		else
			return userNameValid();
	};

	userNameValid = function () {
		if ($scope.user_name == null || $scope.user_name == undefined)
			return false;

		if ($rootScope.usedName == undefined)
			return false;

		var index = $rootScope.usedName.indexOf($scope.user_name);
		if (index == -1)
			return false;
		else
			return true;
	};

	$scope.codeFormatValid = function () {

		if ($scope.code == null || $scope.code == undefined)
			return true;
		else
			return $scope.codeValid();

	};

	$scope.codeValid = function () {
		if ($scope.user_name == null || $scope.user_name == undefined)
			return false;

		if ($scope.code == null || $scope.code == undefined)
			return false;

		if ($rootScope.usedCode == undefined || $rootScope.usedName == undefined)
			return false;

		var userIdx = $rootScope.usedName.indexOf($scope.user_name);

		if (userIdx == -1)
			return false;

		if ($scope.code == $rootScope.usedCode[userIdx]) {
			{
				$rootScope.userName = $scope.user_name;
				return true;
			}
		}
		return false;
	};

	$scope.login = function () {
		console.log($scope.user_name);
		console.log($scope.code);
		window.location.href = './index.html';
		$scope.loginSuccess = true;
	}

}]);

ctrl.controller('wishController', ['$scope', '$http', '$rootScope', 'Wishes', function ($scope, $rootScope, $http, Wishes) {
	$scope.wishData = {};
	$scope.wishing = false;
	$scope.bonusList = [1, 2, 3, 4, 5, 6];
	console.log($scope.wishData);

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Wishes.get()
		.success(function (data) {
			console.log(data);
			$scope.wishes = data;
			$scope.wishing = false;
		});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createWish = function () {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log($scope.wishData);
			if ($scope.wishData.title != undefined) {
				console.log("make a vow");
				$scope.wishing = true;
				$scope.wishData.bonus = $scope.selectedBonus;
				$scope.wishData.user_name = $rootScope.userName;

				// call the create function from our service (returns a promise object)
				Wishes.create($scope.wishData)
					// if successful creation, call our get function to get all the new todos
					.success(function (data) {
						console.log("TERMINATE");
						$scope.wishing = false;
						$scope.wishData = {}; // clear the form so our user is ready to enter another

					});
				}

			}
		}]);