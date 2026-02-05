// ==================== ТАЙМЕР ОБРАТНОГО ОТСЧЁТА ====================
// Устанавливаем дату, ДО которой будет идти отсчёт (1 апреля 2026)
const deadline = new Date('2026-04-01T23:59:59');

function updateTimer() {
    const now = new Date();
    const diff = Math.max(0, deadline - now); // Разница в миллисекундах

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Обновляем числа на странице, добавляя ноль в начале если число < 10
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Если время вышло, останавливаем таймер
    if (diff === 0) {
        clearInterval(timerInterval);
    }
}

// Запускаем таймер сразу и обновляем каждую секунду
updateTimer();
const timerInterval = setInterval(updateTimer, 1000);

// ==================== ПОДКЛЮЧЕНИЕ METAMASK ====================
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const walletAlert = document.getElementById('walletAlert');

// Проверяем, установлен ли MetaMask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask обнаружен!');
    walletAlert.style.display = 'none'; // Скрываем предупреждение

    connectWalletBtn.addEventListener('click', async () => {
        try {
            // 1. Запрашиваем подключение кошельков у пользователя
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // 2. Отображаем информацию о подключенном кошельке
            walletAddress.textContent = account;
            walletInfo.style.display = 'block';
            connectWalletBtn.textContent = 'Кошелёк подключен';
            connectWalletBtn.disabled = true;
            connectWalletBtn.style.background = '#1ea050';

            console.log('Подключен кошелёк:', account);

            // Здесь в будущем можно добавить вызов вашего смарт-контракта
            // например, для проверки права на минт или самого минта.

        } catch (error) {
            console.error('Ошибка подключения кошелька:', error);
            alert('Не удалось подключить кошелёк. Проверьте MetaMask.');
        }
    });

} else {
    // Если MetaMask не установлен, показываем предупреждение и деактивируем кнопку
    console.log('MetaMask НЕ обнаружен.');
    connectWalletBtn.disabled = true;
    connectWalletBtn.style.background = '#666';
    walletAlert.style.display = 'block';
}
