function calculate(operation) {
    const num1 = document.getElementById('num_1').value;
    const num2 = document.getElementById('num_2').value;
    
    const url = `http://localhost:8080/${operation}?num1=${num1}&num2=${num2}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.statuscode === 200) {
            document.getElementById('result').textContent = data.data;
        } else {
            document.getElementById('result').textContent = data.message;
        }
    })
    .catch(error => {
        document.getElementById('result').textContent = 'Error: ' + error.message;
    });
}
