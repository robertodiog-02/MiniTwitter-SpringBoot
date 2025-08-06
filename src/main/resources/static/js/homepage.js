
// ----------------
// API PER CARICAMENTO POST
// ----------------
function loadPosts() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let offset = parseInt(loadMoreBtn.getAttribute('data-offset'));
    loadMoreBtn.textContent = 'Caricamento...';
    loadMoreBtn.disabled = true;

    fetch(`/api/posts/generateXmlPosts?offset=${offset}&limit=5`, {
        method: 'GET',
        headers: {
            "Accept": "application/xml"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore durante la richiesta: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            const posts = xmlDoc.getElementsByTagName('post');
            let postList = '';

            if (posts.length === 0) {
                // Se non ci sono più post da caricare, disabilita il pulsante
                loadMoreBtn.textContent = 'Non ci sono post da caricare';
                loadMoreBtn.disabled = true;
            } else {
                // Altrimenti, carica i nuovi post
                for (let i = 0; i < posts.length; i++) {
                    const postData = extractPostData(posts[i]);  // Estrai i dati dal nodo XML
                    postList += createPostPreview(postData);  // Usa la funzione per creare la preview del post
                }
                document.getElementById('posts-container').insertAdjacentHTML('beforeend', postList);

                // Se sono stati caricati meno di 5 post, significa che sono gli ultimi
                if (posts.length < 5) {
                    loadMoreBtn.textContent = 'Non ci sono più post da caricare';
                    loadMoreBtn.disabled = true;
                } else {
                    // si aggiorna l'offset per il prossimo caricamento
                    offset += 5;
                    loadMoreBtn.setAttribute('data-offset', offset);
                    loadMoreBtn.textContent = 'Carica altri post';
                    loadMoreBtn.disabled = false;
                }
            }
        })
        .catch(error => {
            console.error('Errore nel caricamento dei post:', error);
            loadMoreBtn.textContent = 'Errore. Riprova a ricaricare la pagina.';
            loadMoreBtn.disabled = false;
        });
}

// ----------------
// API PER CARICAMENTO COMMENTI
// ----------------

function loadComments(postId) {
    const loadMoreButton = document.getElementById('loadMoreComments');
    const commentsContainer = document.getElementById('modalComments');
    let offset = parseInt(loadMoreButton.getAttribute('data-offset'));

    // Richiesta per ottenere i commenti in formato XML
    fetch(`/api/comments/generateXmlComments?postId=${postId}&limit=5&offset=${offset}`, {
        method: 'GET',
        headers: {
            "Accept": "application/xml"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore durante la richiesta: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            // Estrai i commenti dal documento XML
            const comments = xmlDoc.getElementsByTagName('comment');

            // Caso 1: Nessun commento al primo caricamento
            if (comments.length === 0 && offset === 0) {
                commentsContainer.innerHTML = `
                    <div class="no-comments-message">
                        <p>Non ci sono ancora commenti</p>
                        <p>Sii il primo a condividere la tua opinione!</p>
                    </div>
                `;
                loadMoreButton.style.display = 'none';  // Nascondi il pulsante
                return;
            }

            // Caso 2: Nessun commento in un successivo caricamento
            if (comments.length === 0) {
                loadMoreButton.setAttribute('disabled', 'true');
                loadMoreButton.textContent = 'Non ci sono altri commenti da caricare';
                return;
            }

            // Caso 3: Aggiungi i commenti alla modale
            for (let i = 0; i < comments.length; i++) {
                const commentData = parseCommentFromXML(comments[i]); // Usa la funzione di parsing
                const commentHTML = createCommentHTML(commentData);     // Genera l'HTML
                commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
            }

            // sono gli ultimi commenti
            if (comments.length < 5) {
                loadMoreButton.setAttribute('disabled', 'true');
                loadMoreButton.textContent = 'Non ci sono altri commenti da caricare';
            } else {
                // Aggiorna l'offset per il prossimo caricamento
                offset += 5;
                loadMoreButton.setAttribute('data-offset', offset);
                loadMoreButton.textContent = 'Carica altri commenti';  // Ripristina il testo
            }
        })
        .catch(error => {
            console.error('Errore nel recupero dei commenti:', error);
            loadMoreButton.textContent = 'Errore. Riprova.';
            loadMoreButton.disabled = false;
        });
}

// ----------------
// UTILITY PER L'ESTRAZIONE DATI DAGLI XML
// ----------------
function extractPostData(postElement) {
    const id = Number (postElement.getAttribute('id'));
    const authorFullName = postElement.getElementsByTagName('author')[0].textContent;
    const authorUsername = postElement.getElementsByTagName('username')[0].textContent;
    const title = postElement.getElementsByTagName('title')[0].textContent;
    const date = postElement.getElementsByTagName('date')[0].textContent;
    const time = postElement.getElementsByTagName('time')[0].textContent;
    const preview = postElement.getElementsByTagName('preview')[0].textContent;
    const content = postElement.getElementsByTagName('content')[0].textContent;
    const comments = Number(postElement.getElementsByTagName('commentCount')[0].textContent);
    //cast necessario perché altrimenti sarebbe una stringa

    return {
        id, authorFullName, authorUsername, title, date, time, content, preview, comments
    }; //object shorthand notation
    // :il nome della proprietà di un oggetto è uguale al nome della variabile che
    // voglio assegnare alla proprietà
}

// Funzione per estrarre i dati del commento dal XML
function parseCommentFromXML(commentElement) {
    const text = commentElement.getElementsByTagName('text')[0].textContent;
    const authorFullName = commentElement.getElementsByTagName('author')[0].textContent;
    const authorUsername = commentElement.getElementsByTagName('username')[0].textContent;
    const date = commentElement.getElementsByTagName('date')[0].textContent;
    const time = commentElement.getElementsByTagName('time')[0].textContent;

    return {
        text, authorFullName, authorUsername, date, time
    };
}

// -----------------------------
// RENDERIZZAZIONE HTML
// -----------------------------
function createPostPreview(post) {
    const time_personalized = formattaDataPost(post.date, post.time);
    const count_personalized = formatCommentCount(post.comments)
    return `
        <div class="post-preview" data-id="${post.id}">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-meta">Autore: ${post.authorFullName} | Pubblicato ${time_personalized}</p>
            <p class="post-summary">${post.preview}</p>
            <div class="post-preview-footer">
                <div class="comment-count">
                    <i class='bx bx-message-rounded'></i>
                    <span id="counter-comm" data-count="${post.comments}">${count_personalized}</span>
                </div>
                <a href="#" class="read-more" data-id="${post.id}">Leggi il post completo</a>
            </div>
       </div>
    `;
}

function createCommentHTML(comment) {
    const timePersonalized = formattaDataCommento(comment.date, comment.time);
    return `
        <div class="comment">
            <strong>${comment.authorFullName}</strong> <span>@${comment.authorUsername} · ${timePersonalized}</span>
            <p>${comment.text}</p>
        </div>
    `;
}

// ----------------
// MODALE PER CREAZIONE POST
// ----------------
function showModalAddPost() {
    //abilitiamo il background della modale
    const overlay = document.querySelector('.modal-overlay');
    overlay.style.display = 'block';
    const modal = createModalStructureAddPost();
    //aggiugniamo la modale al DOM come ultimo figlio
    document.body.appendChild(modal);
    //con la modale aperta il body non deve essere scrollabile
    document.body.classList.add('no-scroll');
    //gestisce gli eventi della modale
    setupModalEventsAddPost(modal);
    //gestisce la chisura
    setupAddPostModalClosing(modal);
}

function setupAddPostModalClosing(modal) {
    document.querySelector('.modal-overlay').addEventListener('click', chiudiFinestraModaleCreaPost);
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', chiudiFinestraModaleCreaPost);
}

function chiudiFinestraModaleCreaPost() {
    const modal = document.getElementById('creaPostModal');
    if (modal) {
        document.body.removeChild(modal);
        document.querySelector('.modal-overlay').style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
}

function createModalStructureAddPost() {
    const modal = document.createElement('div');
    modal.id = 'creaPostModal';
    modal.classList.add('modal');

    modal.innerHTML = `
        <h1>Crea un nuovo post</h1>
        <span class="close-btn">&times;</span>
            <form id="postForm">
                <div class="form-group">
                    <div class="label-container">
                        <label for="title">Titolo:</label>
                        <div class="circle-container">
                            <svg class="char-counter-circle" viewBox="0 0 36 36">
                                <circle class="circle-bg" cx="18" cy="18" r="16"></circle>
                                <circle class="circle-progress" cx="18" cy="18" r="16" stroke-dasharray="0 100"></circle>
                            </svg>
                            <span class="char-count">0</span>
                        </div>
                    </div>
                    <textarea id="title" class="input-field" maxlength="100" rows="2" required></textarea>
                </div>
        
                <div class="form-group">
                    <div class="label-container">
                        <label for="preview">Anteprima:</label>
                        <div class="circle-container">
                            <svg class="char-counter-circle" viewBox="0 0 36 36">
                                <circle class="circle-bg" cx="18" cy="18" r="16"></circle>
                                <circle class="circle-progress" cx="18" cy="18" r="16" stroke-dasharray="0 100"></circle>
                            </svg>
                            <span class="char-count">0</span>
                        </div>
                    </div>
                    <textarea id="preview" class="input-field" maxlength="100" rows="3" required></textarea>
                </div>
        
                <div class="form-group">
                    <div class="label-container">
                        <label for="content">Testo completo:</label>
                        <div class="circle-container">
                            <svg class="char-counter-circle" viewBox="0 0 36 36">
                                <circle class="circle-bg" cx="18" cy="18" r="16"></circle>
                                <circle class="circle-progress" cx="18" cy="18" r="16" stroke-dasharray="0 100"></circle>
                            </svg>
                            <span class="char-count">0</span>
                        </div>
                    </div>
                    <textarea id="content" class="input-field" maxlength="280" rows="9" required></textarea>
                </div>
        
                <button type="submit">Pubblica</button>
            </form>
    `;

    return modal;
}

function setupModalEventsAddPost(modal) {
    setupCharacterCounters(modal, '.input-field');
    setupPostCreationHandler(modal);
}

function setupPostCreationHandler(modal) {
    const form = modal.querySelector("#postForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const preview = document.getElementById("preview").value.trim();
        const content = document.getElementById("content").value.trim();

        // Controlla se i campi sono vuoti o contengono solo spazi
        //replace elimina qualsiasi tipodi spazio bianco \s  ripetuto una o piu volte(+) , g modificatore globale per farlo  con tutte le occorrenze nella stringa e non fermarsi alla prima
        if (!title || !preview || !content || title.replace(/\s+/g, '').length === 0 || preview.replace(/\s+/g, '').length === 0 || content.replace(/\s+/g, '').length === 0) {
            showNotification("Errore: tutti i campi devono essere riempiti con dei caratteri validi.", true);
            return;
        }

        // Recupera l'utente loggato
        fetch('/api/users/me')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dell\'utente loggato');
                }
                return response.json();
            })
            .then(user => {
                console.log("Utente loggato:", user);

                // Prepara i dati del post
                const formData = {
                    title: title,
                    preview: preview,
                    content: content,
                    author: { id: user.id },
                    date: new Date().toLocaleDateString("en-CA"), // Data in formato YYYY-MM-DD
                    time: new Date().toLocaleTimeString("it-IT", { hour12: false }) // Ora in formato HH:mm:ss (24h)
                };

                // Effettua la richiesta POST-->questo return rende la fetch una promise che permette alla catena di proseguire
                return fetch("/api/posts/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/xml"
                    },
                    body: JSON.stringify(formData)
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Errore nella richiesta: ${response.status}`);
                }
                return response.text(); // Leggi la risposta come testo
            })
            .then(responseXML => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(responseXML, "application/xml");

                const postElement = xmlDoc.getElementsByTagName('post')[0];
                if (postElement) {
                    const postData = extractPostData(postElement);
                    const postsContainer = document.getElementById('posts-container');
                    postsContainer.insertAdjacentHTML('afterbegin', createPostPreview(postData));

                    showNotification("Post creato con successo!");
                    resetCounters(modal, '.input-field');
                } else {
                    console.error("Errore nel parsing dell'XML: post non trovato");
                }
            })
            .catch(error => {
                console.error("Errore durante la creazione del post:", error.message);
                showNotification(error.message, true);
            });
    });
}


function updateProgress(field) {
    const maxChars = parseInt(field.getAttribute('maxlength'));
    const circle = field.parentElement.querySelector('.circle-progress');
    const charCount = field.parentElement.querySelector('.char-count');

    const currentLength = field.value.length;
    const percent = (currentLength / maxChars) * 100;
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100 * circumference);

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    charCount.textContent = maxChars - currentLength;
    charCount.style.display = currentLength > 0 ? 'block' : 'none';

    if (percent > 90) {
        circle.style.stroke = '#f4212e';
    } else if (percent > 75) {
        circle.style.stroke = '#ffad1f';
    } else {
        circle.style.stroke = '#1DA1F2';
    }
}

// Funzione per inizializzare i contatori e il listener
function setupCharacterCounters(modal, fieldSelector) {
    const fields = modal.querySelectorAll(fieldSelector);

    fields.forEach(field => {
        // Aggiungi il listener per aggiornare il progresso quando l'utente digita
        field.addEventListener('input', function() {
            updateProgress(field);
        });

        // Inizializza il contatore per ogni campo
        updateProgress(field);
    });
}

// Funzione per resettare i contatori
function resetCounters(modal, fieldSelector) {
    const fields = modal.querySelectorAll(fieldSelector); // Seleziona i campi all'interno della modale

    fields.forEach(field => {
        // Reset dei contatori

        // Ripristino il colore del cerchio e nascondo il contatore
        const circle = field.parentElement.querySelector('.circle-progress');
        const charCount = field.parentElement.querySelector('.char-count');

        if (circle && charCount) {
            charCount.style.display = 'none'; // Nascondo il contatore
            circle.style.stroke = '#1DA1F2';  // Colore iniziale grigiastro
            // Imposto il progresso al 0%
            const radius = 16;
            const circumference = radius * 2 * Math.PI;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference; // Al 0%, la barra deve essere vuota
        }
        // Pulisci il valore del campo
        field.value = '';
    });
}
// ----------------
// MODALE PER OTTENERE DETTAGLI POST, COMMENTI E AGGIUNGERE COMMENTO
// ----------------
function showModalPostDetails(postId) {
    // Abilitiamo il background della modale
    const overlay = document.querySelector('.modal-overlay');
    overlay.style.display = 'block';
    // Richiesta per ottenere i dettagli del post in formato XML
    fetch(`/api/posts/generateXmlPost/${postId}`, {
        method: 'GET',
        headers: {
            "Accept": "application/xml"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status}`);
            }
            return response.text(); // Leggi la risposta come testo
        })  // Leggi la risposta come testo (XML)
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            // Estrai il nodo <post> dal documento XML
            const postElement = xmlDoc.getElementsByTagName('post')[0];
            if (!postElement) throw new Error("Post non trovato nell'XML.");
            // si usa la funzione `extractPostData` per ottenere i dati
            const postData = extractPostData(postElement);

            // Popola la modale con i dati del post
            const modal = createStructureModalPostDetails(postData);
            document.body.appendChild(modal);
            // Con la modale aperta il body non deve essere scrollabile
            document.body.classList.add('no-scroll');

            // Carica i commenti
            loadComments(postData.id);

            // Dopo aver creato la modale, aggiungo l'event listener per il pulsante "Carica altri commenti"
            const loadMoreButton = document.getElementById('loadMoreComments');
            if (loadMoreButton) {
                loadMoreButton.addEventListener('click', function () {
                    loadComments(postData.id);
                });
            }

            setupModalEventsPostDetails(modal);

        })
        .catch(error => {
            console.error('Errore nel caricamento del post:', error);
        });
}

function createStructureModalPostDetails(post) {
    const modal = document.createElement('div');
    modal.id = 'postModal';
    modal.classList.add('modal');
    const time_personalized = formattaDataPost(post.date, post.time);

    modal.innerHTML = `
        <div class="menu">
            <a href="#" class="back-button">← Homepage</a>
            <button class="comment-button">Reply</button>
        </div>
        <div class="post-header">
            <h2 id="modalPostTitle">${post.title}</h2>
            <span id="modalPostAuthor">Autore: ${post.authorFullName}</span>
            <span id="modalPostUsername"> · @${post.authorUsername}</span>
            <div id="modalPostDate" class="post-meta">Pubblicato ${time_personalized}</div>
        </div>
        <div id="modalPostContent" class="post-content">${post.content}</div>
        <div class="comment-section">
            <h4>Aggiungi un commento</h4>
            <form action="" class="comment-form">
                <textarea class="comment-input" maxlength="120" placeholder="Post your reply here..." rows="4"></textarea>
                <div class="button-circle-wrapper">
                    <div class="circle-container">
                        <svg class="char-counter-circle" viewBox="0 0 36 36">
                            <circle class="circle-bg" cx="18" cy="18" r="16"></circle>
                            <circle class="circle-progress" cx="18" cy="18" r="16" stroke-dasharray="0 100"></circle>
                        </svg>
                        <span class="char-count">0</span>
                    </div>
                    <button type="submit" class="comment-button-form" data-id="${post.id}" >Reply</button>
                </div>
            </form>
        </div>
        <div class="comments-section">
            <h4>Commenti</h4>
            <div id="modalComments"></div>
            <button id="loadMoreComments" class="load-more-comments"  data-offset="0">Carica altri commenti</button>
        </div>
    `;

    return modal;
}

function setupModalEventsPostDetails(modal) {
    setupCharacterCounters(modal, '.comment-input')
    setupCommentButtonVisibility(modal);
    setupPostDetailsModalClosing(modal);
    setupAddCommentHandler(modal);
}

function updateCommentCount(postId, increment = 1) {
    // Trova il post con il relativo postId
    const postPreview = document.querySelector(`.post-preview[data-id="${postId}"]`);

    // Trova l'elemento del contatore dei commenti
    const commentCount = postPreview.querySelector('.comment-count span');

    // Recupera il valore esatto dei commenti dal data-count
    const currentCount = parseInt(commentCount.getAttribute('data-count'));

    // Incrementa il valore esatto
    const newCount = currentCount + increment;

    // Aggiorna l'attributo data-count con il nuovo valore esatto
    commentCount.setAttribute('data-count', newCount.toString());

    // Applica la formattazione e aggiorna il contenuto del testo
    commentCount.textContent = formatCommentCount(newCount); // Incrementa il contatore
}

function setupAddCommentHandler(modal) {

    const commentForm = modal.querySelector('.comment-form');
    const commentTextArea = modal.querySelector('.comment-input');
    const submitButton = modal.querySelector('.comment-button-form');

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const postId = submitButton.getAttribute('data-id'); // Recupera l'ID del post dal bottone

        fetch('/api/users/me')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dell\'utente loggato');
                }
                return response.json();
            })
            .then(user => {
                console.log("Utente loggato:", user);

                // Salva l'ID utente
                const userId = user.id;

                const commentText = commentTextArea.value.trim();
                if (!commentText || commentText.replace(/\s+/g, '').length === 0) {
                    showNotification("Il commento non può essere vuoto.", true);
                    throw new Error("Commento vuoto");
                }

                // Prepara i dati del commento
                const commentData = {
                    text: commentText,
                    author: { id: userId },
                    post: { id: postId },
                    date: new Date().toLocaleDateString("en-CA"), // Data in formato YYYY-MM-DD
                    time: new Date().toLocaleTimeString("it-IT", { hour12: false }) // Ora in formato HH:mm:ss (24h)
                };

                return fetch(`/api/comments/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/xml' // Richiedi la risposta in formato XML
                    },
                    body: JSON.stringify(commentData)
                });
            })
            .then(commentResponse => {
                if (!commentResponse.ok) {
                    throw new Error(`Errore durante la richiesta: ${commentResponse.status}`);
                }
                return commentResponse.text(); // Ottieni la risposta come testo
            })
            .then(responseXML => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(responseXML, "application/xml");

                const commentElement = xmlDoc.getElementsByTagName('comment')[0];
                if (!commentElement) {
                    throw new Error("Errore nel parsing della risposta XML.");
                }

                const commentDataParsed = parseCommentFromXML(commentElement);

                showNotification("Commento aggiunto con successo!");

                // Aggiungi il nuovo commento alla UI
                addCommentToUI(commentDataParsed);
                resetCounters(modal, '.comment-input');
                updateCommentCount(postId); // Aggiorna il contatore dei commenti
            })
            .catch(error => {
                console.error("Errore durante la richiesta:", error);
                if (error.message !== "Commento vuoto") {
                    showNotification(error.message, true);
                }
            });
    });
    // Funzione per aggiungere il commento alla UI
    function addCommentToUI(comment) {
        const commentsSection = document.querySelector('#modalComments');

        // Rimuovi il messaggio "Non ci sono ancora commenti" se esiste
        const noCommentsMessage = commentsSection.querySelector('.no-comments-message');
        if (noCommentsMessage) {
            noCommentsMessage.remove();
        }
        // Usa `createCommentHTML` per generare l'HTML del commento
        const commentHTML = createCommentHTML(comment);

        // Inserisci il commento all'inizio della sezione
        commentsSection.insertAdjacentHTML('afterbegin', commentHTML);
    }
}

function setupCommentButtonVisibility(modal) {
    const commentButton = modal.querySelector('.comment-button');
    const commentSection = modal.querySelector('.comment-section');
    const stickyHeader = document.querySelector('.menu');
    const stickyHeaderHeight = stickyHeader.offsetHeight;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            commentButton.style.display = entry.isIntersecting ? 'none' : 'block';
        });
    }, {
        root: modal,
        threshold: 0,
        rootMargin: `-${stickyHeaderHeight}px 0px 0px 0px`
    });

    observer.observe(commentSection);

    commentButton.addEventListener('click', () => {
        const commentSectionTop = commentSection.offsetTop;
        modal.scrollTo({
            top: commentSectionTop - 100,
            behavior: 'smooth'
        });
        const textarea = modal.querySelector('.comment-input');
        textarea.classList.add('flash-border');
        setTimeout(() => textarea.classList.remove('flash-border'), 1000);
    });
}

function setupPostDetailsModalClosing(modal) {
    modal.querySelector('.back-button').addEventListener('click', function(event) {
        event.preventDefault();
        closeModalPostDetails();
    });

    document.querySelector('.modal-overlay').addEventListener('click', closeModalPostDetails);
}

function closeModalPostDetails() {
    const modal = document.getElementById('postModal');
    if (modal) {
        document.body.removeChild(modal);
        document.querySelector('.modal-overlay').style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
}


// ----------------
// UTILITY PER LA FORMATTAZIONE DELLE DATE
// ----------------
function formattaDataPost(dataPubblicazione, oraPubblicazione) {
    const dataCompleta = new Date(`${dataPubblicazione}T${oraPubblicazione}`);
    const oraCorrente = new Date();
    const differenzaInMillis = oraCorrente - dataCompleta;
    const differenzaInMinuti = Math.floor(differenzaInMillis / 60000);
    const differenzaInOre = Math.floor(differenzaInMinuti / 60);

    if (differenzaInMinuti < 1) return "meno di un minuto fa";
    if (differenzaInMinuti ===1) return "1 minuto fa";
    if (differenzaInOre < 1) return `${differenzaInMinuti} minuti fa`;
    if(differenzaInOre === 1) return "1 ora fa";
    if (differenzaInOre < 24) return `${differenzaInOre} ore fa`;

    const opzioniData = { day: 'numeric', month: 'long', year: 'numeric' };
    const opzioniOra = { hour: '2-digit', minute: '2-digit' };
    return `il ${dataCompleta.toLocaleDateString('it-IT', opzioniData)} alle ${dataCompleta.toLocaleTimeString('it-IT', opzioniOra)}`;
}

function formattaDataCommento(dataPubblicazione, oraPubblicazione) {
    const dataCompleta = new Date(`${dataPubblicazione}T${oraPubblicazione}`);
    const oraCorrente = new Date();
    const differenzaInMillis = oraCorrente - dataCompleta;
    const differenzaInMinuti = Math.floor(differenzaInMillis / 60000);
    const differenzaInOre = Math.floor(differenzaInMinuti / 60);
    const differenzaInGiorni = Math.floor(differenzaInOre / 24);


    if (differenzaInMinuti < 1) return "meno di un minuto fa";
    if (differenzaInMinuti ===1) return "1 minuto fa";
    if (differenzaInOre < 1) return `${differenzaInMinuti} minuti fa`;
    if(differenzaInOre === 1) return "1 ora fa";
    if(differenzaInOre < 24)    return `${differenzaInOre} ore fa`;

    const annoCorrente = oraCorrente.getFullYear();
    const annoData = dataCompleta.getFullYear();

    if (annoData === annoCorrente) {
        if(differenzaInGiorni===1) return "1 giorno fa";
        if (differenzaInGiorni <= 30) return `${differenzaInGiorni} giorni fa`;
        return `${dataCompleta.getDate()} ${dataCompleta.toLocaleString('default', { month: 'long' })}`;
    }

    return `${dataCompleta.getDate()} ${dataCompleta.toLocaleString('default', { month: 'long' })} ${annoData}`;
}
//--------------
//FORMATTAZIONE CONTEGGIO COMMENTI
//---------------
function formatCommentCount(count) {
    if (count < 1000) {
        return `${count}`;
    } else if (count < 1000000) {
        return `${(count / 1000).toFixed(1)}K`.replace('.0', ''); // Rimuove il ".0" se non necessario
    } else {
        return `${(count / 1000000).toFixed(1)}M`.replace('.0', ''); // Stesso principio per milioni
    }
}

// ----------------
// DOCUMENT READY --> EVENT LISTENERS
// ----------------
document.addEventListener('DOMContentLoaded', () => {

    loadPosts();
    // Setup bottone "Carica altri"
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', loadPosts);

    // Event Delegation: aggiungo un unico listener al contenitore dei post
    document.getElementById('posts-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('read-more')) {
            event.preventDefault();
            const idPost = event.target.getAttribute('data-id');
            showModalPostDetails(idPost);
        }
    });
    // Setup bottoni creazione post
    setupAddPostButtons();
});

function setupAddPostButtons() {
    const btnPost = document.querySelector('.btn-post');
    const floatingBtn = document.querySelector('.floating-btn');

    // Crea un observer per monitorare la visibilità di btnPost
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se btn-post è visibile, nasconde il bottone fluttuante
                floatingBtn.style.display = 'none';
            } else {
                // Se btn-post non è visibile, mostra il bottone fluttuante
                floatingBtn.style.display = 'block';
            }
        });
    }, {
        root: null, // Usa il viewport della pagina come root
        threshold: 0 // Trigger anche se solo una parte è visibile
    });

    // Inizia l’osservazione di btn-post
    visibilityObserver.observe(btnPost);

    btnPost.addEventListener('click', showModalAddPost);

    floatingBtn.addEventListener('click', showModalAddPost);
}

let notificationTimeout; // Variabile globale per il timer
function showNotification(message, isError = false, duration=4000) {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');

    // Cancella eventuali timer attivi
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    // Imposta il messaggio e il colore (success/error)
    messageElement.textContent = message;
    notification.className = `notification show ${isError ? 'error' : ''}`;
    notification.style.display = 'flex';

    // Nascondi  dopo 4 secondi
    notificationTimeout = setTimeout(() => {
        closeNotification();
    }, duration);
}

function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
    setTimeout(() => (notification.style.display = 'none'), 300); // Attendi l'animazione
}



