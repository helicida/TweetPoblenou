/**
 * Created by 46465442z on 19/02/16.
 */
app.controller('controller', ["$scope", "getUsuarios", "getSeguidos", "getTweetsUsuarios",
    function($scope, getUsuarios, getTweetsUsuarios, getSeguidos) {

        $scope.todosLosMensajes = $scope.getSeguidos;

        $scope.setUsuari = function() {
            $scope.userId = $scope.usuari;
            $scope.usuari = "";

            var datosUsuario = getUsuarios($scope.userId);
            $scope.userName = datosUsuario.nom;
            $scope.userDesc = datosUsuario.desc;
            $scope.userTweets = getTweetsUsuarios($scope.userId);
            $scope.followings = getSeguidos($scope.userId);
        };

        $scope.tweetejar = function() {
            $scope.userTweets.$add({text: $scope.tweetTxt});
            $scope.tweetTxt = "";
        }

        $scope.seguir = function() {
            $scope.followings.$add({idUser: $scope.usuari2Follow});
            $scope.usuari2Follow = "";
        }
    }]);

app.factory("getUsuarios", ["$firebaseObject",
    function($firebaseObject) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return {nom: $firebaseObject(ref.child(usuari).child("name")),
                desc: $firebaseObject(ref.child(usuari).child("description"))};
        };
    }
]);

app.factory("getSeguidos", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("following"));
        };
    }
]);

app.factory("getTweetsUsuarios", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("tweets"));
        };
    }
]);