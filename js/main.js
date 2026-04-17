// ===== countdown
simplyCountdown('.simply-countdown', {
  year: 2026, // required
  month: 11, // required
  day: 28, // required
  hours: 8, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: 'hari', plural: 'hari' },
    hours: { singular: 'jam', plural: 'jam' },
    minutes: { singular: 'menit', plural: 'menit' },
    seconds: { singular: 'detik', plural: 'detik' },
  },
});

// ===== navbar sticky
const stickyTop = document.querySelector('.sticky-top');
const offcanvas = document.querySelector('.offcanvas');

offcanvas.addEventListener('show.bs.offcanvas', function () {
  stickyTop.style.overflow = 'visible';
});

offcanvas.addEventListener('hidden.bs.offcanvas', function () {
  stickyTop.style.overflow = 'hidden';
});

//===== Back to top

$(function () {
  // Show or hide the sticky footer button
  $(window).on('scroll', function (event) {
    if ($(this).scrollTop() > 600) {
      $('.back-to-top').fadeIn(200);
    } else {
      $('.back-to-top').fadeOut(200);
    }
  });

  //Animate the scroll to yop
  $('.back-to-top').on('click', function (event) {
    event.preventDefault();

    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1500,
    );
  });
});

//disable scroll
const rootElement = document.querySelector(':root');
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const song = document.querySelector('#song');
let isPlaying = false;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = 'auto';
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = 'smooth';
  // localStorage.setItem('opened', 'true');
  playAudio();
}

function playAudio() {
  song.volume = 0.1;
  audioIconWrapper.style.display = 'flex';
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove('bi-disc');
    audioIcon.classList.add('bi-pause-circle');
  } else {
    song.play();
    audioIcon.classList.remove('bi-pause-circle');
    audioIcon.classList.add('bi-disc');
  }
  isPlaying = !isPlaying;
};

// if (!localStorage.getItem('opened')) {
//   disableScroll();
// }
disableScroll();

//konfirmasi kehadiran
window.addEventListener('load', function () {
  const form = document.getElementById('my-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    }).then(() => {
      swal('Berhasil', 'Konfirmasi Kehadiran Terkirim!', 'success');
    });
  });
});

//nama guest
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('n') || '';
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';

const namaContainer = document.querySelector('.hero h4 span');
namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ',');

document.querySelector('#nama').value = nama;
