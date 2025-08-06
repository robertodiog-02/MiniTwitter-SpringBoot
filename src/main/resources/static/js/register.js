document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    const showNotification = (message, type = 'error', redirectUrl = null) => {
        const formNotification = document.getElementById('formNotification');

        // Imposta il contenuto del messaggio
        formNotification.textContent = message;

        // Cambia lo stile in base al tipo
        formNotification.style.display = 'block';
        formNotification.className = `form-notification ${type}`;

        // Se è specificato un URL di reindirizzamento (per esempio nei messaggi di successo)
        if (type === 'success' && redirectUrl) {
            setTimeout(() => {
                window.location.href = redirectUrl;//l'oggetto window ha proprietà location.href , l'url della
                //pagina, modificandolo causa reindirizzamento
            }, 5000); // Reindirizza dopo 5 secondi
        }
    };

    // Nascondi l'errore quando necessario
    const hideNotification = () => {
        const formNotification = document.getElementById('formNotification');
        formNotification.style.display = 'none';
        formNotification.textContent = '';
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        hideNotification(); // Nascondi eventuali messaggi precedenti
        // Ottieni i dati dal form
        const nome = document.getElementById('first_name').value.trim();
        const cognome = document.getElementById('last_name').value.trim();
        const email = document.getElementById('email').value.trim();
        const numero = document.getElementById('numero').value.trim();
        const dataNascita = document.getElementById('birthdate').value;
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;

        // Validazione della password
        if (password !== confirmPassword) {
            showNotification('Le password non coincidono', 'error');
            return;
        }

        // Calcola l'età in base alla data di nascita
        const birthDate = new Date(dataNascita);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        //Correggi l'età se il mese/giorno di nascita non è ancora passato
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 14) {
            showNotification('Devi avere almeno 14 anni per registrarti.', 'error');
            return;
        }

        // Creazione del payload
        const user = {
            nome,
            cognome,
            email,
            numero,
            dataNascita,
            username,
            password
        };

        // Invia la richiesta POST al backend
        fetch('api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.text();
            })
            .then((message) => {
                showNotification(message, 'success', '/login'); // Mostra il messaggio di successo
                // Pulisci il form
                form.reset();

            })
            .catch((error) => {
                showNotification(error.message, 'error'); // Mostra l'errore all'utente
            });
    });
});