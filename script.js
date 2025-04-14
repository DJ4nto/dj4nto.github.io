// Fait défiler le titre

var documentTitle = document.title + " | ";

(function titleMarquee() {
    document.title = documentTitle = documentTitle.substring(1) + documentTitle.substring(0, 1);
    setTimeout(titleMarquee, 200);
})();

// Fait changer les titres en animation typewriter dans une liste dans un span

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 300) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 50;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

function title() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
}


// Crée le carousel des images + texte sur les contributeurs

let slideIndex = 1;
showSlides(slideIndex);

function plusslides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("unslide");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function frapper(code) {
    if (code == 39) { // droite
        plusslides(1);
    }
    if (code == 37) { // gauche
        plusslides(-1);
    }
}

function toucheA() {
    frapper(event.keyCode)
};
document.onkeydown = toucheA;

// Ajouter ligne au tableau

function addligne(tableID, value1ID, value2ID) {
    var elmt = document.getElementById(tableID);
    var value1 = document.getElementById(value1ID).value;
    var value2 = document.getElementById(value2ID).value;
    if (value1 == "" || value2 == "") {
        window.alert("Veuillez saisir du texte et ne rien laisser vide");
        return;
    }
    var tr = document.createElement('tr');
    elmt.appendChild(tr);

    var td = document.createElement('td');
    tr.appendChild(td);
    var tdText = document.createTextNode(value1);
    td.appendChild(tdText);

    var td = document.createElement('td');
    tr.appendChild(td);
    var tdText2 = document.createTextNode(value2);
    td.appendChild(tdText2);
}

// GERER LES SESSIONS / COOKIES

// Create cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Set cookie consent
function acceptCookieConsent() {
    deleteCookie('user_cookie_consent');
    setCookie('user_cookie_consent', 1, 30);
    document.getElementById("cookieNotice").style.display = "none";
}

let cookie_consent = getCookie("user_cookie_consent");
if (cookie_consent != "") {
    document.getElementById("cookieNotice").style.display = "none";
} else {
    document.getElementById("cookieNotice").style.display = "block";
}

// Light / Dark mode bouton

const modeBtn = document.getElementById('modeBtn');
const body = document.body;
let isDarkMode = JSON.parse(localStorage.getItem('theme')) || false; // Récupère la valeure de isDarkMode dans le LocalStorage et si elle n'y est pas, applique la valeure false (light mode)

modeBtn.addEventListener('click', function() {
    if (isDarkMode) {
        // Si dark-mode, change au light-mode
        body.classList.remove('dark-mode');
    } else {
        // Si light-mode, change au dark-mode
        body.classList.add('dark-mode');
    }
    isDarkMode = !isDarkMode; // Change la variable a chaque utilisation du bouton
    localStorage.setItem('theme', isDarkMode); // Enregistre la nouvelle valeure de isDarkMode dans le localStorage
});

// Fonction qui charge le mode choisi a chaque ouverture de page
function chargerTheme() {
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// S'éxecute a chaque ouverture d'une page

window.onload = function() {
    title();
    chargerTheme();
};