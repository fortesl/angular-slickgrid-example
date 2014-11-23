/** ------------------------------------------------------------------
 ** Name: app.js
 ** Created by lfortes on 11/23/2014.
 ** ------------------------------------------------------------------*/

(function() {
    //Javascript is wrapped into this function

    'use strict';

    //App module
    angular.module('sgridApp', []);

    //Controller
    angular.module('sgridApp').controller('GridController', [function() {

        var self = this;

        self.columns = [
            {
                id: "title", name: "Title", field: "title"
            },
            {
                id: "duration", name: "Duration", field: "duration"
            },
            {
                id: "%", name: "% Complete", field: "percentComplete"
            },
            {
                id: "start", name: "Start", field: "start"
            },
            {
                id: "effort-driven", name: "Effort Driven", field: "effortDriven"
            }
        ];

        self.data = [];

        (function() {
            for (var i = 0; i <500; i++) {
                self.data[i] = {
                    title: "Task " + i,
                    duration: "5 days",
                    percentComplete: Math.round(Math.random() * 100),
                    start: "01/01/2009",
                    finish: "01/05/2009",
                    effortDriven: (i % 5 == 0)
                };
            }
        })();

        self.options = {
            enableCellNavigation: true,
            enableColumnReorder: false
        };

        self.deleteTask = function(row) {
            self.data.splice(row.row, 1);
        }

    }]); //end Controller

    //Directive
    angular.module('sgridApp').directive('myGrid', [function() {
        return {
            restrict: 'A',
            scope: {
                gridColumns: '=',
                gridData: '=',
                gridOptions: '=',
                editRow: '&'
            },
            link: function($scope, $element) {
                var grid;

                $scope.$watchCollection('gridData', function(newVal, oldVal) {
                    if (newVal && grid) {
                        grid.invalidate();
                    }
                });

                grid = new Slick.Grid($element[0], $scope.gridData, $scope.gridColumns, $scope.gridOptions);

                grid.onDblClick.subscribe(function(e, args) {
                    $scope.editRow({row: args});
                    grid.invalidate();
                });

            }
        }
    }]); //end Directive

})();
