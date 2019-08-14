var app = angular.module('myApp', ['smart-table']);
app.controller('personCtrl', ['$scope', '$filter', function ($scope, filter) {
    $scope.Person = [];
    $scope.editPerson = {
        
        Name: "",
        Sex: "",
        Address: "",
        DOB: "",
        Money: 0
    }
    

    $scope.createPerson = {
        Name: "",
        Sex: "",
        Address: "",
        DOB: "",
        Money: 0
    }

    $scope.Add = function () {
        $scope.createPerson.DOB = ($scope.createPerson.DOB.getFullYear()) + "-" + ($scope.createPerson.DOB.getMonth() + 1 + "-" + ($scope.createPerson.DOB.getDate()));


        $.ajax({
            type: 'POST', //HTTP Request
            url: 'api/PeopleAPI',
            data: $scope.createPerson,
            success: function (response) {

                $scope.$apply(function () {
                    $scope.Person.push($scope.createPerson)
                    $('#createPersonModal').modal('hide');

                })
            },
            error: function (error) {
                console.log("Error:", error)
                // failed request; give feedback to user
            }
        });



    };

   

    

    $.ajax({
        type: 'GET', //HTTP Request
        url: 'api/PeopleAPI',
        success: function (response) {
            // successful request; do something with the data
            $scope.$apply(function () {
                $scope.Person = response;
            });
        },
        error: function () {
            // failed request; give feedback to user
        }
    });

    $scope.getRow = function (data) {
        
        
        $scope.editPerson = angular.copy(data);
        $scope.editPerson.DOB = new Date(Date.parse($scope.editPerson.DOB))

        
     
    }

    $scope.deletePerson = function (id) {

        $.ajax({
            type: 'DELETE',
            url: 'api/peopleapi/'+id,
            data: $scope.editPerson,
            success: function (response) {
                $scope.$apply(function () {
                    console.log('delete');
                    $('#deleteModal').modal('hide');
                    //var index = $scope.Person.indexOf(x);
                    //if (index !== -1) {
                    //    $scope.Person.splice(index, 1);
                    //}
                   

                })
            },
            error: function (error) {
                console.log("Error:", error)
                // failed request; give feedback to user
            }

        });

    }

    

    $scope.UpdatePerson = function (id) {
        console.log($scope.editPerson);
        $scope.editPerson.DOB = ($scope.editPerson.DOB.getFullYear()) + "-" + ($scope.editPerson.DOB.getMonth() + 1 + "-" + ($scope.editPerson.DOB.getDate()));

        $.ajax({
            type: 'Put', //http request
            url: 'api/peopleapi/' + id,
            data: $scope.editPerson,
            success: function (response) {

                $scope.copyPeron = angular.copy($scope.Person);
                var objIndex = $scope.copyPeron.findIndex((obj => obj.PersonID == id));

                console.log("Index:", objIndex);

                //Update object's name property.
                $scope.copyPeron[objIndex] = $scope.editPerson;
                console.log($scope.copyPeron);

                // successful request; do something with the data
                $scope.$apply(function () {

                    $scope.person = $scope.copyPeron;
                 
                    

                });

                $('#updatePersonModal').modal('hide');
                console.log('Success');

            },
            error: function () {
                // failed request; give feedback to user
            }


        });
    }





    


}]);


   
