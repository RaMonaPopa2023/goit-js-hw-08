import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

function loadSavedTime(player) {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime));
  }
}

function handleTimeUpdate(data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}

function initializePlayer() {
  const iframe = document.querySelector('iframe');
  const player = new Vimeo.Player(iframe);

  loadSavedTime(player);

  const throttledTimeUpdate = throttle(handleTimeUpdate, 1000);

  player.on('timeupdate', throttledTimeUpdate);

  player.on('play', function () {
    console.log('played the video!');
  });

  player.getVideoTitle().then(function (title) {
    console.log('title:', title);
  });
}

initializePlayer();
