app.config(function($stateProvider) {
    $stateProvider.state('generator', {
        url: '/script',
        controller: 'StoryCtrl',
        templateUrl: 'js/generator/generator.html'
    })
})

app.factory('StoryFactory', function($http) {
    var StoryFactory = {}

    StoryFactory.getAllQuotes = function() {
        return $http.get('/api/quotes')
            .then(function(response) {
                // console.log(quotes.data)
                return response.data
            })
    }

    //get narrator quotes for beginning and ending of episode???
    StoryFactory.narratorQuotes = function() {
        return $http.get('/api/quotes')
            .then(function(response) {
                return response.data
            })
            .then(function(quoteArray) {
                var narration = [];
                quoteArray.forEach(function(quoteObj) {
                    if (quoteObj.character.indexOf("Narrator") > -1) {
                        narration.push(quoteObj)
                    }
                })
                console.log(narration.length)
                return narration
            })
    }

    StoryFactory.createScene = function() {
        return $http.get('/api/quotes')
            .then(function(response) {
                return response.data
            })
            .then(function(quotes) {
                // console.log("creating lines")
                var lines = [];
                var count = 0;

                while (count < 50) {
                    var index = Math.floor(Math.random() * 6340)
                    if (lines.indexOf(quotes[index]) < 0) {
                        lines.push(quotes[index])
                        count++
                    } else {
                        continue
                    }
                }
                return lines
            })
    }

    return StoryFactory
})

app.controller('StoryCtrl', function($scope, StoryFactory) {
    //create first act (~5 minutes)
    //randomly generate 50 quotes

    StoryFactory.createScene()
        .then(function(sceneOne) {
            $scope.sceneOne = sceneOne
        })

    StoryFactory.createScene()
        .then(function(sceneTwo) {
            $scope.sceneTwo = sceneTwo
        })

    StoryFactory.createScene()
        .then(function(sceneThree) {
            $scope.sceneThree = sceneThree
        })

    StoryFactory.createScene()
        .then(function(sceneFour) {
            $scope.sceneFour = sceneFour
        })

    StoryFactory.narratorQuotes()
        .then(function(narration) {
            var introSceneOneIndex = Math.floor(Math.random() * 624)
            var introSceneTwoIndex = Math.floor(Math.random() * 624)
            var introSceneThreeIndex = Math.floor(Math.random() * 624)
            var introSceneFourIndex = Math.floor(Math.random() * 624)
            var outroScriptIndex = Math.floor(Math.random() * 624)

            var introSceneOne = narration[introSceneOneIndex];
            var introSceneTwo = narration[introSceneTwoIndex];
            var introSceneThree = narration[introSceneThreeIndex];
            var introSceneFour = narration[introSceneFourIndex]

            var outroScript = narration[outroScriptIndex];

            $scope.introSceneOne = introSceneOne;
            $scope.introSceneTwo = introSceneTwo;
            $scope.introSceneThree = introSceneThree;
            $scope.introSceneFour = introSceneFour;

            $scope.outroScript = outroScript;
        })
})
