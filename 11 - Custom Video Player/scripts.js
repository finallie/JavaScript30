const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = progress.querySelector('.progress__filled');
const playButton = player.querySelector('button.toggle');
const ranges = player.querySelectorAll('input[type="range"]');
const skipButtons = player.querySelectorAll('button[data-skip]');

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayButton() {
    playButton.innerHTML = video.paused ? '►' : '❚ ❚';
}

function updateProgressBar() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function handleRangeChange() {
    video[this.name] = this.value;
}

function handleSkip() {
    video.currentTime += +(this.dataset.skip);
}

function handleProgressChange(e) {
    video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', updateProgressBar);

progress.addEventListener('click', handleProgressChange);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousemove', e => mousedown && handleProgressChange(e));
document.addEventListener('mouseup', () => mousedown = false);


playButton.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', handleRangeChange));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeChange));
skipButtons.forEach(button => button.addEventListener('click', handleSkip));