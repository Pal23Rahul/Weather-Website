console.log('hello,new console.');
const form = document.querySelector('form');
const address = document.querySelector('input');
var p_1 = document.querySelector('#p-1');
var p_2 = document.querySelector('#p-2');
var p_3 = document.querySelector('#p-3');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = '/weather?address=' + address.value;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.status === 0) {
                p_1.textContent = "please provide a valid address";
                p_2.textContent = "";
                p_3.textContent = "";
            }
            else {
                p_1.textContent = 'Location: ' + address.value;
                p_2.textContent = 'Temperature: ' + data.temperature;
                p_3.textContent = 'Description: ' + data.description;
            }
        });
    });


})