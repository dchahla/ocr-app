angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats) {
  //TODO remove chats
  $scope.chats = Chats.all();

  // var callback = function(buttonIndex) {
  //   setTimeout(function() {
  //     // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
  //     alert('button index clicked: ' + buttonIndex);
  //   });
  // };
  // $scope.getPhoto = function() {
  //   var options = {
  //       // 'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT, // default is THEME_TRADITIONAL
  //       'title': 'What do you want with this image?',
  //       'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
  //       'androidEnableCancelButton' : true, // default false
  //       'winphoneEnableCancelButton' : true, // default false
  //       'addCancelButtonWithLabel': 'Cancel',
  //       'addDestructiveButtonWithLabel' : 'Delete it'
  //       // 'position': [20, 40] // for iPad pass in the [x, y] position of the popover
  //   };
  //   window.plugins.actionsheet.show(options, callback);
  // };

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // alert('Great success! All the File APIs are supported.');
    function handleFileSelect(evt) {
        // console.log(window.FileReader.readAsDataURL(window.Blob));
        var files = evt.target.files; // FileList object
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              var span = document.createElement('span');
              console.log(e.target.result);
              span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');
              document.getElementById('list').insertBefore(span, null);
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                      '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
      }
      document.getElementById('files').addEventListener('change', handleFileSelect, false);


  } else {
    var p = window.mediaDevices.getUserMedia({ audio: true, video: true });

    p.then(function(mediaStream) {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(mediaStream);
      video.onloadedmetadata = function(e) {
        // Do something with the video here.
        console.log(e);
      };
    });

    p.catch(function(err) { console.log(err.name); }); // always check for errors at the end.
  }


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
