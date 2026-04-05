(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href.endsWith(path)) a.classList.add('active');
  });

  document.querySelectorAll('[data-toggle-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.toggleTarget);
      if (!target) return;
      target.style.display = target.style.display === 'none' ? '' : 'none';
    });
  });
})();
