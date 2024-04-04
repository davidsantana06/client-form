const NAME_REGEX = /^[a-zA-Z\s]+$/;
const CPF_REGEX = /^[0-9]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameInput = document.getElementById('name');
const cpfInput = document.getElementById('cpf');
const birthdateInput = document.getElementById('birthdate');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');


[cpfInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
    input.addEventListener('keydown', (event) => {
        if (event.key === ' ') { event.preventDefault(); }
    })
});


document.getElementById('cpf').addEventListener('input', (event) => {
    const maskedCpf = event.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    event.target.value = maskedCpf;
});


document.querySelector('form').addEventListener('submit', (event) => {
    const nameIsInvalid = (name) => { return !name || name.length > 50 || !NAME_REGEX.test(name); }
    const cpfIsInvalid = (cpf) => { return !cpf || cpf.length !== 11 || !CPF_REGEX.test(cpf); }
    const birthdateIsInvalid = (birthdate) => { 
        const currentDate = new Date();
        const birthdateInst = new Date(birthdate);
        return (isNaN(birthdateInst) || birthdateInst >= currentDate );
    }
    const emailIsInvalid = (email) => { return !email || email.length > 255 || !EMAIL_REGEX.test(email); }
    const passwordIsInvalid = (password) => { return !password || password.length < 8 || password.length > 30; }
    const confirmPasswordIsInvalid = (password, confirmPassword) => { return !confirmPassword || password !== confirmPassword; }

    const name = String(nameInput.value).trim();
    const cpf = String(cpfInput.value).replace(/\D/g, '');
    const birthdate = String(birthdateInput.value);
    const email = String(emailInput.value).trim();
    const password = String(passwordInput.value);
    const confirmPassword = String(confirmPasswordInput.value);

    event.preventDefault();

    if (nameIsInvalid(name)) {
        alert('NOME INVÁLIDO!\nO nome deve conter entre 1 e 50 caracteres alfabéticos.')
        return;
    }

    if (cpfIsInvalid(cpf)) {
        alert('CPF INVÁLIDO!\nO CPF deve conter 11 caracteres numéricos.');
        return;
    }

    if (birthdateIsInvalid(birthdate)) {
        alert('DATA DE NASCIMENTO INVÁLIDA!\nA data de nascimento precisa ser anterior à data atual e estar no formato DD/MM/AAAA.');
        return;
    }

    if (emailIsInvalid(email)) {
        alert('E-MAIL INVÁLIDO!\nO e-mail deve apresentar o nome, seguido por "@" (arroba), seguido pelo endereço e o domínio, e deve ter até 255 caracteres.');
        return;
    }

    if (passwordIsInvalid(password)) {
        alert('SENHA INVÁLIDA!\nA senha deve ter entre 8 e 30 caracteres.');
        return;
    }

    if (confirmPasswordIsInvalid(password, confirmPassword)) {
        alert('SENHA INVÁLIDA!\nAs senhas devem coincidir.');
        return;
    }

    alert('DADOS VÁLIDOS!\nO formulário não será submetido.');
});