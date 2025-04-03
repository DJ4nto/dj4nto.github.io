let root = document.documentElement;
    
root.addEventListener('mousemove', e => {
  root.style.setProperty('--mouse-x', e.clientX + "px");
  root.style.setProperty('--mouse-y', e.clientY-26 + "px");
});

function openTerminal() {
	var element = document.getElementById('content');
	element.style.display = 'block';
	document.getElementById('input').focus();
}

function closeTerminal() {
    var element = document.getElementById('content');
    element.style.display = 'none';
}

document.getElementById('TerminalButton').addEventListener('click', openTerminal);
document.getElementById('CloseTerminalButton').addEventListener('click', closeTerminal);


document.addEventListener("DOMContentLoaded", function() {
	const languageSelect = document.getElementById("language-select");
	const text1 = document.getElementById("txt_1");
	const text2 = document.getElementById("txt_2");
	const text3 = document.getElementById("TerminalButton");

	const translations = {
		en: {
			translation1: "French student",
			translation2: "I study mathematics and computer science at Paris Dauphine University.",
			translation3: "Open terminal"
		},
		fr: {
			translation1: "Étudiant français",
			translation2: "J'étudie les mathématiques et l’informatique à l'université Paris Dauphine.",
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

		// Fonction pour créer une image
		function createIMG(link) {
			const logo = document.createElement('img')
			logo.style.margin = '0';
			logo.src = link;
			return logo;
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

		// Fonction pour créer un skill
		function createSkill(name, img, master) {
			const skillDiv = document.createElement('div');
			skillDiv.className = 'skill';
			const logo = createIMG(img);
            logo.className = 'logo';
			const title = createText(name);
			title.className = 'title';
			let masterTxt = "Unknown";
			if (master === '1') {
            	masterTxt = "Beginner";
			} else if (master === '2') {
				masterTxt = "Intermediate";
			} else if (master === '3') {
				masterTxt = "Competent";
			} else if (master === '4') {
				masterTxt = "Advanced";
			} else if (master === '5') {
				masterTxt = "Mastered";
			}
			const level = createText(masterTxt);
            level.className = 'level';
            skillDiv.appendChild(logo);
            skillDiv.appendChild(title);
            skillDiv.appendChild(level);
            return skillDiv;
		}

		// Fonction pour changer de couleure
		function updateColor(color) {
			var terminal = document.getElementById("terminal");
			terminal.style.color = color;
			input.style.color = color;
		}

		// Fonction pour savoir si la commande de couleure est bien saisie et appelle la fonction pour la changer
		function handleColor(com) {
			const parts = com.split(' ');
			if (parts[0] === 'color' && parts.length > 1) {
				const color = parts[1];
				if (color === 'default') {
					updateColor("#56603d");
				} else {
					updateColor(color);
				}
				return true
			}
			return false
		}

		// Affiche ce que l'on veut en fonction de l'input
		if (command === 'help') {
			responseDiv.textContent = 'Available commands: about, date, color, contact, cv, projects, languages, clear, kill';
		} else if (command === 'date') {
			responseDiv.textContent = new Date().toString();
		} else if (handleColor(command)) {
		} else if (command === 'color') {
			const color_help = createText("color [attr]  --  missing attribute");
			const color_ex = createText("ex: color red, color default, color #56603d, ...");
			responseDiv.appendChild(color_help);
			responseDiv.appendChild(color_ex);
		} else if (command === 'about') {
			const me = createText("My name is Antonin LECOCQ, I'm a bachelor student in mathematics and computer science at Paris Dauphine University, If you have any questions, please contact me.");
			responseDiv.appendChild(me);
		} else if (command === 'contact') {
			const mail_A = createText('Contact me at: ');
			const mail_L = createLink('mailto:lecocqantonin@gmail.com', 'lecocqantonin@gmail.com');
			responseDiv.appendChild(mail_A);
			responseDiv.appendChild(mail_L);
		} else if (command === 'cv') {
			const link = createLink('./assets/CV.pdf', 'Access Curriculum Vitae');
			const pdf = document.createElement('embed');
			pdf.src = './assets/CV.pdf';
			pdf.type = 'application/pdf';
			pdf.width = "1000";
			pdf.height = "434";
			responseDiv.appendChild(link);
			responseDiv.appendChild(skip);
			responseDiv.appendChild(pdf);
		} else if (command === 'projects') {
			const dubmania = createProject('https://github.com/DJ4nto/DubMania', 'https://dj4nto.github.io/DubMania/', 'DubMania', "DubMania is a dubbing-themed web game that lets you play with up to 4 friends.");
			responseDiv.appendChild(dubmania);
			// const geolocateIP = createProject('https://github.com/DJ4nto/GeolocateIP', 'none', 'GeolocateIP', 'Find the location of an IP address with the "requests" library for python then place a ping in a ACSSI map made with # based of the latitude and the longitude');
			// responseDiv.appendChild(geolocateIP);
			// const meshR = createProject('https://github.com/DJ4nto/Character_Mesh_Randomizer', 'none', 'Character Mesh Randomizer', "This script is made to modifie player models with bones that are named correctly with the names in the list : Bone_Group, Mixamo's player models, it might not work on other player models ! Use with Blender");
			// responseDiv.appendChild(meshR);
			// const Morpion = createProject('https://github.com/DJ4nto/Morpion', 'none', 'Morpion', 'Tic Tac Toe game made with Python. Inlcuding a cool bot');
			// responseDiv.appendChild(Morpion);
			// const PasswordGenerator = createProject('https://github.com/DJ4nto/PasswordGenerator', 'none', 'PasswordGenerator', 'Generate passwords with python');
			// responseDiv.appendChild(PasswordGenerator);
		} else if (command === 'languages') {
			const python = createSkill('Python', 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png', '5')
			responseDiv.appendChild(python);
			const html = createSkill('HTML', 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png', '4')
			responseDiv.appendChild(html);
			const css = createSkill('CSS', 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png', '3')
			responseDiv.appendChild(css);
			const javascript = createSkill('JavaScript', 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png', '3')
			responseDiv.appendChild(javascript);
			const csharp = createSkill('C#', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg', '2')
			responseDiv.appendChild(csharp);
		} else if (command === 'clear') {
			output.innerHTML = '';
		} else if (command === 'kill') {
			closeTerminal();
			output.innerHTML = '';
		} else {
			responseDiv.textContent = "'" + command + "' is not recognized as an internal or external command.";
		}
		output.appendChild(responseDiv);
	}
});
