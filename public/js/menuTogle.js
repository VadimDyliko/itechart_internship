function menuTogle() {
  let menuElement = document.querySelector('.left-side-bar');
  menuElement.classList.toggle('left-side-bar--show');
  if (menuElement.classList.contains('left-side-bar--show')){
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'scroll';
  }
}
