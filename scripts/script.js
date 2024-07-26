document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('input');
        const output = document.getElementById('output');
        const command = input.value.trim().toLowerCase();
        
        // Efface l'input et les commandes d'avant
        input.value = '';
        output.innerHTML = '';

        // Crée un nouveau div pour afficher la commande et le résultat
        const commandDiv = document.createElement('div');
        commandDiv.textContent = '> ' + command;
        output.appendChild(commandDiv);

        // Affiche ce que l'on veut en fonction de l'input
        const responseDiv = document.createElement('div');
        const skip = document.createElement('br') ;
        if (command === 'help') {
            responseDiv.textContent = 'Commandes disponibles: help, about, date, contact, CV, projects, clear';
        } else if (command === 'date') {
            responseDiv.textContent = new Date().toString();
        } else if (command === 'about') {
            const me = document.createElement('p');
            me.textContent = "Je m'appelle Antonin LECOCQ, je suis étudiant diplômé du baccalauréat passionné par la programmation, la cryptographie, la stéganographie et la musique. Pour toutes questions, me contacter.";
            responseDiv.appendChild(me);
        } else if (command === 'contact') {
            const mail_L = document.createElement('a');
            mail_L.href = 'mailto:lecocqantonin@gmail.com';
            mail_L.target = '_blank';
            mail_L.textContent = 'Me contacter :'
            const mail_A = document.createElement('p');
            mail_A.textContent = 'lecocqantonin@gmail.com';
            responseDiv.appendChild(mail_L);
            responseDiv.appendChild(mail_A);
        } else if (command === 'cv') {
            const link = document.createElement('a');
            link.href = './assets/CV.pdf';
            link.target = '_blank';
            link.textContent = 'Accéder au Curriculum Vitae';
            const pdf = document.createElement('embed');
            pdf.src = './assets/CV.pdf';
            pdf.type = 'application/pdf';
            pdf.width = "400";
            pdf.height = "300";
            responseDiv.appendChild(link);
            responseDiv.appendChild(skip);
            responseDiv.appendChild(pdf);
        } else if (command === 'projects') {
            const link1 = document.createElement('a');
            link1.href = 'https://github.com/DJ4nto/DubMania';
            link1.target = '_blank';
            link1.textContent = 'Github repo';
            const link2 = document.createElement('a');
            link2.href = 'https://dj4nto.github.io/DubMania/';
            link2.target = '_blank';
            link2.textContent = 'DubMania';
            responseDiv.appendChild(link1);
            responseDiv.appendChild(skip);
            responseDiv.appendChild(link2);
        } else if (command === 'clear') {
            output.innerHTML = '';
        } else {
            responseDiv.textContent = 'Commande non reconnue: ' + command;
        }
        output.appendChild(responseDiv);
    }
});


document.getElementById('TerminalButton').addEventListener('click', function() {
    var element = document.getElementById('content');
    element.style.margin = '-300px 0 0 -500px';
});

document.getElementById('CloseTerminalButton').addEventListener('click', function() {
    var element = document.getElementById('content');
    element.style.margin = '-300px 0 0 -2500px';
});


document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("language-select");
    const text1 = document.getElementById("txt_1");
    const text2 = document.getElementById("txt_2");
    const text3 = document.getElementById("TerminalButton");

    const translations = {
        en: {
            translation1: "French student",
            translation2: "Interested in cryptography and steganography. I love playing CTF.",
            translation3: "Open the terminal"
        },
        fr: {
            translation1: "Étudiant français",
            translation2: "Intéressé par la cryptographie et la stéganographie. J'aime aussi faire des CTFs.",
            translation3: "Ouvrir le terminal"
        }
    };

    // Fonction permettant de mettre à jour le texte en fonction de la langue sélectionnée
    function updateLanguage() {
        const selectedLanguage = languageSelect.value;
        text1.textContent = translations[selectedLanguage].translation1;
        text2.textContent = translations[selectedLanguage].translation2;
        text3.textContent = translations[selectedLanguage].translation3;
        localStorage.setItem('preferredLanguage', selectedLanguage);
    }

    // Ecoute pour le changement de langue
    languageSelect.addEventListener("change", updateLanguage);

    // Chargement de la langue préférée à partir de la mémoire locale, si elle est disponible
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
        updateLanguage();
    }
});
