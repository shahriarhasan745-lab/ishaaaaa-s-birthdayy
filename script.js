const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

function playWelcomeAudio(audioUrl) {
    // Create the audio object
    const audio = new Audio(audioUrl);
    
    // Attempt to autoplay immediately
    audio.play()
        .then(() => {
            console.log("Audio started playing successfully!");
        })
        .catch(error => {
            console.log("Autoplay blocked by browser. Waiting for user interaction...");
            
            // Fallback: Play audio on the very first click/tap on the page
            const playOnInteraction = () => {
                audio.play()
                    .then(() => {
                        console.log("Audio played after user interaction.");
                        // Remove the event listener so it doesn't trigger again on future clicks
                        document.removeEventListener('click', playOnInteraction);
                    })
                    .catch(e => console.error("Playback failed:", e));
            };
            
            document.addEventListener('click', playOnInteraction);
        });
}

// How to trigger it when the page loads:
window.addEventListener('DOMContentLoaded', () => {
    // Replace this URL with the actual path to your audio file (mp3, wav, etc.)
    playWelcomeAudio('./Ricky_Montgomery_-_Line_Without_a_Hook_(mp3.pm).mp3');
});
