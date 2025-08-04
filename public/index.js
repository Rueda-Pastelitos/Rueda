let hasOrdered = false;

// Cambia lingua
function switchLanguage(lang) {
  const it = document.querySelectorAll('.lang-it');
  const es = document.querySelectorAll('.lang-es');
  it.forEach(el => el.style.display = lang === 'it' ? 'block' : 'none');
  es.forEach(el => el.style.display = lang === 'es' ? 'block' : 'none');
}

// Disabilita form testimonianze
function disableTestimonialForm() {
  document.querySelectorAll("#testimonianze form").forEach(form => {
    form.querySelector("textarea").disabled = true;
    form.querySelector("input").disabled = true;
    form.querySelector("button").disabled = true;
  });
}

// Abilita form testimonianze
function enableTestimonialForm() {
  document.querySelectorAll("#testimonianze form").forEach(form => {
    form.querySelector("textarea").disabled = false;
    form.querySelector("input").disabled = false;
    form.querySelector("button").disabled = false;
  });
}

// Invia ordine via WhatsApp
function sendWhatsAppOrder(event) {
  event.preventDefault();

  const name = document.getElementById('orderName').value;
  const email = document.getElementById('orderEmail').value;
  const qty = document.getElementById('orderQty').value;

  const message = `Ciao! Vorrei ordinare una confezione RUEDA.%0A📦 Quantità: ${qty} dischi%0A👤 Nome: ${name}%0A📧 Email: ${email}`;
  const phone = "393932760000"; // Inserisci il numero corretto
  const url = `https://wa.me/${phone}?text=${message}`;

  hasOrdered = true;
  alert("Grazie per il tuo ordine! Ora puoi lasciare una recensione.");
  enableTestimonialForm();
  window.open(url, '_blank');
}

// Invia testimonianza
function inviaTestimonianza(event, lingua) {
  event.preventDefault();

  const nome = document.getElementById(`name-${lingua}`).value;
  const testo = document.getElementById(`testimonial-${lingua}`).value;

  fetch('https://rueda-production.up.railway.app/api/testimonianze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: nome,
    recensione: testo,
    translation: lingua === 'es' ? testo : '' // o come preferisci gestire la traduzione
  })
})
  .then(response => {
    if (!response.ok) throw new Error("Errore nel salvataggio");
    return response.json();
  })
  .then(data => {
    alert("Grazie per la tua testimonianza!");
    document.getElementById(`name-${lingua}`).value = '';
    document.getElementById(`testimonial-${lingua}`).value = '';
  })
  .catch(error => {
    console.error("Errore:", error);
    alert("Si è verificato un errore. Riprova più tardi.");
  });
}

// Inizializza la pagina
document.addEventListener('DOMContentLoaded', () => {
  switchLanguage('it'); // Lingua predefinita
  disableTestimonialForm(); // Disabilita testimonianze all'inizio
});
