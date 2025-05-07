// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const textToSpeakInput = document.getElementById('text-to-speak');
  const voiceSelect = document.getElementById('voice-select');
  const talkButton = document.querySelector('#explore button');
  const faceImage = document.querySelector('#explore img');

  const synth = window.speechSynthesis;
  let voices = [];

  // Populate the voice select dropdown
  function populateVoiceList() {
    const currentSelectedValue = voiceSelect.value;
    
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';

    // Add the default placeholder option first
    const placeholderOption = document.createElement('option');
    placeholderOption.value = "select";
    placeholderOption.textContent = "Select Voice:";
    placeholderOption.disabled = true;
    voiceSelect.appendChild(placeholderOption);

    let foundCurrentSelection = false;
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.value = voices[i].name;

      if (option.value === currentSelectedValue) {
        option.selected = true;
        foundCurrentSelection = true;
      }
      voiceSelect.appendChild(option);
    }

    if (!foundCurrentSelection) {
      placeholderOption.selected = true;
    }
  }

  // Populate the voice list when the page loads.
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // Press to talk button
  if (talkButton) {
    talkButton.addEventListener('click', () => {
      // Prevent speaking if the synthesizer is already active
      if (synth.speaking) {
        return;
      }

      const text = textToSpeakInput.value;
      // Do nothing if there's no text in the textarea
      if (text.trim() === '') {
        return;
      }

      const utterThis = new SpeechSynthesisUtterance(text);

      // Speech starts
      utterThis.onstart = () => {
        if (faceImage) {
          faceImage.src = 'assets/images/smiling-open.png';
        }
      };

      // Speech ends
      utterThis.onend = () => {
        if (faceImage) {
          faceImage.src = 'assets/images/smiling.png';
        }
      };

      // Speech error
      utterThis.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror:', event);
        if (faceImage) {
          faceImage.src = 'assets/images/smiling.png';
        }
      };

      // Get the selected voice from the dropdown
      const selectedVoiceName = voiceSelect.value;
      // Ensure a voice is selected and it's not the placeholder
      if (selectedVoiceName && selectedVoiceName !== 'select') {
        // Find the SpeechSynthesisVoice object that matches the selected name
        const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
        if (selectedVoice) {
          utterThis.voice = selectedVoice;
        }
      }

      synth.speak(utterThis);
    });
  }
}