/* =========================
   ELEMENTS
========================= */

const body =
  document.body;

const header =
  document.getElementById("header");

const nav =
  document.getElementById("nav");

const menuBtn =
  document.getElementById("menuBtn");

const themeBtn =
  document.getElementById("themeBtn");

const bookingModal =
  document.getElementById("bookingModal");

const closeBooking =
  document.getElementById("closeBooking");

const bookingForm =
  document.getElementById("bookingForm");

const toast =
  document.getElementById("toast");


/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", () => {

  nav.classList.toggle("active");

});


document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

    });

  });


/* =========================
   HEADER SCROLL
========================= */

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});


/* =========================
   THEME
========================= */

const savedTheme =
  localStorage.getItem("arona-theme");

if (savedTheme === "dark") {

  body.classList.add("dark");

  themeBtn.textContent = "☾";

}


themeBtn.addEventListener("click", () => {

  body.classList.toggle("dark");

  const dark =
    body.classList.contains("dark");

  localStorage.setItem(
    "arona-theme",
    dark ? "dark" : "light"
  );

  themeBtn.textContent =
    dark ? "☾" : "☼";

});


/* =========================
   BOOKING MODAL
========================= */

const openBookingButtons = [

  document.getElementById("headerAppointment"),
  document.getElementById("heroAppointment"),
  document.getElementById("aboutAppointment"),
  document.getElementById("ctaAppointment")

];


function openBooking() {

  bookingModal.classList.add("active");

  document.body.style.overflow = "hidden";

}


function closeBookingModal() {

  bookingModal.classList.remove("active");

  document.body.style.overflow = "";

}


openBookingButtons.forEach(button => {

  if (!button) return;

  button.addEventListener(
    "click",
    openBooking
  );

});


closeBooking.addEventListener(
  "click",
  closeBookingModal
);


bookingModal.addEventListener(
  "click",
  event => {

    if (event.target === bookingModal) {

      closeBookingModal();

    }

  }
);


/* =========================
   BOOKING FORM
========================= */

const dateInput =
  document.getElementById("date");

const today =
  new Date();

const yyyy =
  today.getFullYear();

const mm =
  String(today.getMonth() + 1)
    .padStart(2, "0");

const dd =
  String(today.getDate())
    .padStart(2, "0");

dateInput.min =
  `${yyyy}-${mm}-${dd}`;


bookingForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const name =
      document.getElementById("name").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const service =
      document.getElementById("service").value;

    const date =
      document.getElementById("date").value;

    const time =
      document.getElementById("time").value;


    if (
      !name ||
      !phone ||
      !service ||
      !date ||
      !time
    ) {

      showToast(
        "لطفاً همه اطلاعات را تکمیل کنید."
      );

      return;

    }


    if (phone.length < 10) {

      showToast(
        "شماره تماس واردشده صحیح نیست."
      );

      return;

    }


    closeBookingModal();

    bookingForm.reset();


    showToast(
      `درخواست نوبت ${service} برای شما ثبت شد.`
    );

  }
);


/* =========================
   SERVICE FILTER
========================= */

const filters =
  document.querySelectorAll(".service-filter");

const serviceCards =
  document.querySelectorAll(".service-card");


filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(item => {

      item.classList.remove("active");

    });

    filter.classList.add("active");


    const category =
      filter.dataset.filter;


    serviceCards.forEach(card => {

      const cardCategory =
        card.dataset.category;


      if (
        category === "all" ||
        cardCategory === category
      ) {

        card.style.display = "";

        requestAnimationFrame(() => {

          card.style.opacity = "1";
          card.style.transform = "translateY(0)";

        });

      } else {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {

          card.style.display = "none";

        }, 250);

      }

    });

  });

});


/* =========================
   SERVICE BUTTONS
========================= */

document
  .querySelectorAll(".service-link")
  .forEach(button => {

    button.addEventListener("click", () => {

      const service =
        button.dataset.service;


      document.getElementById("service").value =
        service;


      openBooking();

    });

  });


/* =========================
   FAQ
========================= */

document
  .querySelectorAll(".faq-question")
  .forEach(question => {

    question.addEventListener("click", () => {

      const current =
        question.parentElement;


      document
        .querySelectorAll(".faq-item")
        .forEach(item => {

          if (item !== current) {

            item.classList.remove("open");

          }

        });


      current.classList.toggle("open");

    });

  });


/* =========================
   REVIEWS
========================= */

const reviews = [

  {
    text:
      "تجربه من از آرونا واقعاً عالی بود. قبل از انجام کار همه چیز با حوصله برایم توضیح داده شد و نتیجه کاملاً طبیعی شد.",

    name:
      "سارا محمدی",

    service:
      "جوانسازی پوست"

  },

  {
    text:
      "محیط کلینیک خیلی آرام و حرفه‌ای بود. چیزی که بیشتر از همه دوست داشتم این بود که اصلاً حس نمی‌کردم قرار است کار غیرطبیعی انجام شود.",

    name:
      "نگار احمدی",

    service:
      "مراقبت پوستی"

  },

  {
    text:
      "از مشاوره تا پایان کار برخورد تیم آرونا بسیار حرفه‌ای بود. نتیجه دقیقاً چیزی شد که می‌خواستم.",

    name:
      "مریم رضایی",

    service:
      "لیزر و مراقبت پوست"

  }

];


let currentReview = 0;


const reviewText =
  document.getElementById("reviewText");

const reviewName =
  document.getElementById("reviewName");

const reviewService =
  document.getElementById("reviewService");

const reviewDots =
  document.getElementById("reviewDots");


function renderReview() {

  const review =
    reviews[currentReview];


  reviewText.textContent =
    review.text;

  reviewName.textContent =
    review.name;

  reviewService.textContent =
    review.service;


  reviewDots.innerHTML =
    reviews
      .map(
        (_, index) => `
          <span
            class="${index === currentReview ? "active" : ""}">
          </span>
        `
      )
      .join("");

}


document
  .getElementById("nextReview")
  .addEventListener("click", () => {

    currentReview++;

    if (
      currentReview >= reviews.length
    ) {

      currentReview = 0;

    }

    renderReview();

  });


document
  .getElementById("prevReview")
  .addEventListener("click", () => {

    currentReview--;

    if (currentReview < 0) {

      currentReview =
        reviews.length - 1;

    }

    renderReview();

  });


renderReview();


/* =========================
   COUNTERS
========================= */

const counters =
  document.querySelectorAll("[data-count]");

let countersStarted = false;


function startCounters() {

  if (countersStarted) return;

  countersStarted = true;


  counters.forEach(counter => {

    const target =
      Number(counter.dataset.count);

    let current = 0;

    const increment =
      Math.max(1, Math.ceil(target / 60));


    const update = () => {

      current += increment;

      if (current >= target) {

        current = target;

      }


      counter.textContent =
        current.toLocaleString("fa-IR");


      if (current < target) {

        requestAnimationFrame(update);

      }

    };


    update();

  });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold:.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================
   COUNTER OBSERVER
========================= */

const statsSection =
  document.querySelector(".stats");


const statsObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          startCounters();

          statsObserver.disconnect();

        }

      });

    },

    {
      threshold:.3
    }

  );


statsObserver.observe(statsSection);


/* =========================
   TOAST
========================= */

let toastTimer;


function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add("active");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(() => {

      toast.classList.remove("active");

    }, 3200);

}


/* =========================
   ESCAPE
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeBookingModal();

      nav.classList.remove("active");

    }

  }
);