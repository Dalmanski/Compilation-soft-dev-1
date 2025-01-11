const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const loginBtn = document.getElementById("loginBtn");
const closeLogin = document.getElementById("closeLogin");
const closeSignup = document.getElementById("closeSignup");
const signupLink = document.getElementById("signupLink");

loginBtn.onclick = function() {
    loginModal.style.display = "block";
};

closeLogin.onclick = function() {
    loginModal.style.display = "none";
};

signupLink.onclick = function() {
    signupModal.style.display = "block";
    loginModal.style.display = "none"; 
};

closeSignup.onclick = function() {
    signupModal.style.display = "none";
};

document.addEventListener('DOMContentLoaded', () => {
    const keyName = "Dalman's account list";
    const loginBtn = document.getElementById('loginBtn');

    // Handle sign-up form submission
    document.querySelector('#signupModal form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const accounts = JSON.parse(localStorage.getItem(keyName)) || [];
        if (accounts.some(account => account.email === email)) {
            alert('An account with this email already exists!');
            return;
        }
        accounts.push({ username, email, password });
        localStorage.setItem(keyName, JSON.stringify(accounts));
        alert('Sign-up successful! You can now log in.');
        document.getElementById('signupModal').style.display = 'none';
    });

    // Handle log-in form submission
    document.querySelector('#loginModal form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const accounts = JSON.parse(localStorage.getItem(keyName)) || [];
        const account = accounts.find(account => account.email === email && account.password === password);
        if (account) {
            alert(`Log-in successful! Welcome back, ${account.username}.`);
            document.getElementById('loginModal').style.display = 'none';
            loginBtn.textContent = `Hello ${account.username}! Log-out`;
            const handleLogout = () => {
                if (confirm('Are you sure you want to log-out?')) {
                    loginBtn.textContent = 'Log-in';
                    loginBtn.removeEventListener('click', handleLogout);
                }
            };
            loginBtn.addEventListener('click', handleLogout);
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
});