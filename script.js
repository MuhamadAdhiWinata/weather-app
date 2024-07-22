document.addEventListener("DOMContentLoaded", function () {
  // Menampilkan cuaca Yogyakarta saat halaman pertama kali dimuat
  fetchWeather("Yogyakarta");
  // Mulai memperbarui waktu setiap detik
  setInterval(updateTime, 1000);
});

document.getElementById("locationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const location = document.getElementById("location").value;
  fetchWeather(location);
});

function fetchWeather(location) {
  const apiKey = "2c5e6d58e714e9c0991b73d0785b1d65";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=id&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        displayWeather(data);
      } else {
        document.getElementById("weatherResult").innerHTML = `<div class="alert alert-danger">Lokasi tidak ditemukan</div>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  const currentData = data.list[0];
  const tomorrowData = data.list.find((item) => {
    const itemDate = new Date(item.dt * 1000);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return itemDate.getDate() === tomorrow.getDate();
  });

  const todayWeatherHtml = `
      <div class="card position-relative" style="background-color: #95B9C7; color: #fff;">
      <div class="card-body">
        <div class="d-flex">
          <h6 class="flex-grow-1">${data.city.name}</h6>
          <h6 id="currentTime">${new Date().toLocaleTimeString()}</h6>
        </div>
        <div class="d-flex flex-column text-center mt-5 mb-4">
          <h6 class="display-4 mb-0 font-weight-bold">${Math.round(currentData.main.temp)}°C</h6>
          <span class="small">${currentData.weather[0].description}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="flex-grow-1" style="font-size: 1rem;">
            <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1">${Math.round(currentData.wind.speed * 3.6)} km/h</span></div>
            <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1">${currentData.main.humidity}%</span></div>
            <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1">${Math.round(currentData.clouds.all)}%</span></div>
          </div>
          <div>
            <img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}.png" width="100px" />
          </div>
        </div>
        <div class="card position-relative" style="background-color: #f8f9fa; color: #343a40;">
          <div class="card-body" style="padding: 10px;">
            <h6 class="text-center">Prediksi Cuaca Besok</h6>
            <div class="d-flex flex-column text-center mt-3 mb-4">
              <h6 class="mb-0 font-weight-bold" style="font-size: 2rem;">${Math.round(tomorrowData.main.temp)}°C</h6>
              <span class="small">${tomorrowData.weather[0].description}</span>
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <div class="flex-grow-1" style="font-size: 0.9rem;">
                <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1">${Math.round(tomorrowData.wind.speed * 3.6)} km/h</span></div>
                <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1">${tomorrowData.main.humidity}%</span></div>
              </div>
              <div>
                <img src="https://openweathermap.org/img/wn/${tomorrowData.weather[0].icon}.png" width="50px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  weatherResult.innerHTML = todayWeatherHtml;
}

function updateTime() {
  const timeElement = document.getElementById("currentTime");
  if (timeElement) {
    timeElement.textContent = new Date().toLocaleTimeString();
  }
}

document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const feedback = document.getElementById("feedback").value;

  fetch("php/sendMail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: email,
      feedback: feedback,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error sending feedback:", error);
    });
});
