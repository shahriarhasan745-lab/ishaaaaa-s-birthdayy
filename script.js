// Slider Functionality
const slider = document.querySelector('.slider');

function activate(e) {
    const items = document.querySelectorAll('.item');
    
    // Using closest() to reliably catch clicks on ion-icons or their SVG elements
    const nextBtn = e.target.closest('.next');
    const prevBtn = e.target.closest('.prev');

    if (nextBtn) {
        slider.append(items[0]);
    } else if (prevBtn) {
        slider.prepend(items[items.length - 1]);
    }
}

document.addEventListener('click', activate, false);


// Audio Functionality
function playWelcomeAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.loop = true; // Song continuous loop-e cholbe

    // Attempt to autoplay immediately when page loads
    audio.play()
        .then(() => {
            console.log("Audio started playing successfully!");
        })
        .catch(error => {
            console.log("Autoplay blocked by browser. Waiting for first user interaction...");

            // Fallback: Play audio on the very first click/tap anywhere on the page
            const playOnInteraction = () => {
                audio.play()
                    .then(() => {
                        console.log("Audio played after user interaction.");
                        // Remove listener so it doesn't trigger again on subsequent clicks
                        document.removeEventListener('click', playOnInteraction);
                    })
                    .catch(e => console.error("Playback failed:", e));
            };

            document.addEventListener('click', playOnInteraction);
        });
}

// Trigger audio on DOM Load
window.addEventListener('DOMContentLoaded', () => {
    // Ricky Montgomery - Line Without a Hook track
    playWelcomeAudio('./Ricky_Montgomery_-_Line_Without_a_Hook_(mp3.pm).mp3');
});
