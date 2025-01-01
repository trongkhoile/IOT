$(document).ready(function () {
  $("#toggle").click(function () {
    $("nav").slideToggle();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("arrT") == null) {
    const container = document.getElementById("temp");
    container.innerHTML = ` <p class="text-primary">*Cảnh báo chưa được thiết lập</p> `;
  }
  if (localStorage.getItem("arrH") == null) {
    const container = document.getElementById("hud");
    container.innerHTML = ` <p class="text-primary">*Cảnh báo chưa được thiết lập</p> `;
  }
});
if (localStorage.getItem("arrT") != null) {
  document.addEventListener("DOMContentLoaded", dataPrint);
}
function dataPrint() {
  var data1 = JSON.parse(localStorage.getItem("arrT"));
  const container = document.getElementById("temp");
  container.innerHTML = "";
  for (let i = 0; i < data1.length; i++) {
    var minT = data1[i][0];
    var maxT = data1[i][1];
    var alertD = data1[i][2];
    container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minT}°C → ${maxT}°C : <p>${alertD}</p></p> <div class="icon"> <button onclick="delT(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
  }
}
function saveData(event) {
  event.preventDefault();
  var data0 = JSON.parse(localStorage.getItem("arrT"));
  const minTemp = document.getElementById("minTemp").value;
  const maxTemp = document.getElementById("maxTemp").value;
  const alertMessage = document.getElementById("alertMessage").value;
  const container1 = document.getElementById("al1");
  if (localStorage.getItem("arrT") != null) {
    var found = data0.some(
      (subArray) => subArray[0] === minTemp && subArray[1] === maxTemp
    );
  }
  if (minTemp === "" || maxTemp === "" || alertMessage === "") {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Vui lòng nhập đầy đủ tất cả các giá trị</h5> `;
    return;
  }
  if (isNaN(minTemp) || isNaN(maxTemp)) {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Vui lòng nhập giá trị hợp lệ cho khoảng nhiệt độ</h5> `;
    return;
  }
  if (minTemp > maxTemp) {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Giá trị nhiệt độ bắt đầu phải bé hơn giá trị nhiệt độ kết thúc</h5> `;
    return;
  }
  if (found) {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Cảnh báo bị trùng lặp vui lòng nhập giá trị khác</h5> `;
    return;
  }
  const alertData = [minTemp, maxTemp, alertMessage];
  if (localStorage.getItem("arrT") == null) {
    localStorage.setItem("arrT", JSON.stringify([alertData]));
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Dữ liệu đã được lưu</h5> `;
    var data1 = JSON.parse(localStorage.getItem("arrT"));
    const container = document.getElementById("temp");
    container.innerHTML = "";
    for (let i = 0; i < data1.length; i++) {
      var minT = data1[i][0];
      var maxT = data1[i][1];
      var alertD = data1[i][2];
      container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minT}°C → ${maxT}°C : <p>${alertD}</p></p> <div class="icon"> <button onclick="delT(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
    }
    return;
  }
  var dataT = JSON.parse(localStorage.getItem("arrT"));
  dataT.push(alertData);
  localStorage.setItem("arrT", JSON.stringify(dataT));
  container1.innerHTML = ` <h5 class="mb-4 text-danger">*Dữ liệu đã được lưu</h5> `;
  const container = document.getElementById("temp");
  container.innerHTML = "";
  for (let i = 0; i < dataT.length; i++) {
    var minT = dataT[i][0];
    var maxT = dataT[i][1];
    var alertD = dataT[i][2];
    container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minT}°C → ${maxT}°C :<p>${alertD}</p></p> <div class="icon"> <button onclick="delT(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
  }
}
if (localStorage.getItem("arrH") != null) {
  document.addEventListener("DOMContentLoaded", dataPrint1);
}
function dataPrint1() {
  var data1 = JSON.parse(localStorage.getItem("arrH"));
  const container = document.getElementById("hud");
  container.innerHTML = "";
  for (let i = 0; i < data1.length; i++) {
    var minH = data1[i][0];
    var maxH = data1[i][1];
    var alertH = data1[i][2];
    container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minH}% → ${maxH}% : <p>${alertH}</p></p> <div class="icon"> <button onclick="delH(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
  }
}
function saveData1(event) {
  event.preventDefault();
  var data0 = JSON.parse(localStorage.getItem("arrH"));
  const minHud = document.getElementById("lowHumidity").value;
  const maxHud = document.getElementById("highHumidity").value;
  const alertMessage = document.getElementById("humidityMessage").value;
  const container1 = document.getElementById("humidityAlertBox");
  if (localStorage.getItem("arrH") != null) {
    var found = data0.some(
      (subArray) => subArray[0] === minHud && subArray[1] === maxHud
    );
  }
  if (minHud === "" || maxHud === "" || alertMessage === "") {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Vui lòng nhập đầy đủ tất cả các giá trị</h5> `;
    return;
  }
  if (isNaN(minHud) || isNaN(maxHud)) {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Vui lòng nhập giá trị hợp lệ cho khoảng độ ẩm</h5> `;
    return;
  }
  if (minHud > maxHud) {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Giá trị độ ẩm bắt đầu phải bé hơn giá trị độ ẩm kết thúc</h5> `;
    return;
  }
  if (found) {
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Cảnh báo bị trùng lặp vui lòng nhập giá trị khác</h5> `;
    return;
  }
  const alertData = [minHud, maxHud, alertMessage];
  if (localStorage.getItem("arrH") == null) {
    localStorage.setItem("arrH", JSON.stringify([alertData]));
    container1.innerHTML = ` <h5 class="mb-4 text-danger">*Dữ liệu đã được lưu</h5> `;
    var data1 = JSON.parse(localStorage.getItem("arrH"));
    const container = document.getElementById("hud");
    container.innerHTML = "";
    for (let i = 0; i < data1.length; i++) {
      var minH = data1[i][0];
      var maxH = data1[i][1];
      var alertH = data1[i][2];
      container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minH}% → ${maxH}% :<p>${alertH}</p></p> <div class="icon"> <button onclick="delH(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
    }
    return;
  }
  var dataT = JSON.parse(localStorage.getItem("arrH"));
  dataT.push(alertData);
  localStorage.setItem("arrH", JSON.stringify(dataT));
  container1.innerHTML = ` <h5 class="mb-4 text-danger">*Dữ liệu đã được lưu</h5> `;
  const container = document.getElementById("hud");
  container.innerHTML = "";
  for (let i = 0; i < dataT.length; i++) {
    var minH = dataT[i][0];
    var maxH = dataT[i][1];
    var alertH = dataT[i][2];
    container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minH}% → ${maxH}% : <p>${alertH}</p></p> <div class="icon"> <button onclick="delH(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
  }
}

function delT(event) {
  var data1 = JSON.parse(localStorage.getItem("arrT"));
  const button = event.target;
  const parentDiv = button.closest(".delA");
  const paragraph = parentDiv.querySelector("p");
  const values = paragraph.textContent.split("→");
  const minT = values[0].trim().split("°C")[0];
  const maxT = values[1].trim().split("°C")[0].split(":")[0];
  const foundIndex = data1.findIndex(
    (subArray) => subArray[0] === minT && subArray[1] === maxT
  );
  if (data1.length == 1) {
    localStorage.removeItem("arrT");
    const container = document.getElementById("temp");
    container.innerHTML = ` <p class="text-primary">*Cảnh báo chưa được thiết lập</p> `;
    return;
  }
  data1.splice(foundIndex, 1);
  localStorage.setItem("arrT", JSON.stringify(data1));
  const container = document.getElementById("temp");
  container.innerHTML = "";
  for (let i = 0; i < data1.length; i++) {
    var minT1 = data1[i][0];
    var maxT1 = data1[i][1];
    var alertD1 = data1[i][2];
    container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minT1}°C → ${maxT1}°C : <p>${alertD1}</p></p> <div class="icon"> <button onclick="delT(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
  }
}

function delH(event) {
  var data1 = JSON.parse(localStorage.getItem("arrH"));
  const button = event.target;
  const parentDiv = button.closest(".delA");
  const paragraph = parentDiv.querySelector("p");
  const values = paragraph.textContent.split("→");
  const minH = values[0].trim().split("%")[0];
  const maxH = values[1].trim().split("%")[0].split(":")[0];
  const foundIndex = data1.findIndex(
    (subArray) => subArray[0] === minH && subArray[1] === maxH
  );
  if (data1.length == 1) {
    localStorage.removeItem("arrH");
    const container = document.getElementById("hud");
    container.innerHTML = ` <p class="text-primary">*Cảnh báo chưa được thiết lập</p> `;
    return;
  }
  data1.splice(foundIndex, 1);
  localStorage.setItem("arrH", JSON.stringify(data1));
  const container = document.getElementById("hud");
  container.innerHTML = "";
  for (let i = 0; i < data1.length; i++) {
    var minH1 = data1[i][0];
    var maxH1 = data1[i][1];
    var alertD1 = data1[i][2];
    container.innerHTML += ` <div class="align-items-center justify-content-between delA"> <p class="mt-3">${minH1}% → ${maxH1}% : <p>${alertD1}</p></p> <div class="icon"> <button onclick="delH(event)" class="bt1">Xóa cảnh báo</button> </div> </div> `;
  }
}
