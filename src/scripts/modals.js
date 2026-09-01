// Modal open/close helpers, ported from js/frame.js.
// Exposed on window because the markup uses inline onclick handlers.
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  window.dispatchEvent(new Event('resize'));
  const closeBtn = el.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('modal-open');
  document.body.style.overflow = '';
}

window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.modal-open').forEach((m) => closeModal(m.id));
  }
});
