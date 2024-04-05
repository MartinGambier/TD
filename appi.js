let codePostal = document.getElementById('CP')
codePostal.addEventListener('input', () => {
  let CPSaisi = codePostal.value
  if (CPSaisi.length === 5) {
    console.log('valeur:', CPSaisi)
    console.table(apiCommunes(CPSaisi))
  }
})

async function apiCommunes(CP) {

  try {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${CP}`
    );
    const data = await response.json();
    console.table(data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la requête API:", error);
    throw error;
  }
}

// if (^[0-9]{5}$.test(CP)) {
//   try {
//     // const data = await apiCommunes(CP);
//     // displayCommunes(data);
//   } catch (error) {
//     console.error(
//       "Une erreur est survenue lors de la recherche de la commune :",
//       error
//     );
//     throw error;
//   }
// }

    // function displayCommunes(data) {
    //     communeSelect.innerHTML = "";
    //     if (data.length === 1) {
    //       const commune = data[0];
    //       communeSelect.innerHTML = `<option value="${commune.code}">${commune.nom}</option>`;
    //     } else if (data.length > 1) {
    //       data.forEach((commune) => {
    //         const option = document.createElement("option");
    //         option.value = commune.code;
    //         option.textContent = commune.nom;
    //         communeSelect.appendChild(option);
    //       });
    //     }
    //     communeSelect.style.display = "block";
    //     validationButton.style.display = "block";
    // }



// const codePostal = document.getElementById('CP');

// codePostal.addEventListener('input', () => {
//   const enteredCodePostal = codePostal.value

//   if (enteredCodePostal.length === 5) {
//     // Code à exécuter lorsque le code postal a 5 chiffres
//     console.log('Valeur :', enteredCodePostal);

//     // Vous pouvez effectuer d'autres actions ici, par exemple :
//     // - Appeler une API pour récupérer des données liées au code postal
//     // - Afficher un message de validation à l'utilisateur
//   }
// });


