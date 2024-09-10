function SayacAction() {
    console.log("app.js yüklendi!");
    
if (!localStorage.getItem('user')) {
    window.location.href = 'login.html';
}



    const counterSelect = document.getElementById('counterSelect');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const counterValue = document.getElementById('counterValue');
    console.log(startButton);
    const counterStatus = {}; // Sayaç durumlarını tutan nesne
    const updateIntervals = {}; // Her sayaç için interval id'leri
    let activeCounterId = counterSelect.value; // Şu anda aktif olan sayaç

    const logOutBtn = document.getElementById('LogOut');
    if (logOutBtn) {
        logOutBtn.addEventListener('click', logOutFunc);
    }

    if(counterSelect.value) {
        getCurrentValue(counterSelect.value);
    }

    counterSelect.addEventListener('change', () => {
        activeCounterId = counterSelect.value;
        if (activeCounterId) {
            getCurrentValue(activeCounterId);
        }
    });

    startButton.addEventListener('click', async () => {
        const counterId = counterSelect.value;
        console.log("start");

        if (!counterStatus[counterId]) { // Sayaç daha önce başlatılmamışsa
            const response = await fetch(`http://localhost:8088/api/counter/start/${counterId}`, {
                method: 'POST',
            });
            const result = await response.text();

            startUpdatingCounterValue(counterId);
            counterStatus[counterId] = true; // Sayaç durumu 'başlatıldı' olarak işaretlenir
        }
    });

    stopButton.addEventListener('click', async () => {
        const counterId = counterSelect.value;

        const response = await fetch(`http://localhost:8088/api/counter/stop/${counterId}`, {
            method: 'POST',
        });
        const result = await response.text();

        stopUpdatingCounterValue(counterId);
        counterStatus[counterId] = false; // Sayaç durumu 'durduruldu' olarak işaretlenir
    });

    async function updateCounterValue(counterId) {
        try {
            const response = await fetch(`http://localhost:8088/api/counter/value/${counterId}`);
            const value = await response.json();
            console.log(value);

            // Sadece aktif sayaç seçiliyse günceller
            if (counterId === activeCounterId) {
                counterValue.textContent = value;
            }
        } catch (error) {
            console.error('Error fetching counter value:', error);
        }
    }

    function startUpdatingCounterValue(counterId) {
        updateIntervals[counterId] = setInterval(() => updateCounterValue(counterId), 1000);
    }

    async function getCurrentValue(counterId) {
        try {
            const response = await fetch(`http://localhost:8088/api/counter/value/${counterId}`);
            const value = await response.json();
            console.log(value);

            // Sadece aktif sayaç seçiliyse günceller
            if (counterId === activeCounterId) {
                counterValue.textContent = value;
            }
        } catch (error) {
            console.error('Error fetching counter value:', error);
        }
    }

    function stopUpdatingCounterValue(counterId) {
        if (updateIntervals[counterId]) {
            clearInterval(updateIntervals[counterId]);
            updateIntervals[counterId] = null; // Interval id'sini null yapıyoruz
        }
    }

}

export default SayacAction;