(function () {
  var path = location.pathname.split('/').pop() || 'index.html';
  var inPages = location.pathname.indexOf('/pages/') > -1;
  var storageKey = 'kpay_nav_expanded_v1';

  var navTree = [
    { id: 'home', label: '首页', href: 'index.html', icon: '⌂' },
    { id: 'merchant', label: '商户管理', icon: '▦', children: [
      { id: 'company', label: '企业管理', href: 'pages/company-list.html', icon: '▤' },
      { id: 'store', label: '商铺管理', href: 'pages/store-list.html', icon: '▥' },
      { id: 'merchant-main', label: '商户审核', href: 'pages/merchant-list.html', icon: '☑' },
      { id: 'merchant-signed', label: '已签约商户', href: 'pages/merchant-signed-list.html', icon: '◧' },
      { id: 'merchant-cancel', label: '取消签约商户', href: 'pages/merchant-cancel-list.html', icon: '◩' },
      { id: 'merchant-reject', label: '拒绝签约商户', href: 'pages/merchant-reject-list.html', icon: '◫' },
      { id: 'review', label: '修改待审核', children: [
        { id: 'review-company', label: '企业资料修改待审核', href: 'pages/company-edit-review-list.html', icon: '☷' },
        { id: 'review-store', label: '商铺资料修改待审核', href: 'pages/store-edit-review-list.html', icon: '☶' },
        { id: 'review-merchant', label: '商户资料修改待审核', href: 'pages/merchant-edit-review-list.html', icon: '☵' }
      ] },
      { id: 'device-order', label: '终端设备申请/回收单审批', href: 'pages/store-device-order-list.html', icon: '⌸' },
      { id: 'aft', label: '商户进件', href: 'pages/aft-task-list.html', icon: '◎' },
      { id: 'mapping', label: '字段映射配置', href: 'pages/afp-mapping.html', icon: '◬' }
    ] },
    { id: 'contract', label: '合约管理', icon: '▣', children: [
      { id: 'contract-map', label: '字段映射配置', href: 'pages/contract-mapping.html', icon: '◭' },
      { id: 'contract-generated', label: '已生成的合约', href: 'pages/generated-contract-list.html', icon: '◮' }
    ] },
    { id: 'other', label: '其他模块', icon: '◈', children: [
      { id: 'os', label: 'O/S补件', href: 'pages/os-list.html', icon: '◍' },
      { id: 'channel', label: '通道管理', href: 'pages/channel-list.html', icon: '◌' },
      { id: 'channel-detail', label: 'AFP通道详情', href: 'pages/channel-afp-detail.html', icon: '◉' },
      { id: 'scope', label: '项目范围说明', href: 'pages/overview-scope.html', icon: '◔' }
    ] }
  ];

  var crumbMap = {
    '企业管理': 'pages/company-list.html',
    '商铺管理': 'pages/store-list.html',
    '商户审核': 'pages/merchant-list.html',
    '已签约商户': 'pages/merchant-signed-list.html',
    '取消签约商户': 'pages/merchant-cancel-list.html',
    '拒绝签约商户': 'pages/merchant-reject-list.html',
    '商户进件': 'pages/aft-task-list.html',
    '合约管理': 'pages/contract-mapping.html',
    '已生成的合约': 'pages/generated-contract-list.html',
    '修改待审核': 'pages/merchant-edit-review-list.html',
    '终端设备申请/回收单审批': 'pages/store-device-order-list.html'
  };

  var descMap = {
    'company-list.html': { text: '企业管理功能说明', href: 'pages/company-list-desc.html' },
    'company-detail.html': { text: '企业详情功能说明', href: 'pages/company-detail-desc.html' },
    'company-create.html': { text: '企业新增功能说明', href: 'pages/company-edit-desc.html' },
    'company-edit.html': { text: '企业编辑功能说明', href: 'pages/company-edit-desc.html' },
    'company-edit-review-list.html': { text: '企业待审核功能说明', href: 'pages/company-edit-review-desc.html' },
    'company-edit-review.html': { text: '企业待审核功能说明', href: 'pages/company-edit-review-desc.html' },
    'company-audit.html': { text: '企业审核功能说明', href: 'pages/company-edit-review-desc.html' },
    'store-list.html': { text: '商铺管理功能说明', href: 'pages/store-list-desc.html' },
    'store-detail.html': { text: '商铺详情功能说明', href: 'pages/store-detail-desc.html' },
    'store-create.html': { text: '商铺新增功能说明', href: 'pages/store-edit-desc.html' },
    'store-edit.html': { text: '商铺编辑功能说明', href: 'pages/store-edit-desc.html' },
    'store-edit-review-list.html': { text: '商铺待审核功能说明', href: 'pages/store-edit-review-desc.html' },
    'store-edit-review.html': { text: '商铺待审核功能说明', href: 'pages/store-edit-review-desc.html' },
    'store-audit.html': { text: '商铺审核功能说明', href: 'pages/store-edit-review-desc.html' },
    'store-device-order-list.html': { text: '终端设备申请单说明', href: 'pages/store-edit-review-desc.html' },
    'store-device-order-detail.html': { text: '终端设备申请单说明', href: 'pages/store-edit-review-desc.html' },
    'merchant-list.html': { text: '商户审核功能说明', href: 'pages/merchant-list-desc.html' },
    'merchant-create.html': { text: '商户新增功能说明', href: 'pages/merchant-edit-review-desc.html' },
    'merchant-edit.html': { text: '商户编辑功能说明', href: 'pages/merchant-edit-review-desc.html' },
    'merchant-detail.html': { text: '商户详情功能说明', href: 'pages/merchant-detail-desc.html' },
    'merchant-edit-review-list.html': { text: '商户待审核功能说明', href: 'pages/merchant-edit-review-desc.html' },
    'merchant-edit-review.html': { text: '商户资料修改待审核说明', href: 'pages/merchant-edit-review-desc.html' },
    'merchant-edit-review-audit.html': { text: '商户资料审核说明', href: 'pages/merchant-review-desc.html' },
    'merchant-audit.html': { text: '商户审核功能说明', href: 'pages/merchant-review-desc.html' },
    'merchant-signed-list.html': { text: '已签约功能说明', href: 'pages/merchant-signed-detail-desc.html' },
    'merchant-signed-detail.html': { text: '已签约功能说明', href: 'pages/merchant-signed-detail-desc.html' },
    'merchant-cancel-list.html': { text: '取消签约功能说明', href: 'pages/merchant-cancel-detail-desc.html' },
    'merchant-cancel-detail.html': { text: '取消签约功能说明', href: 'pages/merchant-cancel-detail-desc.html' },
    'merchant-reject-list.html': { text: '拒绝签约功能说明', href: 'pages/merchant-reject-detail-desc.html' },
    'merchant-reject-detail.html': { text: '拒绝签约功能说明', href: 'pages/merchant-reject-detail-desc.html' },
    'aft-task-list.html': { text: '进件列表功能说明', href: 'pages/aft-task-list-desc.html' },
    'aft-task-detail.html': { text: '进件详情功能说明', href: 'pages/aft-task-detail-desc.html' },
    'aft-snapshot.html': { text: '快照功能说明', href: 'pages/aft-snapshot-desc.html' },
    'os-list.html': { text: 'O/S列表功能说明', href: 'pages/os-list-desc.html' },
    'os-detail.html': { text: 'O/S详情功能说明', href: 'pages/os-detail-desc.html' },
    'afp-mapping.html': { text: 'AFP映射功能说明', href: 'pages/afp-mapping-desc.html' },
    'channel-list.html': { text: '通道列表功能说明', href: 'pages/channel-list-desc.html' },
    'channel-afp-detail.html': { text: 'AFP通道功能说明', href: 'pages/channel-afp-detail-desc.html' },
    'contract-mapping.html': { text: '合同映射功能说明', href: 'pages/contract-mapping-desc.html' },
    'generated-contract-list.html': { text: '已生成合约功能说明', href: 'pages/contract-sign-link-desc.html' },
    'generated-contract-detail.html': { text: '已生成合约功能说明', href: 'pages/contract-sign-link-desc.html' }
  };

  function normalize(href) { return href.replace(/^pages\//, '').replace(/^\.\.\//, ''); }
  function resolveHref(href) {
    var raw = href || '#';
    if (normalize(raw) === 'index.html') return inPages ? '../index.html' : 'index.html';
    return inPages ? raw.replace(/^pages\//, '') : raw;
  }

  function getExpandedSet() {
    try { var data = localStorage.getItem(storageKey); return new Set(data ? JSON.parse(data) : []); }
    catch (e) { return new Set(); }
  }
  function saveExpandedSet(set) { localStorage.setItem(storageKey, JSON.stringify(Array.from(set))); }

  function containsActive(item) {
    if (item.href && normalize(item.href) === path) return true;
    return !!(item.children && item.children.some(containsActive));
  }

  function renderNode(item, level, expandedSet) {
    var li = document.createElement('li');
    li.className = 'tree-item level-' + level;
    var nodeId = item.id || item.label;

    if (item.children && item.children.length) {
      li.classList.toggle('expanded', expandedSet.has(nodeId) || containsActive(item));
      var btn = document.createElement('button');
      btn.className = 'nav-toggle level-' + level;
      btn.type = 'button';
      btn.innerHTML = '<span class="nav-icon">' + (item.icon || '•') + '</span><span class="nav-text">' + item.label + '</span><span class="chevron">▾</span>';
      btn.addEventListener('click', function () {
        li.classList.toggle('expanded');
        li.classList.contains('expanded') ? expandedSet.add(nodeId) : expandedSet.delete(nodeId);
        saveExpandedSet(expandedSet);
      });
      li.appendChild(btn);
      var ul = document.createElement('ul'); ul.className = 'tree-sub';
      item.children.forEach(function (child) { ul.appendChild(renderNode(child, level + 1, expandedSet)); });
      li.appendChild(ul);
    } else {
      var a = document.createElement('a');
      a.href = resolveHref(item.href);
      a.className = 'nav-link level-' + level;
      a.innerHTML = '<span class="nav-icon">' + (item.icon || '◦') + '</span><span class="nav-text">' + item.label + '</span>';
      if (normalize(item.href) === path) a.classList.add('active');
      li.appendChild(a);
    }
    return li;
  }

  function renderSidebar() {
    var sidebar = document.querySelector('.sidebar'); if (!sidebar) return;
    sidebar.innerHTML = '';
    var expandedSet = getExpandedSet();
    var nav = document.createElement('ul'); nav.className = 'nav-tree';
    navTree.forEach(function (n) { nav.appendChild(renderNode(n, 1, expandedSet)); });
    sidebar.appendChild(nav);
  }

  function injectTopbar() {
    if (document.querySelector('.global-topbar')) return;
    var layout = document.querySelector('.layout'); if (!layout) return;
    var top = document.createElement('div');
    top.className = 'global-topbar';
    top.innerHTML = '<div class="top-left"><a class="brand top-brand" href="' + resolveHref('index.html') + '"><span class="brand-badge">K</span>KPay CRM</a></div><div class="top-right"><div class="global-item"><span class="global-label">地区：</span><select><option>香港</option><option>新加坡</option><option>日本</option></select></div><div class="global-item"><span class="global-label">语言：</span><select><option>中文</option><option>English</option></select></div><div class="user-chip"><span class="avatar-dot">A</span><span class="user-name">admin@kpay</span></div><button class="icon-btn" title="设置">⚙</button></div>';
    layout.parentNode.insertBefore(top, layout);
  }

  function injectReturnButton() {
    if (!/detail|review\.html|snapshot\.html/.test(path)) return;
    var left = document.querySelector('.page-head-left');
    if (!left || left.querySelector('[data-back-btn]')) return;
    var btn = document.createElement('button');
    btn.className = 'btn back-btn';
    btn.setAttribute('data-back-btn', '1');
    btn.textContent = '返回';
    btn.addEventListener('click', function () { history.back(); });
    left.insertBefore(btn, left.firstChild);
  }

  function injectClickableBreadcrumb() {
    document.querySelectorAll('.breadcrumb').forEach(function (bc) {
      if (bc.querySelector('a')) return;
      var parts = bc.textContent.split('/').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!parts.length) return;
      var html = [];
      parts.forEach(function (p, i) {
        var href = crumbMap[p];
        if (href && i < parts.length - 1) html.push('<a href="' + resolveHref(href) + '">' + p + '</a>');
        else html.push('<span>' + p + '</span>');
      });
      bc.innerHTML = html.join(' / ');
    });
  }

  function injectDescButton() {
    var cfg = descMap[path]; if (!cfg) return;
    var actions = document.querySelector('.page-actions');
    if (!actions) { actions = document.createElement('div'); actions.className = 'page-actions'; var head = document.querySelector('.page-head'); if (!head) return; head.appendChild(actions); }
    if (actions.querySelector('[data-desc-btn]')) return;
    var a = document.createElement('a'); a.className = 'btn'; a.setAttribute('data-desc-btn', '1'); a.textContent = cfg.text; a.href = resolveHref(cfg.href);
    actions.insertBefore(a, actions.firstChild);
  }

  function setupTabs() {
    document.querySelectorAll('[data-tab-target]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var group = tab.getAttribute('data-tab-group'); var target = tab.getAttribute('data-tab-target');
        document.querySelectorAll('[data-tab-group="' + group + '"]').forEach(function (i) { i.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('[data-tab-panel="' + group + '"]').forEach(function (p) { p.style.display = p.id === target ? '' : 'none'; });
      });
    });
  }

  function normalizeToolbarActions() {
    document.querySelectorAll('.toolbar').forEach(function (toolbar) {
      var existingWrap = toolbar.querySelector('.toolbar-actions');
      var actionBtns = Array.from(toolbar.querySelectorAll('button.btn')).filter(function (b) {
        return /查询|重置|收起筛选|展开筛选/.test(b.textContent.trim());
      });
      if (!actionBtns.length) return;

      if (!existingWrap) {
        existingWrap = document.createElement('div');
        existingWrap.className = 'toolbar-actions';
        toolbar.appendChild(existingWrap);
      }

      var queryBtn = actionBtns.find(function (b) { return b.textContent.trim() === '查询'; });
      var resetBtn = actionBtns.find(function (b) { return b.textContent.trim() === '重置'; });
      var toggleBtn = actionBtns.find(function (b) { return /收起筛选|展开筛选/.test(b.textContent.trim()); });
      [queryBtn, resetBtn, toggleBtn].forEach(function (btn) {
        if (btn) existingWrap.appendChild(btn);
      });
    });
  }

  function setupAuditModal() {
    var modal = document.getElementById('audit-modal');
    if (!modal) return;
    document.querySelectorAll('[data-open-audit-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () { modal.style.display = 'flex'; });
    });
    modal.querySelectorAll('[data-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () { modal.style.display = 'none'; });
    });
  }

  function showToast(text) {
    var t = document.createElement('div'); t.className = 'demo-toast'; t.textContent = text; document.body.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 10); setTimeout(function () { t.remove(); }, 1800);
  }

  function setupCollapsibleToolbars() {
    var resizeTimer = null;
    function getFilterControls(toolbar) {
      return Array.from(toolbar.children).filter(function (el) {
        if (el.classList.contains('toolbar-actions')) return false;
        if (el.matches('button.btn') && /查询|重置|收起筛选|展开筛选/.test(el.textContent.trim())) return false;
        return true;
      });
    }

    document.querySelectorAll('.toolbar[data-collapsible], .toolbar[data-collapse-mode="rows"]').forEach(function (toolbar) {
      var mode = toolbar.getAttribute('data-collapse-mode') || 'count';
      var toggle = toolbar.querySelector('[data-filter-toggle]');
      if (!toggle) return;

      function applyCollapsedState() {
        var controls = getFilterControls(toolbar);
        controls.forEach(function (el) { el.classList.remove('is-extra-filter'); });
        if (!toolbar.classList.contains('filters-collapsed')) return;

        if (mode === 'rows') {
          var rowTops = [];
          controls.forEach(function (el) {
            if (!rowTops.length || rowTops[rowTops.length - 1] !== el.offsetTop) rowTops.push(el.offsetTop);
          });
          var secondRowTop = rowTops.length > 1 ? rowTops[1] : null;
          controls.forEach(function (el) {
            if (secondRowTop !== null && el.offsetTop > secondRowTop) el.classList.add('is-extra-filter');
          });
        } else {
          var limit = parseInt(toolbar.getAttribute('data-collapsible') || '6', 10);
          controls.forEach(function (el, idx) { if (idx >= limit) el.classList.add('is-extra-filter'); });
        }
      }

      function setCollapsed(collapsed) {
        toolbar.classList.toggle('filters-collapsed', collapsed);
        toggle.textContent = collapsed ? '展开筛选' : '收起筛选';
        applyCollapsedState();
      }

      setCollapsed(true);
      toggle.addEventListener('click', function () {
        setCollapsed(!toolbar.classList.contains('filters-collapsed'));
      });

      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(applyCollapsedState, 80);
      });
    });
  }


  function setupImagePreview() {
    var previewModal = document.getElementById('image-preview-modal');
    if (!previewModal) return;
    var target = previewModal.querySelector('#image-preview-target');
    var openers = document.querySelectorAll('[data-preview-src]');
    openers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-preview-src') || '';
        var alt = btn.getAttribute('data-preview-alt') || '图片预览';
        if (target) { target.src = src; target.alt = alt; }
        previewModal.style.display = 'flex';
      });
    });
    previewModal.querySelectorAll('[data-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () { previewModal.style.display = 'none'; });
    });
  }

  function setupContractActions() {
    var modal = document.getElementById('contract-link-modal');
    if (modal) {
      modal.querySelectorAll('[data-close-modal]').forEach(function (btn) { btn.addEventListener('click', function () { modal.style.display = 'none'; }); });
      var copyBtn = modal.querySelector('[data-copy-link]');
      if (copyBtn) copyBtn.addEventListener('click', function () { var input = modal.querySelector('input'); if (input) { input.select(); document.execCommand('copy'); } showToast('签署链接已复制'); });
    }
    document.querySelectorAll('[data-open-link-modal]').forEach(function (btn) { btn.addEventListener('click', function () { if (modal) modal.style.display = 'flex'; }); });
    document.querySelectorAll('[data-resend-contract]').forEach(function (btn) { btn.addEventListener('click', function () { showToast('发送成功，合同邮件已再次发送'); }); });

    var channelModal = document.getElementById('channel-status-modal');
    document.querySelectorAll('[data-open-channel-status]').forEach(function (btn) {
      btn.addEventListener('click', function () { if (channelModal) channelModal.style.display = 'flex'; });
    });
    if (channelModal) channelModal.querySelectorAll('[data-close-modal]').forEach(function (b) { b.addEventListener('click', function () { channelModal.style.display = 'none'; }); });

    var midModal = document.getElementById('store-mid-modal');
    document.querySelectorAll('[data-open-store-mid]').forEach(function (btn) { btn.addEventListener('click', function () { if (midModal) midModal.style.display = 'flex'; }); });
    if (midModal) midModal.querySelectorAll('[data-close-modal]').forEach(function (b) { b.addEventListener('click', function () { midModal.style.display = 'none'; }); });

    var profileModal = document.getElementById('channel-profile-modal');
    document.querySelectorAll('[data-open-channel-profile], [data-open-device-panel]').forEach(function (btn) {
      btn.addEventListener('click', function () { if (profileModal) profileModal.style.display = 'flex'; });
    });
    if (profileModal) profileModal.querySelectorAll('[data-close-modal]').forEach(function (b) { b.addEventListener('click', function () { profileModal.style.display = 'none'; }); });
  }

  injectTopbar();
  renderSidebar();
  injectReturnButton();
  injectClickableBreadcrumb();
  injectDescButton();
  setupTabs();
  normalizeToolbarActions();
  setupCollapsibleToolbars();
  setupContractActions();
  setupImagePreview();
  setupAuditModal();
})();
