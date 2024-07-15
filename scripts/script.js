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
        const skip = document.createElement('br') ;
        if (command === 'help') {
            responseDiv.textContent = 'Commandes disponibles: help, date, CV, DubMania, clear';
        } else if (command === 'date') {
            responseDiv.textContent = new Date().toString();
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
        } else if (command === 'dubmania') {
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
            responseDiv.appendChild(link2)
        } else if (command === 'clear') {
            output.innerHTML = '';
        } else {
            responseDiv.textContent = 'Commande non reconnue: ' + command;
        }
        output.appendChild(responseDiv);
    }
});