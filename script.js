/* ═══════════════════════════════════════════════
   NEXUS DIGITAL — script.js
   Premium Agency Website Scripts
═══════════════════════════════════════════════ */

/* ─── MOBILE NAV ──────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });
}

/* ─── ACTIVE NAV ──────────────────────────────── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (
      (page === 'index.html' || page === '') && (href === 'index.html' || href === '#home')
      || page === 'blog.html' && href === 'blog.html'
      || page === 'careers.html' && href === 'careers.html'
    ) {
      a.classList.add('active');
    }
  });
}

/* ─── SMOOTH SCROLL ───────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─── COUNT UP ────────────────────────────────── */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = 'true';
      const target = parseInt(entry.target.dataset.count);
      const suffix = entry.target.dataset.suffix || '';
      let start = 0;
      const steps = 60;
      const inc = target / steps;
      const el = entry.target;
      const t = setInterval(() => {
        start += inc;
        if (start >= target) {
          el.textContent = target + suffix;
          clearInterval(t);
        } else {
          el.textContent = Math.round(start) + suffix;
        }
      }, 20);
    });
  }, { threshold: 0.3 });
  counters.forEach(c => obs.observe(c));
}

/* ─── FILTER TABS ─────────────────────────────── */
function initFilterTabs(filterClass, itemClass, dataAttr) {
  const buttons = document.querySelectorAll('.' + filterClass);
  const items = document.querySelectorAll('.' + itemClass);
  if (!buttons.length || !items.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const val = item.getAttribute('data-' + dataAttr);
        if (filter === 'All' || val === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ─── MODAL ───────────────────────────────────── */
function initModals() {
  // Apply / Article modals
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modalTarget;
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('open');
    });
  });
  document.querySelectorAll('[data-modal-id]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modalId;
      const modal = document.getElementById(modalId);
      if (modal) {
        // Populate modal content if data is available
        const title = trigger.dataset.title;
        const dept = trigger.dataset.dept;
        if (title) {
          const t = modal.querySelector('.modal-job-title');
          if (t) t.textContent = title;
        }
        modal.classList.add('open');
      }
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('open');
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
}

/* ─── JOB APPLY MODAL ─────────────────────────── */
function initJobApply() {
  document.querySelectorAll('.job-apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobTitle = btn.closest('.job-card').querySelector('.job-title').textContent;
      const modal = document.getElementById('apply-modal');
      if (modal) {
        const titleEl = modal.querySelector('.modal-job-title');
        if (titleEl) titleEl.textContent = jobTitle;
        modal.classList.add('open');
        // Reset form
        modal.querySelector('form').reset();
        modal.querySelector('.form-success').style.display = 'none';
        modal.querySelector('form').style.display = 'grid';
      }
    });
  });
}

/* ─── CONTACT FORM ────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('contact-success');
      if (success) success.style.display = 'block';
    }, 1800);
  });
}

/* ─── APPLY FORM ──────────────────────────────── */
function initApplyForm() {
  const form = document.getElementById('apply-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    const success = document.getElementById('apply-success');
    if (success) success.style.display = 'block';
    setTimeout(() => {
      document.getElementById('apply-modal').classList.remove('open');
      form.reset();
      success.style.display = 'none';
      form.style.display = 'grid';
    }, 4000);
  });
}

/* ─── ARTICLE CARDS ───────────────────────────── */
function initArticleCards() {
  document.querySelectorAll('[data-article-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const modal = document.getElementById('article-modal');
      if (!modal) return;
      modal.querySelector('.modal-article-cat').textContent = card.dataset.cat || '';
      modal.querySelector('.modal-article-readtime').textContent = card.dataset.readtime || '';
      modal.querySelector('.modal-article-title').textContent = card.dataset.title || '';
      modal.querySelector('.modal-article-author-initial').textContent = (card.dataset.author || ' ').charAt(0);
      modal.querySelector('.modal-article-author-name').textContent = card.dataset.author || '';
      modal.querySelector('.modal-article-author-meta').textContent = (card.dataset.role || '') + ' · ' + (card.dataset.date || '');
      modal.querySelector('.modal-article-excerpt').textContent = card.dataset.excerpt || '';
      const bodyEl = modal.querySelector('.modal-article-body');
      const body = card.dataset.body || '';
      if (body) {
        bodyEl.innerHTML = body.split('\\n\\n').map(p => `<p class="modal-body-para">${p}</p>`).join('');
        bodyEl.style.display = '';
      } else {
        bodyEl.innerHTML = '<p class="modal-body-para">Full article coming soon...</p>';
        bodyEl.style.display = '';
      }
      const tagsEl = modal.querySelector('.modal-article-tags');
      const tags = (card.dataset.tags || '').split(',').filter(Boolean);
      tagsEl.innerHTML = tags.map(t => `<span class="modal-tag">${t.trim()}</span>`).join('');
      modal.classList.add('open');
    });
  });
}

/* ─── HOVER EFFECTS ───────────────────────────── */
function initHoverEffects() {
  // Cards already use CSS, this is for JS-dependent enhancements
}

/* ─── INIT ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  setActiveNav();
  initSmoothScroll();
  initCountUp();
  initFilterTabs('dept-filter-btn', 'job-card', 'dept');
  initFilterTabs('cat-filter-btn', 'article-card', 'cat');
  initFilterTabs('cat-filter-btn', 'featured-card', 'cat');
  initJobApply();
  initContactForm();
  initApplyForm();
  initArticleCards();
  initHoverEffects();
});
