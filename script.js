$(function () {
  initializePet();
  checkAndUpdatePetInfoInHtml();

  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);
  $('.walk-button').click(clickedWalkButton);
  $('.bath-button').click(clickedBathButton);
  $('.reset-button').click(clickedResetButton);
});

var pet_info;

function initializePet() {
  pet_info = {
    name: "Rocky",
    weight: 10,
    happiness: 5,
    energy: 5,
    treatCount: 0,
    playCount: 0,
    exerciseCount: 0,
    napCount: 0,
    walkCount: 0,
    bathCount: 0
  };
}

function clickedTreatButton() {
  if (pet_info.weight >= 30) {
    showMessage("Rocky says: No more treats, I'm too full.");
    return;
  }

  pet_info.happiness += 1;
  pet_info.weight += 1;
  pet_info.energy += 1;
  pet_info.treatCount += 1;

  showMessage("Rocky says: Yum! I love treats!");
  playSound();
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  if (pet_info.energy <= 0) {
    showMessage("Rocky says: I'm too tired to play.");
    return;
  }

  pet_info.happiness += 2;
  pet_info.weight -= 1;
  pet_info.energy -= 1;
  pet_info.playCount += 1;

  showMessage("Rocky says: That was fun!");
  playSound();
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  if (pet_info.energy <= 1) {
    showMessage("Rocky says: I need more energy before exercise.");
    return;
  }

  pet_info.happiness -= 1;
  pet_info.weight -= 1;
  pet_info.energy -= 2;
  pet_info.exerciseCount += 1;

  showMessage("Rocky says: Whew... that was hard work.");
  playSound();
  checkAndUpdatePetInfoInHtml();
}

function clickedNapButton() {
  if (pet_info.energy >= 10) {
    showMessage("Rocky says: I'm not tired right now.");
    return;
  }

  pet_info.energy += 3;
  pet_info.happiness += 1;
  pet_info.napCount += 1;

  showMessage("Rocky says: That nap was perfect.");
  playSound();
  checkAndUpdatePetInfoInHtml();
}

function clickedWalkButton() {
  if (pet_info.energy <= 0) {
    showMessage("Rocky says: I need rest before a walk.");
    return;
  }

  pet_info.happiness += 1;
  pet_info.weight -= 1;
  pet_info.energy -= 1;
  pet_info.walkCount += 1;

  showMessage("Rocky says: I loved that walk!");
  playSound();
  checkAndUpdatePetInfoInHtml();
}

function clickedBathButton() {
  if (pet_info.energy <= 0) {
    showMessage("Rocky says: Bath time can wait, I'm tired.");
    return;
  }

  pet_info.happiness += 1;
  pet_info.energy -= 1;
  pet_info.bathCount += 1;

  showMessage("Rocky says: I feel clean and fresh!");
  playSound();
  checkAndUpdatePetInfoInHtml();
}

function clickedResetButton() {
  initializePet();
  showMessage("Rocky says: I feel brand new!");
  checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
  checkPetLimits();
  updatePetInfoInHtml();
  updateBars();
  updateCounters();
  updateButtons();
}

function checkPetLimits() {
  if (pet_info.weight < 1) {
    pet_info.weight = 1;
  }
  if (pet_info.weight > 30) {
    pet_info.weight = 30;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
  if (pet_info.happiness > 10) {
    pet_info.happiness = 10;
  }

  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }
  if (pet_info.energy > 10) {
    pet_info.energy = 10;
  }
}

function updatePetInfoInHtml() {
  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);
  $('.energy').text(pet_info.energy);

  var mood = "Okay";
  var message = "Rocky says: I'm doing okay!";
  var status = "Rocky is feeling normal.";
  var title = "Rocky the Puppy";
  var messageClass = "message-normal";
  var bodyMoodClass = "";
  var imageClass = "";

  if (pet_info.energy <= 2) {
    mood = "Sleepy";
    message = "Rocky says: I'm so sleepy...";
    status = "Rocky needs rest.";
    title = "Sleepy Rocky";
    messageClass = "message-sleepy";
    bodyMoodClass = "mood-sleepy";
    imageClass = "sleepy";
  } else if (pet_info.happiness <= 2) {
    mood = "Sad";
    message = "Rocky says: I feel sad...";
    status = "Rocky needs something fun.";
    title = "Sad Rocky";
    messageClass = "message-sad";
    bodyMoodClass = "mood-sad";
    imageClass = "sad";
  } else if (pet_info.happiness >= 8) {
    mood = "Happy";
    message = "Rocky says: I'm super happy!";
    status = "Rocky is full of joy.";
    title = "Rocky the Happy Pup";
    messageClass = "message-happy";
    bodyMoodClass = "mood-happy";
    imageClass = "happy";
  }

  if (pet_info.weight <= 2) {
    mood = "Hungry";
    message = "Rocky says: I need food!";
    status = "Rocky is very hungry.";
    title = "Hungry Rocky";
    messageClass = "message-hungry";
    bodyMoodClass = "mood-hungry";
    imageClass = "";
  } else if (pet_info.weight >= 20) {
    mood = "Too Full";
    message = "Rocky says: I think I ate too much...";
    status = "Rocky should slow down on treats.";
    title = "Chunky Rocky";
    messageClass = "message-full";
    bodyMoodClass = "mood-full";
    imageClass = "";
  }

  $('.mood').text(mood);
  $('.status-text').text(status);
  $('.pet-title').text(title);

  $('.pet-message')
    .removeClass('message-normal message-happy message-sad message-sleepy message-hungry message-full')
    .addClass(messageClass)
    .text(message);

  $('.pet-image').removeClass('happy sad sleepy').addClass(imageClass);

  $('body')
    .removeClass('mood-happy mood-sad mood-sleepy mood-hungry mood-full')
    .addClass(bodyMoodClass);
}

function updateBars() {
  var happinessPercent = (pet_info.happiness / 10) * 100;
  var energyPercent = (pet_info.energy / 10) * 100;
  var weightPercent = (pet_info.weight / 30) * 100;

  $('.happiness-bar').css('width', happinessPercent + '%');
  $('.energy-bar').css('width', energyPercent + '%');
  $('.weight-bar').css('width', weightPercent + '%');
}

function updateCounters() {
  $('.treat-count').text(pet_info.treatCount);
  $('.play-count').text(pet_info.playCount);
  $('.exercise-count').text(pet_info.exerciseCount);
  $('.nap-count').text(pet_info.napCount);
  $('.walk-count').text(pet_info.walkCount);
  $('.bath-count').text(pet_info.bathCount);
}

function updateButtons() {
  $('.play-button').prop('disabled', pet_info.energy <= 0);
  $('.exercise-button').prop('disabled', pet_info.energy <= 1);
  $('.walk-button').prop('disabled', pet_info.energy <= 0);
  $('.bath-button').prop('disabled', pet_info.energy <= 0);
  $('.nap-button').prop('disabled', pet_info.energy >= 10);
  $('.treat-button').prop('disabled', pet_info.weight >= 30);
}

function showMessage(message) {
  $('.pet-message')
    .stop(true, true)
    .text(message)
    .toggleClass('highlight');

  $('.pet-message').slideToggle(100).slideToggle(100);

  // jQuery method #1:
  // .toggleClass() adds or removes the "highlight" class each time a new message appears.
  // jQuery method #2:
  // .slideToggle() creates a sliding animation so the message update is more noticeable.
}

function playSound() {
  var sound = $('#pet-sound')[0];

  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
