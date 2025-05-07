const songs = [
    {
      name: 'song1',
      title: 'Closer',
      artist: 'The Chainsmokers',
      cover: 'cover1.png'
    },
    {
      name: 'song2',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      cover: 'cover2.png'
    },
    {
      name: 'song3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      cover: 'cover3.png'
    }
  ];
  
  let isPlaying = false;
  let songIndex = 0;
  
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const title = document.getElementById('title');
  const artist = document.getElementById('artist');
  const cover = document.getElementById('cover');
  const progress = document.getElementById('progress');
  const progressContainer = document.querySelector('.progress-container');
  
  // Load initial song
  function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = `${song.name}.mp3`;
  }
  
  loadSong(songs[songIndex]);
  
  // Play
  function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = '⏸';
  }
  
  // Pause
  function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = '▶';
  }
  
  playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
  });
  
  // Next song
  function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // Previous song
  function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  }
  
  nextBtn.addEventListener('click', nextSong);
  prevBtn.addEventListener('click', prevSong);

  
  // Progress bar update
  audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
  });
  
  // Seek on progress bar click
  progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  });
  
  // Auto play next
  audio.addEventListener('ended', nextSong);