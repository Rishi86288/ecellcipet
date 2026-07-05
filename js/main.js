// ============ NAV TOGGLE ============
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ============ BACK TO TOP ============
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============ GENERIC FILTER TABS ============
// Usage: <div class="filter-tabs" data-filter-target=".event-card">...tabs with data-filter="value"...</div>
document.querySelectorAll('.filter-tabs').forEach(tabGroup => {
  const targetSelector = tabGroup.dataset.filterTarget;
  if (!targetSelector) return;
  const tabs = tabGroup.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll(targetSelector);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        const cat = item.dataset.category;
        const match = filter === 'all' || cat === filter;
        item.style.display = match ? '' : 'none';
      });
    });
  });
});

// ============ FORM SUBMIT (front-end only placeholder) ============
document.querySelectorAll('form[data-demo-form]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 1800);
    }, 900);
  });
});

// ============ ANIMATED STAT COUNTERS ============
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && counters.length) {
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const startTime = performance.now();
        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));
}

// ============ SET ACTIVE NAV LINK ============
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
})();
