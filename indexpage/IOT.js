$(document).ready(function () {
  $("#toggle").click(function () {
    $("nav").slideToggle();
  });
});
let isOn = true;
if (localStorage.getItem("check") == null) {
  localStorage.setItem("check", 0);
}

document.addEventListener("DOMContentLoaded", function () {
  const ctn = document.getElementById("ctn");
  if (localStorage.getItem("check") == 0) {
    ctn.innerHTML = ` <button id="toggleButton" class="mt-3 bg-success toggle-button" onclick="On()">Bật chuông cảnh báo</button> `;
  } else {
    ctn.innerHTML = ` <button id="toggleButton" class="mt-3 bg-danger toggle-button" onclick="On()">Tắt chuông cảnh báo</button> `;
  }
});
function On() {
  const ctn = document.getElementById("ctn");
  if (localStorage.getItem("check") == 0) {
    ctn.innerHTML = ` <button id="toggleButton" class="mt-3 bg-danger toggle-button" onclick="On()">Tắt chuông cảnh báo</button> `;
    localStorage.setItem("check", 1);
  } else {
    ctn.innerHTML = ` <button id="toggleButton" class="mt-3 bg-success toggle-button" onclick="On()">Bật chuông cảnh báo</button> `;
    localStorage.setItem("check", 0);
  }
}
// Firebase configuration
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkEDuPFrkm4u4r9O6Ws2EBJAEeycjat3w",
  authDomain: "dht11-43ff2.firebaseapp.com",
  databaseURL: "https://dht11-43ff2-default-rtdb.firebaseio.com",
  projectId: "dht11-43ff2",
  storageBucket: "dht11-43ff2.firebasestorage.app",
  messagingSenderId: "782724959777",
  appId: "1:782724959777:web:ffc508a1386e459ce15d60",
  measurementId: "G-LMXPSL14S4",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
let isPlaying = false;
// Reference to your database path
const dataRef = database.ref("/sensors");

// Listen for data changes
dataRef.on(
  "value",
  (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById("data-container");
    const container1 = document.getElementById("data-container1");
    const container2 = document.getElementById("data-container2");
    if (data) {
      container.innerHTML = `
                  <p><strong class="nd">Nhiệt độ:</strong> ${data.temperature} °C</p>
                  <p><strong class="da">Độ ẩm:</strong> ${data.humidity} %</p>
              `;
      if (localStorage.getItem("arrT") != null) {
        container1.innerHTML = `
              <h5 class="text-primary">*Cảnh báo nhiệt độ: Nhiệt độ ổn định</h5>
          `;
      } else {
        container1.innerHTML = `
              <h5 class="text-danger">*Cảnh báo nhiệt độ chưa được thiết lập</h5>
          `;
      }
      if (localStorage.getItem("arrH") != null) {
        container2.innerHTML = `
              <h5 class="text-primary">*Cảnh báo độ ẩm: Độ ẩm ổn định</h5>
          `;
      } else {
        container2.innerHTML = `
              <h5 class="text-danger">*Cảnh báo độ ẩm chưa được thiết lập</h5>
          `;
      }

      var data1 = JSON.parse(localStorage.getItem("arrT"));
      const found = data1.some(
        (subArray) =>
          subArray[0] <= data.temperature && subArray[1] >= data.temperature
      );
      const foundIndex = data1.findIndex(
        (subArray) =>
          subArray[0] <= data.temperature && subArray[1] >= data.temperature
      );
      if (found) {
        container1.innerHTML = `
              <h5 class="text-danger">*Cảnh báo nhiệt độ: ${data1[foundIndex][2]}</h5>
          `;
        if (
          localStorage.getItem("arrT") != null &&
          localStorage.getItem("check") == 1
        ) {
          if (!isPlaying) {
            const audio = new Audio(
              "image/police-siren-sound-effect-240674.mp3"
            );
            isPlaying = true;
            audio.play();
            audio.addEventListener("ended", function () {
              isPlaying = false;
            });
          }
        }
      }
    } else {
      container.innerHTML = "<p>No data available</p>";
    }
  },
  (error) => {
    console.error("Error fetching data:", error);
  }
);
