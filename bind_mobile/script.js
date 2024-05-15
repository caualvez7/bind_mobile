const container = document.getElementById('container');
const pages = document.querySelectorAll('.page');
let startX = 0;
let currentX = 0;
let currentPageIndex = 0;

container.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener('touchmove', (e) => {
  const moveX = e.touches[0].clientX;
  const diffX = moveX - startX;
  container.style.transform = `translateX(${currentX + diffX}px)`;
});

container.addEventListener('touchend', (e) => {
  const moveX = e.changedTouches[0].clientX;
  const diffX = moveX - startX;
  currentX += diffX;

  // Determinar a direção do movimento do usuário
  const direction = diffX > 0 ? 1 : -1;

  // Encontrar a página mais próxima com base na direção do movimento
  if (Math.abs(diffX) > window.innerWidth / 4) {
    if (direction === 1 && currentPageIndex < pages.length - 1) {
      currentPageIndex++;
    } else if (direction === -1 && currentPageIndex > 0) {
      currentPageIndex--;
    }
  }

  // Centralizar a página mais próxima
  const nextPageOffset = currentPageIndex * -100;
  container.style.transform = `translateX(${nextPageOffset}vw)`;
  currentX = nextPageOffset * window.innerWidth / -100;
});
