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

        // Gère les commandes
        const responseDiv = document.createElement('div');
        if (command === 'help') {
            responseDiv.textContent = 'Commandes disponibles: help, date, CV, DubMania, clear';
        } else if (command === 'date') {
            responseDiv.textContent = new Date().toString();
        } else if (command === 'cv') {
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/file/d/10Qlu5muhJ92iJrUkiyOHSixGy4VPJG2G/view?usp=sharing';
            link.target = '_blank';
            link.textContent = 'Regarder mon CV';
            responseDiv.appendChild(link);
        } else if (command === 'dubmania') {
            const link1 = document.createElement('a');
            link1.href = 'https://github.com/DJ4nto/DubMania';
            link1.target = '_blank';
            link1.textContent = 'DubMania';
            responseDiv.appendChild(link1);
        } else if (command === 'clear') {
            output.innerHTML = '';
        } else {
            responseDiv.textContent = 'Commande non reconnue: ' + command;
        }
        output.appendChild(responseDiv);
    }
});