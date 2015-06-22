;
(function() {
  var slackServer = function($http) {
    var url = 'https://slack.com/api/';

    var getUsers = function(token) {
      var _url = url + 'users.list';
      var postData = {
        token: token
      };
      return $http({
        url: _url,
        method: 'GET',
        params: postData
      })

    }

    var getFiles = function(token, user, days) {
      var _url = url + 'files.list';
      var d = new Date();
      var daysAgo = d.setDate(d.getDate() - days);
      var postData = {
        ts_to: Math.round(daysAgo / 1000),
        user: user,
        token: token
      };
      return $http({
        url: _url,
        method: 'GET',
        params: postData
      });
    };

    var deleteFiles = function(token, fileId) {
      var _url = url + 'files.delete';
      var postData = {
        token: token,
        file: fileId
      };

      return $http({
        url: _url,
        method: 'GET',
        params: postData
      });
    };

    return {
      getUsers: getUsers,
      getFiles: getFiles,
      deleteFiles: deleteFiles
    }
  }
  angular
    .module('slackApp')
    .factory('slackServer', slackServer)

  slackServer.$inject = ['$http'];
})();
