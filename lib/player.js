// Initialize YouTube player
var ytPlayer;
onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('youtube', {
    height: '200',
    width: '200',
    videoId: '62E1MdaXcco',
    events: {
      // 'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Play the next song when the video ends
var onPlayerStateChange = function (e) {
  if (e.data == 0) {
    ClientPlaylist.songEnded();
  }
};

Player = {

  // Load IFrame Player API
  loadAPI: function () {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  loadTopSearchResult: function (keyword) {
    if (!ytPlayer || !ytPlayer.loadVideoById) {
      Meteor.setTimeout(function () {
        self.loadTopSearchResult(keyword);
      }, 1000);
    }
    var searchURI = 'http://gdata.youtube.com/feeds/api/videos?q=' +
                    encodeURIComponent(keyword) +
                    '&format=5&max-results=1&v=2&alt=jsonc';
    $.ajax({
      type: "GET",
      url: searchURI,
      dataType: "jsonp",
      success: function(responseData, textStatus, XMLHttpRequest) {
        if (responseData.data.items) {
          var video = responseData.data.items[0];
          ytPlayer.loadVideoById(video.id, 0, 'small');
        }
      }
    });
  },

  pause: function () {
    ytPlayer.pauseVideo();
  },

  play: function () {
    ytPlayer.playVideo();
  },

  setVolume: function (val) {
    if (ytPlayer && ytPlayer.setVolume) {
      ytPlayer.setVolume(val)
    }
  },

  getVolume: function () {
    if (ytPlayer && ytPlayer.setVolume) {
      return ytPlayer.getVolume();
    }
  },

  seekToFraction: function (percent) {
    if (ytPlayer && ytPlayer.seekTo) {
      ytPlayer.seekTo(percent * ytPlayer.getDuration());
    }
  },

  getCurrentFraction: function () {
    if (ytPlayer && ytPlayer.getCurrentTime) {
      return ytPlayer.getCurrentTime() / ytPlayer.getDuration();
    }
  },

  getCurrentTime: function () {
    if (ytPlayer && ytPlayer.getCurrentTime) {
      return ytPlayer.getCurrentTime();
    }
  },

};
var self = Player;
