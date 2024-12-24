// DECLARATION DE MES ELEMENTS Sélection des éléments
const btnAjouter = document.querySelector('.btn-add');
const btnSupprimer = document.querySelector('.btn-delete');
const btnEffacer = document.querySelector('.btn-clear');
const tbody = document.querySelector('tbody');

// FONCTION 1 Ajouter une ligne
btnAjouter.addEventListener('click', () => {
    const newRow = `
        <tr>
            <td><input type="text" placeholder="Libellé"></td>
            <td><input type="number" placeholder="prix HT"  step="0.01"></td>
            <td>
                <select>
                    <option value="">TVA</option>
                    <option value="2.8">2,8%</option>
                    <option value="5.5">5,5%</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                </select>
            </td>
            <td><input type="number" placeholder="prix TTC" readonly></td>
            <td><button class="action-btn btn-calculate">CALCULER</button></td>
            <td><button class="action-btn btn-clear-row">EFFACER</button></td>
            <td><button class="action-btn btn-delete-row">SUPPRIMER</button></td>
        </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', newRow);
});

// FONCTION 2 Supprimer la dernière ligne
btnSupprimer.addEventListener('click', () => {
    const rows = tbody.getElementsByTagName('tr');
    if (rows.length > 0) {
        tbody.removeChild(rows[rows.length - 1]);
    }
});

// FONCTION 3 Effacer tous les champs
btnEffacer.addEventListener('click', () => {
    const inputs = document.querySelectorAll('input');
    const selects = document.querySelectorAll('select');
    inputs.forEach(input => input.value = '');
    selects.forEach(select => select.selectedIndex = 0);
});

// Gestion des événements pour chaque ligne
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-calculate')) {
        const row = e.target.closest('tr');
        const prixHT = parseFloat(row.querySelector('input[type="number"]').value);
        const tva = parseFloat(row.querySelector('select').value);
        if (!isNaN(prixHT) && !isNaN(tva)) {
            const prixTTC = prixHT * (1 + tva/100);
            row.querySelector('input[readonly]').value = prixTTC.toFixed(2);
        }
    }
    
    if (e.target.classList.contains('btn-clear-row')) {
        const row = e.target.closest('tr');
        row.querySelectorAll('input').forEach(input => input.value = '');
        row.querySelector('select').selectedIndex = 0;
    }
    
    if (e.target.classList.contains('btn-delete-row')) {
        const row = e.target.closest('tr');
        row.remove();
    }
});
