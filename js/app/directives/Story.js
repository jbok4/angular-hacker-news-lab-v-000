(function() {
'use strict';

angular 
  .module('app')
  .directive('story', story);
    
  story.$inject = ['TopStoriesService'];
  function story(TopStoriesService) {

    var directive = {

      bindToController: true,
      controller: StoryDirectiveController,
      controllerAs: 'vm',
      templateUrl: 'views/story.html',
      link: link,
      restrict: 'E',
      scope: {
        id: '=id'
      }
    };
    return directive;
    function link(scope, element, attrs) {
    }
  }
  
  function StoryDirectiveController(TopStoriesService) {
    var vm = this;

    function getDomainUrl(url) {
      var a = document.createElement('a');
      a.setAttribute('href', url);
      if (a.hostname === 'news.ycombinator.com') {
        return '';
        } else {
          return '(' + a.hostname + ')';
        }
    }

    function getTime(seconds) {
    var secondDifference = (Date.now()/1000) - seconds;
    if (secondDifference < 3600) {
      var minutesAgo = secondDifference/60;
      return Math.floor(minutesAgo) + ' minutes ago';
    } else {
      var hoursAgo = secondDifference/3600;
      return Math.floor(hoursAgo) + ' hours ago';
    }
  }

    TopStoriesService
      .getStory(vm.id)
      .then(function(res) {
        vm.story = res.data;
        vm.title = vm.story.title;
        vm.url = vm.story.url;
        if(!vm.url) {
          vm.url = 'https://news.ycombinator.com/item?id=' + vm.story.id;
        }
        vm.domain = getDomainUrl(vm.url);
        vm.score = vm.story.score;
        vm.author = vm.story.by;
        vm.time = getTime(vm.story.time);

      })
  }
})(); 
