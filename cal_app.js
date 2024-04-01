function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num_1').value);
    const num2 = parseFloat(document.getElementById('num_2').value);

    const url = `http://localhost:8080/${operation}`; 

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num1, num2, operation }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = data.result;
    })
    .catch(error => console.error('Error:', error));
}
