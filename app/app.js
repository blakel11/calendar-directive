angular.module("CalendarApp", [])
    .controller('CalendarCtrl', function($scope) {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();

        $scope.date = {
            year : year,
            month : month
        };

        $scope.isCurrentMonth = function(date) {
            return date.getMonth() == $scope.date.month;
        }

        $scope.months = ['January','February','March','April','May',
            'June','July','August','September','October','November','December'];

        var years = [];
        var range = year - 50;
        for(var i=range ; i <= year ; i++) {
            years.push(i);
        }

        $scope.years = years;

        $scope.$watchCollection('date', function(date) {
            $scope.currentDate = new Date(date.year, date.month, 1);
        });
    })
    .directive('myCalendar', function() {
        return {
            transclude : true,
            controller : ['$scope', '$attrs', function($scope, $attrs) {
                $scope.$watch($attrs.myCalendar, function(date) {
                    if(!date) return;
                    $scope.days = CalendarRange.getMonthlyRange(date).days;
                });
            }],
            template : '<div class="calendar-container">' +
            '<div ng-repeat="day in days">' +
            '<div ng-transclude></div>' +
            '</div>' +
            '</div>'
        }
    });
