let root = document.documentElement;
    
root.addEventListener('mousemove', e => {
  root.style.setProperty('--mouse-x', e.clientX + "px");
  root.style.setProperty('--mouse-y', e.clientY-26 + "px");
});

document.addEventListener("DOMContentLoaded", function() {
	const languageSelect = document.getElementById("language-select");
	const text1 = document.getElementById("txt_1");
	const text2 = document.getElementById("txt_2");
	const text3 = document.getElementById("TerminalButton");

	const translations = {
		en: {
			translation1: "French student",
			translation2: "Interested in mathematics and computer science. I love playing CTF.",
			translation3: "Open the terminal"
		},
		fr: {
			translation1: "Étudiant français",
			translation2: "Intéressé par les mathématiques et l’informatique. J'aime aussi faire des CTFs.",
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

		// Fonction pour créer un lien
		function createLink(href, text, target = '_blank') {
			const link = document.createElement('a');
			link.href = href;
			link.target = target;
			link.textContent = text;
			return link;
		}

		// Fonction pour créer un texte
		function createText(content) {
			const text = document.createElement('p');
			text.style.margin = '0';
			text.textContent = content;
			return text;
		}

		// Elements utiles pour la mise en forme
		const responseDiv = document.createElement('div');
        responseDiv.className = 'response';
		const skip = document.createElement('br');
		const space = document.createElement('a');
		space.style.marginRight = '10px';

		// Fonction pour créer un projet
		function createProject(github_href, href, name, description) {
			const projectDiv = document.createElement('div');
            projectDiv.className = 'project';
            const title = createText(name);
            title.className = 'title';
            const text = createText(description);
            text.className = 'description';
            const link1 = createLink(github_href, 'Github');
            link1.className = 'link1';
            projectDiv.appendChild(title);
            projectDiv.appendChild(text);
            projectDiv.appendChild(link1);
			if (href !== "none") {
				const link2 = createLink(href, 'Voir le site');
				link2.className = 'link2';
				projectDiv.appendChild(link2);
			}
            return projectDiv;
		}

		// Affiche ce que l'on veut en fonction de l'input
		if (command === 'help') {
			responseDiv.textContent = 'Commandes disponibles: help, about, date, contact, CV, projects, clear';
		} else if (command === 'date') {
			responseDiv.textContent = new Date().toString();
		} else if (command === 'about') {
			const me = createText("Je m'appelle Antonin LECOCQ, je suis étudiant diplômé du baccalauréat passionné par la programmation, la cryptographie, la stéganographie et la musique. Je code en html, css, javascript, python et C#. Pour toutes questions, me contacter.");
			responseDiv.appendChild(me);
		} else if (command === 'contact') {
			const mail_L = createLink('mailto:lecocqantonin@gmail.com', 'Me contacter :');
			const mail_A = createText('lecocqantonin@gmail.com');
			responseDiv.appendChild(mail_L);
			responseDiv.appendChild(mail_A);
		} else if (command === 'cv') {
			const link = createLink('./assets/CV.pdf', 'Accéder au Curriculum Vitae');
			const pdf = document.createElement('embed');
			pdf.src = './assets/CV.pdf';
			pdf.type = 'application/pdf';
			pdf.width = "400";
			pdf.height = "300";
			responseDiv.appendChild(link);
			responseDiv.appendChild(skip);
			responseDiv.appendChild(pdf);
		} else if (command === 'projects') {
			const dubmania = createProject('https://github.com/DJ4nto/DubMania', 'https://dj4nto.github.io/DubMania/', 'DubMania', "DubMania est un jeux web sur le thème du doublage pour jouer avec ses amis jusqu'à 4 personnes");
			responseDiv.appendChild(dubmania);
		} else if (command === 'clear') {
			output.innerHTML = '';
		} else {
			responseDiv.textContent = "'" + command + "' n’est pas reconnu en tant que commande interne";
		}
		output.appendChild(responseDiv);
	}
});


document.getElementById('TerminalButton').addEventListener('click', function() {
	var element = document.getElementById('content');
	element.style.margin = '-300px 0 0 -500px';
	document.getElementById('input').focus();
});

document.getElementById('CloseTerminalButton').addEventListener('click', function() {
	var element = document.getElementById('content');
	element.style.margin = '-300px 0 0 -25000px';
});