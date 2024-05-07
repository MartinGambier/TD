document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const commune = document.getElementById('CodePostal').value;
    const ville = document.getElementById('commune').value;

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${commune}&fields=nom`)
        .then(response => response.json())
        .then(data => {
            const nVille = data[0].nom;
            ville.value = nVille;

           let code_insee = document.getElementById('commune').value
           console.log(code_insee)
            fetch(`https://api.meteo-concept.com/api/forecast/daily?token=287301e37ba9d41b8bab3e01cb24d33740f413426375e19463a804ddbebcf410&insee=${code_insee}`)
                .then(response => response.json())
                .then(data => {
                    const forecast = data.forecast[0];
                    const minTemp = forecast.tmin;
                    const maxTemp = forecast.tmax;
                    const Probabilitédepluie = forecast.rr10;
                    const leverdesoleil = forecast.sun_hours;

                    const weatherInfo = `
                        <p>Température minimale : ${minTemp} °C</p>
                        <p>Température maximale : ${maxTemp} °C</p>
                        <p>Probabilité de pluie : ${Probabilitédepluie}%</p>
                        <p>Nombre d'heures d'ensoleillement : ${leverdesoleil} heures</p>
                    `;
                    document.getElementById('weatherInfo').innerHTML = weatherInfo;
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données météorologiques :', error);
                    document.getElementById('weatherInfo').innerHTML = '<p>Erreur lors de la récupération des données météorologiques. Veuillez réessayer.</p>';
                });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la commune :', error);
            document.getElementById('weatherInfo').innerHTML = '<p>Erreur lors de la récupération de la commune. Veuillez vérifier le code postal.</p>';
        });
});


function loadCommunes(codePostal) {
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=nom`)
        .then(response => response.json())
        .then(data => {
            const communeSelect = document.getElementById('commune');
            communeSelect.innerHTML = '<option value="">Sélectionnez une commune</option>';
            data.forEach(commune => {
                const option = document.createElement('option');
                option.value = commune.code;
                option.textContent = commune.nom;
                communeSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des communes :', error));
}


document.getElementById('CodePostal').addEventListener('input', function() {
    const codePostal = this.value;
    if (codePostal.length === 5) {
        loadCommunes(codePostal);
    }
});


