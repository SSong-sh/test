// // static/js/main.js
// function sendData() {
//     const inputVariable = document.getElementById('input_variable').value;
//     fetch('/clear_sky', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//         'capacity': capacity,
//         'latitude': latitude,
//         'longitude': longitude,
//     }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         // 서버로부터 받은 응답 처리
//         const resultElement = document.getElementById('result');
//         resultElement.innerHTML = ''; // 결과 영역 초기화

//         // Create table
//         let table = document.createElement('table');
//         let headerRow = document.createElement('tr');
//         let dataRow = document.createElement('tr');

//         // Add headers and data
//         data.result.forEach((item, index) => {
//             let th = document.createElement('th');
//             th.textContent = `${index}시`;  // assuming each item represents an hour
//             headerRow.appendChild(th);

//             let td = document.createElement('td');
//             td.textContent = Object.values(item)[0];  // assuming each item is a single-value object
//             dataRow.appendChild(td);
//         });

//         table.appendChild(headerRow);
//         table.appendChild(dataRow);

//         resultElement.appendChild(table);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// function submitData() {
//     let userData = {};

//     // 이름, 연락처, 이메일, 문의내용을 가져옵니다.
//     userData.name = document.getElementById('user').value;
//     userData.contact = document.getElementById('user-number').value;

//     // 이메일 주소는 두 부분으로 나뉘어져 있으므로 합쳐야 합니다.
//     let emailPart1 = document.getElementById('user-email').value;
//     let emailPart2 = document.getElementById('user-email2').value;
//     userData.email = `${emailPart1}@${emailPart2}`;

//     userData.query = document.getElementById('ask').value;

//     // 서버로 데이터 전송
//     fetch('/contact_mail', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

// static/js/main.js
function sendData() {
  const inputVariable = document.getElementById("input_variable").value;
  fetch("/clear_sky", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capacity: capacity,
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // 서버로부터 받은 응답 처리
      const resultElement = document.getElementById("result");
      resultElement.innerHTML = ""; // 결과 영역 초기화

      // Create table
      let table = document.createElement("table");
      let headerRow = document.createElement("tr");
      let dataRow = document.createElement("tr");

      // Add headers and data
      data.result.forEach((item, index) => {
        let th = document.createElement("th");
        th.textContent = `${index}시`; // assuming each item represents an hour
        headerRow.appendChild(th);

        let td = document.createElement("td");
        td.textContent = Object.values(item)[0]; // assuming each item is a single-value object
        dataRow.appendChild(td);
      });

      table.appendChild(headerRow);
      table.appendChild(dataRow);

      resultElement.appendChild(table);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function submitData() {
  // Collect user input
  let name = document.getElementById("user").value;
  let contact = document.getElementById("user-number").value;
  let email =
    document.getElementById("user-email").value +
    "@" +
    document.getElementById("user-email2").value;
  let query = document.getElementById("ask").value;

  // Construct the data object
  let userData = {
    name: name,
    contact: contact,
    email: email,
    query: query,
  };

  // Send POST request to the server
  fetch("/contact_mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
// 이름, 연락처, 이메일, 문의내용을 가져옵니다.
userData.name = document.getElementById("user").value;
userData.contact = document.getElementById("user-number").value;

// 이메일 주소는 두 부분으로 나뉘어져 있으므로 합쳐야 합니다.
let emailPart1 = document.getElementById("user-email").value;
let emailPart2 = document.getElementById("user-email2").value;
userData.email = `${emailPart1}@${emailPart2}`;

userData.query = document.getElementById("ask").value;

// 서버로 데이터 전송
fetch("/contact_mail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
