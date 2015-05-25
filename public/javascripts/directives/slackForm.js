;
(function() {
	'use strict'

	var slackFormController = function slackFormController(){
		var slackFormVm = this;
		slackFormVm.sendData = function(model){
			console.log(model);
		};

	};

  var slackForm = function slackForm() {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: '/javascripts/views/slackForm.html',
      controllerAs: 'slackFormVm',
      controller: slackFormController,
    };
    return directive;
  }

  angular
    .module('slackApp')
    .directive('slackForm', slackForm);


})();
