/*global Firebase */

/* First, decided to contruct file structure with ng-Route but i think you want  */
/* single page application so, i remove this module. */

/*var firepollapp = angular.module(firepollapp, ['ngRoute']);

// configure our routes
firepollapp.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        .when('/list', {
            templateUrl : 'pages/list.html',
            controller  : 'listController'
        })

        .when('/create', {
            templateUrl : 'pages/create.html',
            controller  : 'createController'
        });
});

firepollapp.controller('mainController', function($scope) {
    $scope.param = $routeParams.param;
});

firepollapp.controller('listController', function($scope) {
    $scope.param = $routeParams.param;
});

firepollapp.controller('createController', function($scope) {
    $scope.param = $routeParams.param;
});*/


angular.module('firepollapp').controller('mainCtrl',function($scope, $firebase){

    var ref = new Firebase("https://etiyapolling.firebaseio.com/");

    $scope.polls = $firebase(ref);

    $scope.selectedPoll = '';
    $scope.selectedPollOptions = [];
    $scope.load = true;


    $scope.selectPoll = function(id){
        if (id){
            $scope.selectedPoll = id;
            $scope.selectedPollOptions = [];
            for (i=0; i<$scope.polls[id].options.length; i++)
            {
                if ($scope.polls[id].options[i][0] && $scope.polls[id].options[i][1])
                {
                    var val = parseInt($scope.polls[id].options[i][1]);
                    var option = [$scope.polls[id].options[i][0], val];
                    $scope.selectedPollOptions.push($scope.polls[id].options[i]);
                }
            }
        }
    };

    $scope.$watch('polls', function(){
        $scope.selectPoll($scope.selectedPoll);
    },true);


    $scope.polls.$on("loaded", function() {
           $scope.load = false;
    });




    $scope.vote = function(index){
        index ++;
        if (angular.isNumber(charData.data[index][1] ))
        {
            newTotal = parseInt(charData.data[index][1]) + 1;
        }
        else
        {
            newTotal = 1
        }
        index--;
        $scope.polls[$scope.selectedPoll].options[index][1] = newTotal;
        $scope.polls.$save();
    };



    $scope.addOther = function(){
        if ($scope.vote.optionOther){
            $scope.polls[$scope.selectedPoll].options.push([$scope.vote.optionOther, 1]);
            $scope.polls.$save();
            $scope.vote.optionOther = '';
        }
    };



    $scope.resetForm = function(){
        $scope.pollForm = {};
        $scope.pollForm.options = [];
    };
    $scope.resetForm();
    $scope.addPollOption = function(){
        $scope.pollForm.options.push(['', '0']);
    };
    $scope.removeOption = function(index){
        $scope.pollForm.options.splice(index,1);
    };

    $scope.pollCreate = function(){
        for (i=0; i<$scope.pollForm.options.length; i++){
            if (angular.isUndefined($scope.pollForm.options[i][0]) || $scope.pollForm.options[i][0]=='') {$scope.pollForm.options.splice(i,1)}
        }
        if ($scope.pollForm.name && ($scope.pollForm.options.length>0))
        {
            $scope.polls.$add($scope.pollForm);
            $scope.resetForm();
        }
    };

});

