var ctrl = angular.module('Controller', []);


ctrl.controller('Register', ['$scope', '$http', 'Users', function ($scope, $http, Users) {
	$scope.fromUserData = {};
	$scope.registering = true;
	$scope.regSuccess = false;
	$scope.usedName = [];
	$scope.usedEmail = [];

	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos
	Users.get()
		.success(function (data) {
			console.log(data);
			$scope.users = data;
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
				$scope.users = data;
				departUsers();
				$scope.regSuccess = true;
			});
		}

	};

	departUsers = function () {
		$scope.usedName = [];
		$scope.usedEmail = [];

		for (u in $scope.users) {
			$scope.usedName.push($scope.users[u].user_name);
			$scope.usedEmail.push($scope.users[u].email);
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
		if ('user_name' in $scope.fromUserData && $scope.fromUserData.user_name) {
			return $scope.userNameValid();
		}
		return true;
	};

	$scope.userNameValid = function () {
		if (!'user_name' in $scope.fromUserData || !$scope.fromUserData.user_name)
			return false;
		var user_name = $scope.fromUserData.user_name;
		return isDigitOrLetter(user_name) && user_name.length >= 6 && user_name.length <= 15;
	};

	$scope.codeFormmatRight = function () {
		if ('code' in $scope.fromUserData && $scope.fromUserData.code) {
			var code = $scope.fromUserData.code;
			return isDigitOrLetter(code) && code.length >= 6;
		}
		return true;
	};

	$scope.emailFormmatRight = function () {
		if ('email' in $scope.fromUserData && $scope.fromUserData.email) {
			var email = $scope.fromUserData.email;
			return isEmail(email);
		}
		return true;
	};

	emailValid = function () {
		if (!'email' in $scope.fromUserData || !$scope.fromUserData.email)
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
		if (!$scope.fromUserData.user_name)
			return false;
		var index = $scope.usedName.indexOf($scope.fromUserData.user_name);
		if (index == -1)
			return false;
		else
			return true;
	};

	emailUsed = function () {
		if (!$scope.fromUserData.email)
			return true;
		var index = $scope.usedEmail.indexOf($scope.fromUserData.email);
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

ctrl.controller('Login', ['$scope', '$http', 'Users', function ($scope, $http, Users) {
	$scope.user_name = null;
	$scope.code = null;
	$scope.logining = true;
	$scope.loginSuccess = false;
	$rootScope.userName = null;


	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos
	Users.get()
		.success(function (data) {
			$scope.users = data;
			$scope.logining = false;
			departUsers();
		});

	departUsers = function () {
		$scope.usedName = [];
		$scope.usedCode = [];

		for (u in $scope.users) {

			$scope.usedName.push($scope.users[u].user_name);
			$scope.usedCode.push($scope.users[u].code);
		}

		$scope.len = $scope.usedName.length;
	};

	$scope.userNameFormatValid = function () {
		if ($scope.user_name == null || $scope.user_name == undefined)
			return true;
		else
			return userNameValid();
	};

	userNameValid = function () {

		var index = $scope.usedName.indexOf($scope.user_name);
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

		var userIdx = $scope.usedName.indexOf($scope.user_name);

		if (userIdx == -1)
			return false;

		if ($scope.code == $scope.usedCode[userIdx]) {
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
		$scope.loginSuccess = true;
	}

}]);