class DrumKit {
  constructor() {
    //btns
    this.muteBtns = document.querySelectorAll(".mute");
    this.playBtn = document.querySelector(".play-btn");

    //selects
    this.selects = document.querySelectorAll(".select");

    //pads
    this.pads = document.querySelectorAll(".pad");

    //tempo slider
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.tempoNr = document.querySelector(".tempo-nr");

    //sounds
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");

    this.index = 0;
    this.isPlaying = null;
    this.bpm = 128;
    this.loop = null;
  }

  activeClass() {
    this.classList.toggle("active");
  }

  LoopThroughPads() {
    let step = this.index % 8;

    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.2s alternate ease-in-out 2`;

      if (
        bar.classList.contains("kick-pad") &&
        bar.classList.contains("active")
      ) {
        this.kickSound.currentTime = 0;
        this.kickSound.play();
      }
      if (
        bar.classList.contains("snare-pad") &&
        bar.classList.contains("active")
      ) {
        this.snareSound.currentTime = 0;
        this.snareSound.play();
      }
      if (
        bar.classList.contains("hihat-pad") &&
        bar.classList.contains("active")
      ) {
        this.hihatSound.currentTime = 0;
        this.hihatSound.play();
      }
    });
    this.index++;
  }

  startStop() {
    let interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.loop = setInterval(() => {
        this.LoopThroughPads();
      }, interval);
    } else {
      clearInterval(this.loop);
      this.isPlaying = null;
    }
  }

  changeName() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = "Start";
      this.playBtn.classList.remove("active");
    }
  }

  mute(e) {
    console.log(e.target);
    console.log(this.kickSound);
    if (
      e.target.classList.contains("kick-mute") &&
      e.target.classList.contains("active")
    ) {
      this.kickSound.volume = 0;
    } else if (
      e.target.classList.contains("kick-mute") &&
      !e.target.classList.contains("active")
    ) {
      this.kickSound.volume = 1;
    }
    if (
      e.target.classList.contains("snare-mute") &&
      e.target.classList.contains("active")
    ) {
      this.snareSound.volume = 0;
    } else if (
      e.target.classList.contains("snare-mute") &&
      !e.target.classList.contains("active")
    ) {
      this.snareSound.volume = 1;
    }
    if (
      e.target.classList.contains("hihat-mute") &&
      e.target.classList.contains("active")
    ) {
      this.hihatSound.volume = 0;
    } else if (
      e.target.classList.contains("hihat-mute") &&
      !e.target.classList.contains("active")
    ) {
      this.hihatSound.volume = 1;
    }
  }

  changeSounds(e) {
    let name = e.target.name;
    let option = e.target.value;

    switch (name) {
      case "kick-select":
        this.kickSound.src = option;
        break;
      case "snare-select":
        this.snareSound.src = option;
        break;
      case "hihat-select":
        this.hihatSound.src = option;
        break;
    }
  }

  changeTempo(e) {
    this.tempoNr.innerHTML = e.target.value;
  }

  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.loop);
    this.isPlaying = null;
    console.log(this.playBtn.classList.contains("active"));
    if (this.playBtn.classList.contains("active")) {
      this.startStop();
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activeClass);
  pad.addEventListener("animationend", () => {
    pad.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.changeName();
  drumKit.startStop();
});

drumKit.muteBtns.forEach((mute) => {
  mute.addEventListener("click", drumKit.activeClass);
  mute.addEventListener("click", (e) => {
    drumKit.mute(e);
  });
});

drumKit.selects.forEach((select) => {
  select.addEventListener("click", (e) => {
    drumKit.changeSounds(e);
  });
});

drumKit.tempoSlider.addEventListener("input", (e) => {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", (e) => {
  drumKit.updateTempo(e);
});

function reveal() {
  const constructor = new ScrollMagic.Controller();
  const intro = document.querySelector(".intro");
  const name = document.querySelector(".name");
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power2.inOut",
    },
  });
  tl.fromTo(name, 0.5, { opacity: 0 }, { opacity: 1 });
  tl.to(intro, 0.5, { x: "0%" });
  tl.to(intro, 2, { x: "100%" });
}

reveal();
