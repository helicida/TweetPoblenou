/**
 * Created by 46465442z on 19/02/16.
 */

app.controller("Tweet", ["$scope", "chatMessages",
    // Enviamos nuestr chatMessages al controller
    function($scope, chatMessages) {
        $scope.user = "Mireia Fernández";

        // anyadimos el array de chatMessages al scope que usaremos en nuestro ng-repeat
        $scope.messages = chatMessages;

        // un metodo para crear nuevos mensajes; llamado desde ng-submit
        $scope.addMessage = function() {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            $scope.messages.$add({
                user: $scope.user,
                text: $scope.message
            });

            // reset the message input
            $scope.message = "";
        };

        // if the messages are empty, add something for fun!
        $scope.messages.$loaded(function() {
            if ($scope.messages.length === 0) {
                $scope.messages.$add({
                    user: "Firebase Docs",
                    text: "Hello world!"
                });
            }
        });
    }
]);

app.factory("chatMessages", ["$firebaseArray",
    function($firebaseArray) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase("https://ecaibtweet.firebaseio.com/tweets");

        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);