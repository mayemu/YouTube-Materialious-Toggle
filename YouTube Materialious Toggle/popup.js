document.addEventListener('DOMContentLoaded', function() {
    const instanceSelector = document.getElementById('instanceSelector');
    const newInstanceInput = document.getElementById('newInstance');
    const addButton = document.getElementById('addButton');
    const saveButton = document.getElementById('saveButton');

    // Load the saved instances from storage
    chrome.storage.local.get(['instances', 'selectedInstance'], function(data) {
        const instances = data.instances || ['https://app.materialio.us/'];
        const selectedInstance = data.selectedInstance || instances[0];

        // Populate the selector with instances
        instances.forEach(instance => {
            const option = document.createElement('option');
            option.value = instance;
            option.textContent = instance;
            instanceSelector.appendChild(option);
        });

        instanceSelector.value = selectedInstance;
    });

    // Add a new instance
    addButton.addEventListener('click', function() {
        const newInstance = newInstanceInput.value.trim();
        if (newInstance) {
            const option = document.createElement('option');
            option.value = newInstance;
            option.textContent = newInstance;
            instanceSelector.appendChild(option);
            newInstanceInput.value = '';

            // Save the new instance to storage
            chrome.storage.local.get('instances', function(data) {
                const instances = data.instances || [];
                if (!instances.includes(newInstance)) {
                    instances.push(newInstance);
                    chrome.storage.local.set({ 'instances': instances });
                }
            });
        }
    });

    // Save the selected instance to storage
    saveButton.addEventListener('click', function() {
        const selectedInstance = instanceSelector.value;
        chrome.storage.local.set({ 'selectedInstance': selectedInstance }, function() {
            alert('Instance saved successfully!');
        });
    });
});
