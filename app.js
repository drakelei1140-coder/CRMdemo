(function () {
  var path = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href.endsWith(path)) {
      link.classList.add('active');
      var sub = link.closest('.nav-sub');
      if (sub) {
        var parent = sub.previousElementSibling;
        if (parent && parent.classList.contains('nav-link')) {
          parent.classList.add('active');
        }
      }
    }
  });

  document.querySelectorAll('[data-toggle-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-toggle-target'));
      if (!target) return;
      var isHidden = target.style.display === 'none';
      target.style.display = isHidden ? '' : 'none';
      btn.textContent = isHidden ? '折叠筛选' : '展开筛选';
    });
  });

  document.querySelectorAll('[data-tab-target]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var group = tab.getAttribute('data-tab-group');
      var target = tab.getAttribute('data-tab-target');

      document.querySelectorAll('[data-tab-group="' + group + '"]').forEach(function (item) {
        item.classList.remove('active');
      });
      tab.classList.add('active');

      document.querySelectorAll('[data-tab-panel="' + group + '"]').forEach(function (panel) {
        panel.style.display = panel.id === target ? '' : 'none';
      });
    });
  });
})();
