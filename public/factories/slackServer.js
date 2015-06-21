;
(function() {
  var slackServer = function($http) {
    var url = 'https://slack.com/api/';

    var getFiles = function(token, days) {
      var _url = url + 'files.list';
      var d = new Date();
      var daysAgo = d.setDate(d.getDate() - days);
      var user = 'U025RP6EN';


      var postData = {
        ts_to: daysAgo / 1000,
        user: user,
        token: token
      };

      return $http.post(_url, postData);
    };

    var deleteFiles = function() {

    };

    return {
      getFiles: getFiles,
      deleteFiles: deleteFiles
    }
  }
  angular
    .module('slackApp')
    .factory('slackServer', slackServer)

  slackServer.$inject = ['$http'];
})();
