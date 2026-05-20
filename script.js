/* ============================================================
 * OenoAI — script.js
 * Behaviour layer.
 *   - Language switch (reads window.CONTENT from content.js)
 *   - SPA-style page transitions (hash routing)
 *   - Scroll-driven header state
 *   - Mobile menu
 *   - Reveal-on-scroll animations
 *   - Contact form submit (visual stub)
 * ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // Helpers
  // ============================================================

  /**
   * Resolve a dot/bracket path against an object.
   *   get(obj, 'a.b.c')      → obj.a.b.c
   *   get(obj, 'a.b[0]')     → obj.a.b[0]
   *   get(obj, 'a.b.c[1]')   → obj.a.b.c[1]
   */
  function get(obj, path) {
    if (obj == null || !path) return undefined;
    return path
      .split(/[.\[\]]/)
      .filter(Boolean)
      .reduce(function (o, k) { return o != null ? o[k] : undefined; }, obj);
  }

  /** Strip a trailing decorative arrow (" →" or "→") used in CTA strings. */
  function stripArrow(s) {
    return typeof s === 'string' ? s.replace(/\s*→\s*$/, '') : s;
  }

  /**
   * Format a string for the requested mode.
   *   default       → textContent (safe, no HTML)
   *   "multiline"   → \n becomes <br>
   *   "paragraphs"  → \n\n becomes paragraph break, \n becomes <br>
   *   "html"        → raw HTML
   */
  function renderTo(el, value, format) {
    if (value == null) { el.textContent = ''; return; }

    // Arrays (e.g. ['Label', 'Value']) — emitted as joined text by default
    if (Array.isArray(value)) {
      el.textContent = value.join(' ');
      return;
    }

    var str = String(value);

    if (format === 'html') {
      el.innerHTML = str;
      return;
    }

    // CTA buttons store strings like "理念を読む →"; the visual arrow
    // is rendered by a sibling .arrow span, so strip the trailing glyph.
    if (el.closest && el.closest('.btn') && el.parentElement.querySelector('.arrow')) {
      str = stripArrow(str);
    }

    if (format === 'multiline' || (!format && /\n/.test(str) && !/\n\n/.test(str))) {
      el.innerHTML = escapeHtml(str).replace(/\n/g, '<br>');
      return;
    }

    if (format === 'paragraphs' || /\n\n/.test(str)) {
      var paragraphs = str.split(/\n\n+/);
      el.innerHTML = paragraphs
        .map(function (p) { return '<p>' + escapeHtml(p).replace(/\n/g, '<br>') + '</p>'; })
        .join('');
      return;
    }

    el.textContent = str;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ============================================================
  // Language switching
  // ============================================================

  var STORAGE_KEY = 'oa_lang';
  var DEFAULT_LANG = 'ja';
  var root = document.documentElement;

  function getLang() {
    return root.getAttribute('data-lang') || DEFAULT_LANG;
  }

  function applyContent(lang) {
    var dict = (window.CONTENT && window.CONTENT[lang]) || {};

    // Single-value bindings
    document.querySelectorAll('[data-content-key]').forEach(function (el) {
      var key = el.getAttribute('data-content-key');
      var fmt = el.getAttribute('data-content-format');
      var val = get(dict, key);
      renderTo(el, val, fmt);
    });

    // List bindings (select options, ul li, etc.)
    document.querySelectorAll('[data-content-list-key]').forEach(function (host) {
      var key = host.getAttribute('data-content-list-key');
      var tag = host.getAttribute('data-content-list-tag') || 'li';
      var arr = get(dict, key);
      if (!Array.isArray(arr)) return;

      var preserved = Array.prototype.filter.call(host.children, function (c) {
        return c.hasAttribute('data-content-list-preserve');
      });

      host.innerHTML = '';
      preserved.forEach(function (p) { host.appendChild(p); });

      arr.forEach(function (item) {
        var node = document.createElement(tag);
        if (tag === 'option') {
          node.value = item;
          node.textContent = item;
        } else {
          node.textContent = item;
        }
        host.appendChild(node);
      });
    });

    // Update the placeholder option of any contact-category select
    var catPlaceholder = get(dict, 'ext.contact_category_placeholder');
    document.querySelectorAll('select[data-placeholder-key]').forEach(function (sel) {
      var first = sel.querySelector('option[value=""]');
      if (first && catPlaceholder) first.textContent = catPlaceholder;
    });
  }

  function setLang(lang) {
    if (lang !== 'ja' && lang !== 'en') lang = DEFAULT_LANG;
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'ja' ? 'ja' : 'en');

    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });

    applyContent(lang);
    document.title = (lang === 'ja')
      ? 'OenoAI — 醸造家の知と想いを、然るべき人へ。'
      : 'OenoAI — The Oenologist\'s knowledge and passion, to those who seek it.';

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  // ============================================================
  // SPA routing (hash-based, fade transitions)
  // ============================================================

  var ROUTES = ['top', 'philosophy', 'products', 'contact', 'company'];
  var pages = {};
  ROUTES.forEach(function (r) { pages[r] = document.getElementById('page-' + r); });

  function navigate(route, opts) {
    opts = opts || {};
    if (!pages[route]) route = 'top';

    var current = document.querySelector('.page.active');
    if (current && current.id === 'page-' + route && !opts.force) return;

    document.querySelectorAll('nav.primary a.nav-link').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-route') === route);
    });

    function commit() {
      var next = pages[route];
      if (current) current.classList.remove('active');
      next.classList.add('active');
      // Force reflow so the opacity transition kicks in
      next.style.opacity = '0';
      void next.offsetWidth;
      next.style.opacity = '1';
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      observeReveals();
      updateHeaderHero();
    }

    if (current && !opts.force) {
      current.style.opacity = '0';
      setTimeout(commit, 350);
    } else {
      commit();
    }

    if (location.hash !== '#' + route) {
      history.replaceState(null, '', '#' + route);
    }
    document.body.classList.remove('menu-open');
  }

  // ============================================================
  // Header scroll / hero state
  // ============================================================

  var header = document.getElementById('siteHeader');

  function updateHeaderHero() {
    var topActive = pages.top && pages.top.classList.contains('active');
    header.classList.toggle('on-hero', topActive && window.scrollY < window.innerHeight - 80);
  }

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 30);
    updateHeaderHero();
  }

  // ============================================================
  // Reveal-on-scroll
  // ============================================================

  var io = null;

  function observeReveals() {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (Math.min(i, 4) * 80) + 'ms';
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.page.active .reveal, .page.active .reveal-line').forEach(function (el) {
      io.observe(el);
    });
  }

  // ============================================================
  // Boot
  // ============================================================

  function init() {
    // Lang toggle buttons
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
    });

    // Route links
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-route]');
      if (!a) return;
      e.preventDefault();
      navigate(a.getAttribute('data-route'));
    });

    window.addEventListener('hashchange', function () {
      var r = (location.hash || '#top').slice(1);
      navigate(r);
    });

    // Scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    var menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        document.body.classList.toggle('menu-open');
      });
    }

    // Contact form (visual stub)
    var form = document.querySelector('form.contact');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.submit');
        if (!btn) return;
        var lang = getLang();
        var sent = lang === 'ja' ? '送信しました' : 'Sent. Thank you.';
        btn.innerHTML = '<span>' + sent + '</span>';
        btn.classList.add('sent', 'solid');
      });
    }

    // Image promotion + fallback:
    //   <img data-src="...">  →  src is set at runtime so a 404 doesn't flag
    //   the source file. On successful load the placeholder is hidden;
    //   on error the <img> is removed and the CSS placeholder remains.
    document.querySelectorAll('img.bg-image').forEach(function (img) {
      img.addEventListener('load', function () {
        var bg = img.closest('.hero-bg');
        if (bg) bg.classList.add('has-image');
      });
      img.addEventListener('error', function () { img.remove(); });
      var src = img.getAttribute('data-src');
      if (src && !img.getAttribute('src')) img.setAttribute('src', src);
    });

    // Initial language
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    setLang(saved || DEFAULT_LANG);

    // Initial route
    var initial = (location.hash || '#top').slice(1);
    navigate(initial, { force: true });

    // Initial reveals
    setTimeout(observeReveals, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
