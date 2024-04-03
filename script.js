const NAME_REGEX = /^[a-zA-Z\s]+$/;
const CPF_REGEX = /^[0-9]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^\s+$/;

document.getElementById('cpf').addEventListener('input', function (event) {
    const cpf = event.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    event.target.value = cpf;
});

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = String(document.getElementById('name').value).trim();
    const cpf = String(document.getElementById('cpf').value).replace(/\D/g, '');
    const birthdate = String(document.getElementById('birthdate').value);
    const email = String(document.getElementById('email').value).trim();
    const password = String(document.getElementById('password').value);
    const confirmPassword = String(document.getElementById('confirm-password').value);

    if (!name || name.length > 50 || !NAME_REGEX.test(name)) {
        alert('Por favor, insira um nome válido.');
        return;
    }

    if (!cpf || cpf.length !== 11 || !CPF_REGEX.test(cpf)) {
        alert('Por favor, insira um CPF válido.');
        return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(birthdate);
    if (!birthdate || selectedDate >= currentDate) {
        alert('Por favor, insira uma data de nascimento válida.');
        return;
    }

    if (!email || email.length > 255 || !EMAIL_REGEX.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (!password || password.length < 8 || password.length > 30 || PASSWORD_REGEX.test(password)) {
        alert('A senha deve ter entre 8 e 30 caracteres.');
        return;
    }

    if (!confirmPassword || password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, insira senhas idênticas.');
        return;
    }

    alert('Dados válidos! O formulário não será submetido.');
});