// * SELECTORS
const loginBox  = document.querySelector(".login");
const signupBox = document.querySelector(".auth");

const goSignup = document.getElementById("goSignup");
const goLogin  = document.getElementById("goLogin");

const signupBtn = document.getElementById("signupBtn");
const loginBtn  = document.querySelector(".cree_acc_btn");

const signupEmail    = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm  = document.getElementById("signupConfirm");

const loginEmail = document.getElementById("loginEmail");
const loginPass  = document.getElementById("password");



// * SWITCH LOGIN / SIGNUP
goSignup?.addEventListener("click", () => {
    loginBox.style.display  = "none";
    signupBox.style.display = "block";
});

goLogin?.addEventListener("click", () => {
    signupBox.style.display = "none";
    loginBox.style.display  = "block";
});



// * TOGGLE EYE
document.querySelectorAll(".input-eye i").forEach(eye => {
    eye.addEventListener("click", () => {
        const input = eye.previousElementSibling;
        if (!input) return;

        const show = input.type === "password";
        input.type = show ? "text" : "password";
        eye.className = show ? "ri-eye-line" : "ri-eye-close-line";
    });
});



// * CREATE ERROR MESSAGE
function createMsg(text, afterEl) {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.color = "red";
    p.style.fontSize = "13px";
    p.style.marginTop = "5px";
    p.style.display = "none";
    afterEl.after(p);
    return p;
}



// * SIGNUP ERROR MESSAGES
const signupEmailMsg = createMsg("Email invalid", signupEmail);
const signupPassMsg  = createMsg(
    "Password must be 7+ chars & contain symbol",
    signupPassword.parentElement
);
const signupConfMsg  = createMsg(
    "Passwords do not match",
    signupConfirm.parentElement
);



// * SIGN UP VALIDATION
signupBtn?.addEventListener("click", e => {
    e.preventDefault();

    const email = signupEmail.value.trim();
    const pass  = signupPassword.value;
    const conf  = signupConfirm.value;

    signupEmailMsg.style.display = "none";
    signupPassMsg.style.display  = "none";
    signupConfMsg.style.display  = "none";

    let valid = true;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        signupEmailMsg.style.display = "block";
        valid = false;
    }

    if (
        !pass ||
        pass.length < 7 ||
        pass.includes(" ") ||
        !/[@#\-+*/]/.test(pass)
    ) {
        signupPassMsg.style.display = "block";
        valid = false;
    }

    if (!conf || pass !== conf) {
        signupConfMsg.style.display = "block";
        valid = false;
    }

    if (valid) {
        signupBox.style.display = "none";
        loginBox.style.display  = "block";
    }
});



// * LOGIN VALIDATION (INLINE MSG)
const loginMsg = createMsg(
    "Please fill email or password",
    loginPass.parentElement
);

// * SHOW ERROR FUNCTION (3s)
function showError(msgEl) {
    msgEl.style.display = "block";
    clearTimeout(msgEl._timer);
    msgEl._timer = setTimeout(() => {
        msgEl.style.display = "none";
    }, 2000);
}

loginBtn?.addEventListener("click", e => {
    e.preventDefault();

    loginMsg.style.display = "none";

    if (!loginEmail.value.trim() || !loginPass.value.trim()) {
        showError(loginMsg);  
        return;
    }

    window.location.href = "success.html";
});
