// static/js/main.js
function sendData() {
    const inputVariable = document.getElementById('input_variable').value;
    fetch('/clear_sky', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'input_variable': inputVariable }),
    })
    .then(response => response.json())
    .then(data => {
        // 서버로부터 받은 응답 처리
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = ''; // 결과 영역 초기화

        // Create table
        let table = document.createElement('table');
        let headerRow = document.createElement('tr');
        let dataRow = document.createElement('tr');

        // Add headers and data
        data.result.forEach((item, index) => {
            let th = document.createElement('th');
            th.textContent = `${index}시`;  // assuming each item represents an hour
            headerRow.appendChild(th);

            let td = document.createElement('td');
            td.textContent = Object.values(item)[0];  // assuming each item is a single-value object
            dataRow.appendChild(td);
        });

        table.appendChild(headerRow);
        table.appendChild(dataRow);

        resultElement.appendChild(table);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
