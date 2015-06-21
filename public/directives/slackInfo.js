;
(function() {
  var slackInfoController = function(slackServer) {
    var slackInfoVm = this;

    slackInfoVm.token = 'xoxp-2191906948-2195788498-6458352101-022c13';
    slackInfoVm.daysList = [1, 2, 7, 14, 30, 60, 90];

    slackInfoVm.deleteFiles = function(){
    	slackServer.getFiles(slackInfoVm.token, slackInfoVm.days)
    		.then(function(data){
    			console.log(data);
    		});
    }

  }

  var slackInfo = function() {
    return {
      link: function() {},
      controller: slackInfoController,
      controllerAs: 'slackInfoVm',
      bindToController: true
    }
  };

  angular
    .module('slackApp')
    .directive('slackInfo', slackInfo)
  slackInfo.$inject = ['slackServer'];

})();
