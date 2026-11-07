// Personalize the questions and messages here.
const SETTINGS = {
  nickname: "Bubu",
  giftQuestion: "இந்த தீபாவளிக்கு உனக்கு என்ன gift வேணும்?",
  promiseQuestion: "2034-ல நமக்கு thala தீபாவளி. ok-வா? ❤️",
  promiseMessage: "Celebrate this Diwali safely, Bubu.<br><br>I will always be there for you—not just this Diwali, but for every Diwali in our future.<br><br>Thank you for making my life so beautiful. ❤️"
};

const $ = (id) => document.getElementById(id);

const openingBgm = $("openingBgm");
const fingerprintBgm = $("fingerprintBgm");
const song = $("dedicatedSong");

function show(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const next = $(screenId);
  if (next) next.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function stopAndReset(audio) {
  if (!audio) return;

  audio.pause();

  try {
    audio.currentTime = 0;
  } catch (_) {}
}

function playAudio(audio) {
  if (!audio) return;

  const result = audio.play();

  if (result && typeof result.catch === "function") {
    result.catch(() => {});
  }
}

function startOpeningMusic() {
  stopAndReset(fingerprintBgm);
  playAudio(openingBgm);
}

function moveButton(button) {
  const x = Math.round((Math.random() - 0.5) * 220);
  const y = Math.round((Math.random() - 0.5) * 100);

  button.style.transform = `translate(${x}px, ${y}px)`;
}

// Apply customized questions and messages.
$("giftQuestion").textContent = SETTINGS.giftQuestion;
$("promiseQuestion").textContent = SETTINGS.promiseQuestion;
$("promiseMessage").innerHTML = SETTINGS.promiseMessage;

// Welcome page: nickname verification.
$("enterBtn").addEventListener("click", () => {
  const entered = $("nickname").value.trim().toLowerCase();
  const expected = SETTINGS.nickname.trim().toLowerCase();

  if (entered !== expected) {
    $("nicknameHint").textContent =
      "That's not the secret name. Try again, Bubu ❤️";
    return;
  }

  $("nicknameHint").textContent = "You found the way in! ❤️";

  startOpeningMusic();
  show("love");
});

// Pressing Enter also submits the nickname.
$("nickname").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    $("enterBtn").click();
  }
});

// Love question: the NO button runs away.
const noBtn = $("noBtn");

noBtn.addEventListener("pointerenter", () => moveButton(noBtn));
noBtn.addEventListener("click", () => moveButton(noBtn));

$("yesBtn").addEventListener("click", () => {
  show("diwali");
});

// Continue to gift question.
$("giftNext").addEventListener("click", () => {
  show("gift");
});

// Gift selection.
document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice").forEach((choice) => {
      choice.classList.remove("selected");
    });

    button.classList.add("selected");

    $("giftHint").textContent =
      `Your choice: ${button.dataset.choice}. I'll make it special ❤️`;

    window.setTimeout(() => {
      show("promise");
    }, 900);
  });
});

// 2034 promise question.
const promiseNoBtn = $("promiseNoBtn");

promiseNoBtn.addEventListener("pointerenter", () => {
  moveButton(promiseNoBtn);
});

promiseNoBtn.addEventListener("click", () => {
  moveButton(promiseNoBtn);
});

$("okayBtn").addEventListener("click", () => {
  show("message");
});

// Dedicated song page.
$("songNext").addEventListener("click", () => {
  stopAndReset(openingBgm);

  show("song");
  playAudio(song);
});

// Open fingerprint page after the song ends.
function openFingerprintScene() {
  stopAndReset(openingBgm);
  stopAndReset(song);

  show("fingerprint");
  playAudio(fingerprintBgm);
}

song.addEventListener("ended", openFingerprintScene);

$("songFinishedBtn").addEventListener("click", () => {
  openFingerprintScene();
});

// Playful fingerprint scanning animation.
$("scanBtn").addEventListener("click", () => {
  const button = $("scanBtn");
  const hint = $("scanHint");

  button.classList.add("scanning");
  button.disabled = true;

  hint.textContent = "Scanning your little promise… ❤️";

  window.setTimeout(() => {
    show("final");
  }, 1400);
});

// Replay the experience.
$("replayBtn").addEventListener("click", () => {
  stopAndReset(openingBgm);
  stopAndReset(fingerprintBgm);
  stopAndReset(song);

  $("nickname").value = "";
  $("nicknameHint").textContent = "";
  $("giftHint").textContent = "";

  $("scanHint").textContent =
    "Tap the fingerprint to begin the playful scan.";

  $("scanBtn").disabled = false;
  $("scanBtn").classList.remove("scanning");

  noBtn.style.transform = "";
  promiseNoBtn.style.transform = "";

  document.querySelectorAll(".choice").forEach((choice) => {
    choice.classList.remove("selected");
  });

  show("welcome");
});