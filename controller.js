/**
 * Created by 46465442z on 19/02/16.
 */
app.controller('controller', ["$scope", "getUsuari", "getTweetUsuaris", "getSeguint",
    function($scope, getUser, getUserTweets, getFollowings, getFollowingTweets) {

        $scope.setUsuari = function() {
            $scope.userId = $scope.usuari;
            $scope.usuari = "";
            var dades = getUser($scope.userId);
            $scope.userName = dades.nom;
            $scope.userDesc = dades.desc;
            $scope.userTweets = getUserTweets($scope.userId);
            $scope.followings = getFollowings($scope.userId);
            $scope.followingTweets = getFollowingTweets($scope.userId);
        };

        $scope.tweet = function() {
            $scope.userTweets.$add({text: $scope.tweetTxt});
            $scope.tweetTxt = "";
        }

        $scope.seguir = function() {
            $scope.followings.$add({idUser: $scope.usuari2Follow});
            $scope.usuari2Follow = "";
        }

        /* RAMON AQUESTA NO m'HA SORTIT :(

        $scope.tweetsFollowers = function(aux){
            $scope.arrayMissatges = [];
            for (var tweetsSeguint in aux.tweets) {
                if (tweetsSeguint != null) {
                    $scope.arrayMissatges.push({

                    });
                }
            }
            for (var usuariSeguit in aux.following) {

                for(var j = 0; j < $scope.usuaris.length; j++) {

                    if( aux2.$id == usernameSeguit ) {


                    }
                }
            }
        };*/
    }]);

app.factory("getUsuari", ["$firebaseObject",
    function($firebaseObject) {
        return function(usuari) {
            var refFirebase = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return {nom: $firebaseObject(refFirebase.child(usuari).child("name")),
                desc: $firebaseObject(refFirebase.child(usuari).child("description"))};
        };
    }
]);

app.factory("getSeguint", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var refFirebase = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(refFirebase.child(usuari).child("following"));
        };
    }
]);

app.factory("getTweetUsuaris", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var refFirebase = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(refFirebase.child(usuari).child("tweets"));
        };
    }
]);


