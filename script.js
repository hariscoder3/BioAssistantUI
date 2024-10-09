const subDiseases = {
    'cardiovascular': ['Hypertension', 'Coronary Artery Disease', 'Heart Failure', 'Arrhythmias'],
    'neurological': ['Alzheimer\'s Disease', 'Parkinson\'s Disease', 'Multiple Sclerosis', 'Epilepsy'],
    'oncology': ['Breast Cancer', 'Lung Cancer', 'Leukemia', 'Colorectal Cancer'],
    'infectious': ['COVID-19', 'HIV/AIDS', 'Tuberculosis', 'Malaria']
};

document.getElementById('disease-category').addEventListener('change', function() {
    const category = this.value;
    const subDiseasesContainer = document.getElementById('sub-diseases');
    subDiseasesContainer.innerHTML = '';
    if (subDiseases[category]) {
        subDiseases[category].forEach(subDisease => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = subDisease;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${subDisease}`));
            subDiseasesContainer.appendChild(label);
        });
    }
});

document.getElementById('submit').addEventListener('click', function() {
    const question = document.getElementById('research-question').value;
    const response = document.getElementById('response');
    response.innerHTML = `<h2>Response:</h2><p>Researching: "${question}"</p><p>This is where the AI-generated response for biomedical research and drug design would appear.</p>`;
});