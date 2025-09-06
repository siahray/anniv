document.addEventListener('DOMContentLoaded', function() {
    // Get all music players
    const musicPlayers = document.querySelectorAll('.music-player');
    
    // Initialize each music player
    musicPlayers.forEach((player, index) => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        const playIcon = playBtn.querySelector('.play-icon');
        const prevBtn = player.querySelector('.prev-btn');
        const nextBtn = player.querySelector('.next-btn');
        const likeBtn = player.querySelector('.like-btn');
        const shuffleBtn = player.querySelector('.shuffle-btn');
        const progressBar = player.querySelector('.progress-bar');
        const progressIndicator = player.querySelector('.progress-indicator');
        
        // Set initial state
        let isPlaying = false;
        let isLiked = false;
        let isShuffle = false;
        
        // Function to toggle play/pause
        function togglePlay() {
            if (isPlaying) {
                audio.pause();
                playIcon.textContent = '▶';
                isPlaying = false;
            } else {
                // Pause all other audio elements first
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio) {
                        a.pause();
                        // Reset play button icon for other players
                        const otherPlayer = a.closest('.music-player');
                        if (otherPlayer) {
                            const otherPlayIcon = otherPlayer.querySelector('.play-icon');
                            if (otherPlayIcon) otherPlayIcon.textContent = '▶';
                        }
                    }
                });
                
                audio.play();
                playIcon.textContent = '⏸';
                isPlaying = true;
            }
        }
        
        // Play/Pause button click event
        playBtn.addEventListener('click', togglePlay);
        
        // Like button click event
        likeBtn.addEventListener('click', function() {
            isLiked = !isLiked;
            if (isLiked) {
                likeBtn.style.color = '#ff4757';
            } else {
                likeBtn.style.color = '#333';
            }
        });
        
        // Shuffle button click event
        shuffleBtn.addEventListener('click', function() {
            isShuffle = !isShuffle;
            if (isShuffle) {
                shuffleBtn.style.color = '#1e90ff';
            } else {
                shuffleBtn.style.color = '#333';
            }
        });
        
        // Previous button click event (simulated)
        prevBtn.addEventListener('click', function() {
            // Reset current audio
            audio.currentTime = 0;
            if (isPlaying) {
                audio.play();
            }
            
            // Visual feedback
            prevBtn.classList.add('active');
            setTimeout(() => prevBtn.classList.remove('active'), 200);
        });
        
        // Next button click event (simulated)
        nextBtn.addEventListener('click', function() {
            // Reset current audio
            audio.currentTime = 0;
            if (isPlaying) {
                audio.play();
            }
            
            // Visual feedback
            nextBtn.classList.add('active');
            setTimeout(() => nextBtn.classList.remove('active'), 200);
        });
        
        // Update progress bar as audio plays
        audio.addEventListener('timeupdate', function() {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressIndicator.style.left = `${progress}%`;
        });
        
        // Allow seeking by clicking on progress bar
        progressBar.addEventListener('click', function(e) {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
        });
        
        // Handle audio end
        audio.addEventListener('ended', function() {
            playIcon.textContent = '▶';
            isPlaying = false;
            progressIndicator.style.left = '0%';
            audio.currentTime = 0;
        });
    });
});