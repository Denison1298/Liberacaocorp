function showSection(sectionId) {
    var sections = document.getElementsByClassName('label-container');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    document.getElementById(sectionId).classList.add('active');
}

function clearFields() {
    var inputs = document.querySelectorAll('.label-container.active input');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.hasAttribute('value') && input.value !== input.getAttribute('value')) {
            input.value = input.getAttribute('value');
        } else if (!input.hasAttribute('value')) {
            input.value = '';
        }
    }
    showMessage("Liberação apagada com sucesso!", '#ff4d4d');
}

function copyFilledFields() {
    var activeInputs = document.querySelectorAll('.label-container.active input');
    var textToCopy = '';
    for (var i = 0; i < activeInputs.length; i++) {
        var label = activeInputs[i].previousElementSibling.innerText;
        var value = activeInputs[i].value;
        if (value !== '') {
            textToCopy += label + ' ' + value + '\n';
        }
    }
    navigator.clipboard.writeText(textToCopy).then(function () {
        showMessage("Liberação copiada com sucesso!", '#4CAF50');
    }, function () {
        alert('Erro ao copiar texto');
    });
}

function showMessage(messageText, backgroundColor) {
    var messageElement = document.getElementById('message');
    messageElement.textContent = messageText;
    messageElement.style.backgroundColor = backgroundColor;
    messageElement.classList.add('show');
    setTimeout(function () {
        messageElement.classList.remove('show');
    }, 5000);
}

document.querySelectorAll('input[data-type="signal"]').forEach(function (input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/[^\d]/g, '')
        if (value.length > 2) {
            input.value = `-${value.slice(0, -2)}.${value.slice(-2)}`
        } else if (value.length > 0) {
            input.value = `-${value}`;
        } else {
            input.value = '-';
        }
    });
});
