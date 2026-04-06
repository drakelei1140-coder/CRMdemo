(function () {
  var path = location.pathname.split('/').pop() || 'index.html';
  var inPages = location.pathname.indexOf('/pages/') > -1;

  var navTree = [
    { label: '首页', href: 'index.html', icon: '🏠' },
    {
      label: '商户管理',
      icon: '🧩',
      children: [
        { label: '企业管理', href: 'pages/company-list.html' },
        { label: '商铺管理', href: 'pages/store-list.html' },
        { label: '商户管理', href: 'pages/merchant-list.html' },
        { label: '已签约商户', href: 'pages/merchant-signed-list.html' },
        { label: '取消签约商户', href: 'pages/merchant-cancel-list.html' },
        { label: '拒绝签约商户', href: 'pages/merchant-reject-list.html' },
        {
          label: '修改待审核',
          children: [
            { label: '企业资料修改待审核', href: 'pages/company-edit-review-list.html' },
            { label: '商铺资料修改待审核', href: 'pages/store-edit-review-list.html' },
            { label: '商户资料修改待审核', href: 'pages/merchant-edit-review-list.html' }
          ]
        },
        { label: '商户进件', href: 'pages/aft-task-list.html' },
        { label: '字段映射配置', href: 'pages/afp-mapping.html' }
      ]
    },
    {
      label: '合约管理',
      icon: '📄',
      children: [
        { label: '字段映射配置', href: 'pages/contract-mapping.html' }
      ]
    },
    {
      label: '其他模块',
      icon: '⚙️',
      children: [
        { label: 'O/S补件', href: 'pages/os-list.html' },
        { label: '通道管理', href: 'pages/channel-list.html' },
        { label: 'AFP通道详情', href: 'pages/channel-afp-detail.html' },
        { label: '项目范围说明', href: 'pages/overview-scope.html' }
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
    'contract-mapping.html': { text: '合同映射功能说明', href: 'pages/contract-mapping-desc.html' }
  };

  function normalize(href) {
    return href.replace(/^pages\//, '').replace(/^\.\.\//, '');
  }

  function containsActive(item) {
    if (item.href && normalize(item.href) === path) return true;
    if (!item.children) return false;
    return item.children.some(containsActive);
  }

  function renderNode(item, level) {
    var li = document.createElement('li');
    li.className = 'tree-item level-' + level;

    if (item.children && item.children.length) {
      var expanded = containsActive(item);
      li.classList.toggle('expanded', expanded);
      var btn = document.createElement('button');
      btn.className = 'nav-toggle level-' + level;
      btn.type = 'button';
      btn.innerHTML = '<span class="nav-icon">' + (item.icon || '•') + '</span><span class="nav-text">' + item.label + '</span><span class="chevron">▾</span>';
      btn.addEventListener('click', function () { li.classList.toggle('expanded'); });
      li.appendChild(btn);

      var ul = document.createElement('ul');
      ul.className = 'tree-sub';
      item.children.forEach(function (child) { ul.appendChild(renderNode(child, level + 1)); });
      li.appendChild(ul);
    } else {
      var a = document.createElement('a');
      var href = item.href || '#';
      a.href = inPages ? href.replace(/^pages\//, '') : href;
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

    var nav = document.createElement('ul');
    nav.className = 'nav-tree';
    navTree.forEach(function (node) { nav.appendChild(renderNode(node, 1)); });
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
    a.href = inPages ? cfg.href.replace(/^pages\//, '') : cfg.href;
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

  renderSidebar();
  injectDescButton();
  setupTabs();
})();
