// expose.js

window.addEventListener('DOMContentLoaded', init);

// -- Change Horn --
function changeHorn(imagePath, altText) {

  const imageElement = document.querySelector('#expose > img');

  if (imageElement) {
    imageElement.src = imagePath;
    imageElement.alt = altText;
  } else {
    console.error("Image element not found");
  }
}

// -- Update Volume Icon --
function updateVolumeIcon(volumeLevel, audioElement, volumeIcon) {

  const numericVolume = parseInt(volumeLevel);

  if (audioElement) {
    audioElement.volume = numericVolume / 100;
  }

  // Update volume icon
  if (volumeIcon) {
    if (numericVolume === 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
      volumeIcon.alt = 'Volume level 0 (Mute)';
    } else if (numericVolume < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
      volumeIcon.alt = 'Volume level 1';
    } else if (numericVolume < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
      volumeIcon.alt = 'Volume level 2';
    } else { // 67 and up
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
      volumeIcon.alt = 'Volume level 3';
    }
  } else {
    console.error("Volume icon not found.");
  }
}

function init() {
  const hornSelect = document.getElementById("horn-select");
  const audioElement = document.querySelector('audio.hidden');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls > img');
  const playButton = document.querySelector('#expose > button');


  // -- Horn Select --
  hornSelect.addEventListener("change", function() {
    const selectedHorn = this.value;
    let newImagePath = "";
    let newAltText = "";
    let newAudioPath = "";

    if (selectedHorn === "select") {
      newImagePath = "assets/images/no-image.png";
      newAltText = "No image selected";
      newAudioPath = "";
    } else {
      newImagePath = `assets/images/${selectedHorn}.svg`;
      newAltText = `${selectedHorn.replace('-', ' ')} horn`;
      newAudioPath = `assets/audio/${selectedHorn}.mp3`;
    }

    changeHorn(newImagePath, newAltText);
    if (audioElement) audioElement.src = newAudioPath;
  });

  //   switch (selectedHorn) {
  //     case "air-horn":
  //       imagePath = "assets/images/air-horn.svg";
  //       altText = "Air Horn";
  //       audioPath = "assets/audio/air-horn.mp3";
  //       break;
  //     case "car-horn":
  //       imagePath = "assets/images/car-horn.svg";
  //       altText = "Car Horn";
  //       audioPath = "assets/audio/car-horn.mp3";
  //       break;
  //     case "party-horn":
  //       imagePath = "assets/images/party-horn.svg";
  //       altText = "Party Horn";
  //       audioPath = "assets/audio/party-horn.mp3";
  //       break;
  //     default:
  //       console.error("Invalid horn selected");
  //       return;
  //   }

  //   changeImage(imagePath, altText);
    
  // });

  // -- Volume Controls --
  if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
      updateVolumeIcon(this.value, audioElement, volumeIcon);
    });

    updateVolumeIcon(volumeSlider.value, audioElement, volumeIcon);
  } else {
    console.error("Volume slider not found.");
  }

  // -- Play Button --
  if (playButton) {
    playButton.addEventListener('click', function() {
      if (!audioElement) {
        console.error("Audio element not found.");
        return;
      }

      if (audioElement.src && audioElement.src !== window.location.href) {
        audioElement.play()
          .catch(error => console.error("Error playing audio:", error));

        if (hornSelect.value === 'party-horn') {
          if (typeof JSConfetti !== 'undefined') {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();
          } else {
            console.error("JSConfetti library not loaded.");
          }
        }
      }
    });
  } else {
    console.error("Play Sound button not found.");
  }
}