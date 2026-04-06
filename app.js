(function () {
  var path = location.pathname.split('/').pop() || 'index.html';
  var inPages = location.pathname.indexOf('/pages/') > -1;
  var storageKey = 'kpay_nav_expanded_v1';

  var navTree = [
    { id: 'home', label: '首页', href: 'index.html', icon: '🏠' },
    {
      id: 'merchant',
      label: '商户管理',
      icon: '🧩',
      children: [
        { id: 'company', label: '企业管理', href: 'pages/company-list.html' },
        { id: 'store', label: '商铺管理', href: 'pages/store-list.html' },
        { id: 'merchant-main', label: '商户管理', href: 'pages/merchant-list.html' },
        { id: 'merchant-signed', label: '已签约商户', href: 'pages/merchant-signed-list.html' },
        { id: 'merchant-cancel', label: '取消签约商户', href: 'pages/merchant-cancel-list.html' },
        { id: 'merchant-reject', label: '拒绝签约商户', href: 'pages/merchant-reject-list.html' },
        {
          id: 'review',
          label: '修改待审核',
          children: [
            { id: 'review-company', label: '企业资料修改待审核', href: 'pages/company-edit-review-list.html' },
            { id: 'review-store', label: '商铺资料修改待审核', href: 'pages/store-edit-review-list.html' },
            { id: 'review-merchant', label: '商户资料修改待审核', href: 'pages/merchant-edit-review-list.html' }
          ]
        },
        { id: 'aft', label: '商户进件', href: 'pages/aft-task-list.html' },
        { id: 'mapping', label: '字段映射配置', href: 'pages/afp-mapping.html' }
      ]
    },
    {
      id: 'contract',
      label: '合约管理',
      icon: '📄',
      children: [
        { id: 'contract-map', label: '字段映射配置', href: 'pages/contract-mapping.html' },
        { id: 'contract-generated', label: '已生成的合约', href: 'pages/generated-contract-list.html' }
      ]
    },
    {
      id: 'other',
      label: '其他模块',
      icon: '⚙️',
      children: [
        { id: 'os', label: 'O/S补件', href: 'pages/os-list.html' },
        { id: 'channel', label: '通道管理', href: 'pages/channel-list.html' },
        { id: 'channel-detail', label: 'AFP通道详情', href: 'pages/channel-afp-detail.html' },
        { id: 'scope', label: '项目范围说明', href: 'pages/overview-scope.html' }
      ]
    }
  ];

  var descMap = {
    'company-list.html': { text: '企业管理功能说明', href: 'pages/company-list-desc.html' },
    'company-detail.html': { text: '企业详情功能说明', href: 'pages/company-detail-desc.html' },
    'company-edit.html': { text: '企业新增编辑功能说明', href: 'pages/company-edit-desc.html' },
    'company-edit-review-list.html': { text: '企业待审核功能说明', href: 'pages/company-edit-review-desc.html' },
    'company-edit-review.html': { text: '企业待审核功能说明', href: 'pages/company-edit-review-desc.html' },
    'store-list.html': { text: '商铺管理功能说明', href: 'pages/store-list-desc.html' },
    'store-detail.html': { text: '商铺详情功能说明', href: 'pages/store-detail-desc.html' },
    'store-edit.html': { text: '商铺新增编辑功能说明', href: 'pages/store-edit-desc.html' },
    'store-edit-review-list.html': { text: '商铺待审核功能说明', href: 'pages/store-edit-review-desc.html' },
    'store-edit-review.html': { text: '商铺待审核功能说明', href: 'pages/store-edit-review-desc.html' },
    'merchant-list.html': { text: '商户管理功能说明', href: 'pages/merchant-list-desc.html' },
    'merchant-detail.html': { text: '商户详情功能说明', href: 'pages/merchant-detail-desc.html' },
    'merchant-edit-review-list.html': { text: '商户待审核功能说明', href: 'pages/merchant-edit-review-desc.html' },
    'merchant-edit-review.html': { text: '商户待审核功能说明', href: 'pages/merchant-edit-review-desc.html' },
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

  function normalize(href) {
    return href.replace(/^pages\//, '').replace(/^\.\.\//, '');
  }

  function getExpandedSet() {
    try {
      var data = localStorage.getItem(storageKey);
      if (!data) return new Set();
      return new Set(JSON.parse(data));
    } catch (e) {
      return new Set();
    }
  }

  function saveExpandedSet(set) {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(set)));
  }

  function containsActive(item) {
    if (item.href && normalize(item.href) === path) return true;
    if (!item.children) return false;
    return item.children.some(containsActive);
  }

  function resolveHref(href) {
    var raw = href || '#';
    if (normalize(raw) === 'index.html') {
      return inPages ? '../index.html' : 'index.html';
    }
    return inPages ? raw.replace(/^pages\//, '') : raw;
  }

  function renderNode(item, level, expandedSet) {
    var li = document.createElement('li');
    li.className = 'tree-item level-' + level;
    li.dataset.nodeId = item.id || item.label;

    if (item.children && item.children.length) {
      var nodeId = item.id || item.label;
      var expanded = expandedSet.has(nodeId) || containsActive(item);
      li.classList.toggle('expanded', expanded);

      var btn = document.createElement('button');
      btn.className = 'nav-toggle level-' + level;
      btn.type = 'button';
      btn.innerHTML = '<span class="nav-icon">' + (item.icon || '•') + '</span><span class="nav-text">' + item.label + '</span><span class="chevron">▾</span>';
      btn.addEventListener('click', function () {
        li.classList.toggle('expanded');
        if (li.classList.contains('expanded')) {
          expandedSet.add(nodeId);
        } else {
          expandedSet.delete(nodeId);
        }
        saveExpandedSet(expandedSet);
      });
      li.appendChild(btn);

      var ul = document.createElement('ul');
      ul.className = 'tree-sub';
      item.children.forEach(function (child) { ul.appendChild(renderNode(child, level + 1, expandedSet)); });
      li.appendChild(ul);
    } else {
      var a = document.createElement('a');
      var href = item.href || '#';
      a.href = resolveHref(href);
      a.className = 'nav-link level-' + level;
      a.innerHTML = '<span class="nav-text">' + item.label + '</span>';
      if (normalize(href) === path) a.classList.add('active');
      li.appendChild(a);
    }
    return li;
  }

  function renderSidebar() {
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';
    var brand = document.createElement('div');
    brand.className = 'brand';
    brand.innerHTML = '<span class="brand-badge">K</span>KPay CRM';
    sidebar.appendChild(brand);

    var expandedSet = getExpandedSet();
    var nav = document.createElement('ul');
    nav.className = 'nav-tree';
    navTree.forEach(function (node) { nav.appendChild(renderNode(node, 1, expandedSet)); });
    sidebar.appendChild(nav);
  }

  function injectDescButton() {
    var cfg = descMap[path];
    if (!cfg) return;
    var actions = document.querySelector('.page-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'page-actions';
      var head = document.querySelector('.page-head');
      if (!head) return;
      head.appendChild(actions);
    }
    if (actions.querySelector('[data-desc-btn]')) return;

    var a = document.createElement('a');
    a.className = 'btn';
    a.setAttribute('data-desc-btn', '1');
    a.textContent = cfg.text;
    a.href = resolveHref(cfg.href);
    actions.insertBefore(a, actions.firstChild);
  }

  function setupTabs() {
    document.querySelectorAll('[data-tab-target]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var group = tab.getAttribute('data-tab-group');
        var target = tab.getAttribute('data-tab-target');
        document.querySelectorAll('[data-tab-group="' + group + '"]').forEach(function (item) { item.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('[data-tab-panel="' + group + '"]').forEach(function (panel) { panel.style.display = panel.id === target ? '' : 'none'; });
      });
    });
  }

  function normalizeToolbarActions() {
    document.querySelectorAll('.toolbar').forEach(function (toolbar) {
      if (toolbar.querySelector('.toolbar-actions')) return;
      var btns = Array.from(toolbar.querySelectorAll('button.btn'));
      if (!btns.length) return;
      var actionBtns = btns.filter(function (b) { return /查询|重置/.test(b.textContent.trim()); });
      if (actionBtns.length >= 1) {
        var wrap = document.createElement('div');
        wrap.className = 'toolbar-actions';
        actionBtns.forEach(function (b) { wrap.appendChild(b); });
        toolbar.appendChild(wrap);
      }
    });
  }

  function showToast(text) {
    var toast = document.createElement('div');
    toast.className = 'demo-toast';
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('show'); }, 10);
    setTimeout(function () { toast.remove(); }, 1800);
  }

  function setupContractActions() {
    var modal = document.getElementById('contract-link-modal');
    if (modal) {
      modal.querySelectorAll('[data-close-modal]').forEach(function (btn) {
        btn.addEventListener('click', function () { modal.style.display = 'none'; });
      });
      var copyBtn = modal.querySelector('[data-copy-link]');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          var input = modal.querySelector('input');
          if (input) {
            input.select();
            document.execCommand('copy');
          }
          showToast('签署链接已复制');
        });
      }
    }

    document.querySelectorAll('[data-open-link-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (modal) modal.style.display = 'flex';
      });
    });

    document.querySelectorAll('[data-resend-contract]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showToast('发送成功，合同邮件已再次发送');
      });
    });
  }

  renderSidebar();
  injectDescButton();
  setupTabs();
  normalizeToolbarActions();
  setupContractActions();
})();
