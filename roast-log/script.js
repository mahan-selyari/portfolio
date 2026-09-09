/* =========================
   NAVIGATION
========================= */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

navItems.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();

    const target = item.dataset.page;

    navItems.forEach(nav => {
      nav.classList.remove("active");
    });

    item.classList.add("active");

    pages.forEach(page => {
      page.classList.remove("active-page");
    });

    const page = document.getElementById(target);

    if (page) {
      page.classList.add("active-page");
    }
  });
});


/* =========================
   BATCH DATA
========================= */

const batches = [
  {
    code: "BR-024",
    origin: "برزیل",
    date: "۱۸ شهریور",
    weight: "12 kg",
    loss: "15.2%",
    roast: "متوسط",
    status: "در حال برشته‌کاری",
    type: "roasting"
  },
  {
    code: "BR-023",
    origin: "کلمبیا",
    date: "۱۸ شهریور",
    weight: "8 kg",
    loss: "14.8%",
    roast: "متوسط",
    status: "تکمیل‌شده",
    type: "ready"
  },
  {
    code: "BR-022",
    origin: "اتیوپی",
    date: "۱۸ شهریور",
    weight: "6 kg",
    loss: "16.1%",
    roast: "روشن",
    status: "تکمیل‌شده",
    type: "ready"
  },
  {
    code: "BR-021",
    origin: "گواتمالا",
    date: "۱۷ شهریور",
    weight: "10 kg",
    loss: "17.3%",
    roast: "تیره",
    status: "تکمیل‌شده",
    type: "ready"
  },
  {
    code: "BR-020",
    origin: "برزیل",
    date: "۱۷ شهریور",
    weight: "12 kg",
    loss: "15.6%",
    roast: "متوسط",
    status: "تکمیل‌شده",
    type: "ready"
  },
  {
    code: "BR-019",
    origin: "کلمبیا",
    date: "۱۶ شهریور",
    weight: "8 kg",
    loss: "14.9%",
    roast: "روشن",
    status: "تکمیل‌شده",
    type: "ready"
  }
];


function statusClass(type) {
  return type === "ready"
    ? "status-done"
    : "status-cool";
}


function createBatchRow(batch, date = false) {

  return `
    <tr>
      <td>${batch.code}</td>
      <td>${batch.origin}</td>
      ${date ? `<td>${batch.date}</td>` : ""}
      <td>${batch.weight}</td>
      <td>${batch.loss}</td>
      <td>${batch.roast}</td>
      <td>
        <span class="status-pill ${statusClass(batch.type)}">
          ${batch.status}
        </span>
      </td>
    </tr>
  `;
}


/* =========================
   DASHBOARD TABLE
========================= */

const dashboardRows =
  document.getElementById("dashboardRows");

if (dashboardRows) {
  dashboardRows.innerHTML = batches
    .map(batch => createBatchRow(batch))
    .join("");
}


/* =========================
   ALL BATCHES
========================= */

const allBatchRows =
  document.getElementById("allBatchRows");

function renderBatches(list) {

  if (!allBatchRows) return;

  allBatchRows.innerHTML = list
    .map(batch => createBatchRow(batch, true))
    .join("");
}

renderBatches(batches);


/* =========================
   SEARCH
========================= */

const search =
  document.getElementById("batchSearch");

if (search) {

  search.addEventListener("input", () => {

    const value =
      search.value.trim().toLowerCase();

    const result = batches.filter(batch =>
      batch.code.toLowerCase().includes(value) ||
      batch.origin.toLowerCase().includes(value) ||
      batch.roast.toLowerCase().includes(value) ||
      batch.status.toLowerCase().includes(value)
    );

    renderBatches(result);
  });
}


/* =========================
   TEMPERATURE
========================= */

let temperature = 198;

const liveTemp =
  document.getElementById("liveTemp");

const machineTemp =
  document.getElementById("machineTemp");

setInterval(() => {

  temperature +=
    Math.floor(Math.random() * 5) - 2;

  temperature =
    Math.max(190, Math.min(215, temperature));

  if (liveTemp) {
    liveTemp.textContent = temperature;
  }

  if (machineTemp) {
    machineTemp.textContent =
      temperature + "°C";
  }

}, 2500);


/* =========================
   ROAST BUTTON
========================= */

const roastToggle =
  document.getElementById("roastToggle");

let roasting = false;

if (roastToggle) {

  roastToggle.addEventListener("click", () => {

    roasting = !roasting;

    if (roasting) {

      roastToggle.textContent =
        "توقف برشته‌کاری";

      roastToggle.classList.add("active");

    } else {

      roastToggle.textContent =
        "شروع برشته‌کاری";

      roastToggle.classList.remove("active");

    }

  });

}


/* =========================
   TEMPERATURE CHART
========================= */

const canvas =
  document.getElementById("tempChart");

if (canvas) {

  const ctx = canvas.getContext("2d");

  const drum = [
    72, 86, 101, 118, 132,
    147, 159, 170, 181, 190,
    198, 205, 211
  ];

  const exhaust = [
    55, 69, 81, 94, 106,
    119, 130, 142, 151, 161,
    170, 178, 184
  ];

  function drawLine(data, color) {

    ctx.beginPath();

    data.forEach((value, index) => {

      const x =
        index * (canvas.width / (data.length - 1));

      const y =
        canvas.height - 20 - value;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

    });

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }


  function drawChart() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    /* Grid */

    ctx.strokeStyle = "#3A2C20";
    ctx.lineWidth = 1;

    for (let i = 0; i < 5; i++) {

      const y = 25 + i * 40;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }


    drawLine(drum, "#C97A3D");
    drawLine(exhaust, "#7FA875");
  }

  drawChart();
}