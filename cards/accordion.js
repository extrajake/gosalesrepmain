const button = document.querySelector(".qrExt");
const qrContent = document.querySelector('.qr-content');

button.addEventListener('click', () => {
    qrContent.classList.toggle('active');
})