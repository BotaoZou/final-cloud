angular.module('Controller', [])


	.controller('Register', ['$scope', '$http', 'Users', function ($scope, $http, Users) {
		$scope.fromUserData = {};
		$scope.registering = true;
		$scope.regSuccess = false;

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
				console.log(u);
				console.log($scope.users[u]);
				$scope.usedName.push($scope.users[u].user_name);
				$scope.usedEmail.push($scope.users[u].email);
			}
			console.log($scope.usedName);
			console.log($scope.usedEmail);
		}

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
		}

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
			console.log("HHHHHHHHHHHHHHHHHH");
			console.log(!'user_name' in $scope.fromUserData);
			console.log(!$scope.fromUserData.user_name);
			if (!'user_name' in $scope.fromUserData || !$scope.fromUserData.user_name)
				return false;
			else
				return userNameUsed();
		};

		$scope.emailUsedFormat = function () {
			console.log("HEHEHEHEHEHE");
			console.log(!'email' in $scope.fromUserData);
			console.log(!$scope.fromUserData.email);
			if (!'email' in $scope.fromUserData || !$scope.fromUserData.email)
				return false;
			else
				return emailUsed();
		};

		userNameUsed = function () {
			var index = $scope.usedName.indexOf($scope.fromUserData.user_name);
			console.log(index);
			if (index == -1)
				return false;
			else
				return true;
		};

		emailUsed = function () {
			var index = $scope.usedEmail.indexOf($scope.fromUserData.email);
			console.log(index);
			if (index == -1)
				return false;
			else
				return true;
		};
		$scope.allRight = function () {
			var allRight = $scope.userNameValid() && codeValid() && emailValid() && !userNameUsed() && !emailUsed();
			console.log(allRight);
			return allRight;
		};


		$scope.submit = function () {
			$scope.createUser();
		};

	}])