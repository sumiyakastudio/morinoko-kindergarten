/* =========================================================================
   もりのこ幼稚園 Morinoko Kindergarten — 共通スクリプト
   軽量・依存なし。iOS含む全デバイスで安定動作するAPIのみ使用。
   ========================================================================= */
(function () {
  'use strict';

  /* ---- ヘッダー: スクロールで不透明化（透過ヒーロー解除） ---- */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- モバイルナビ開閉 ---- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var navClose = document.getElementById('mobileNavClose');
  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }
  if (hamburger) hamburger.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---- スクロールフェード（IntersectionObserver） ---- */
  var faders = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && faders.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- フローティングCTA / トップへ戻る 表示制御 ---- */
  var floatCta = document.getElementById('floatCta');
  if (floatCta) {
    var toggleFloat = function () {
      if (window.scrollY > 600) floatCta.classList.add('show');
      else floatCta.classList.remove('show');
    };
    toggleFloat();
    window.addEventListener('scroll', toggleFloat, { passive: true });
  }
  var floatTop = document.getElementById('floatTop');
  if (floatTop) {
    floatTop.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---- FAQ アコーディオン ---- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var ans = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0';
    });
  });
  // ウィンドウリサイズ時に開いているFAQの高さを再計算
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-item.open .faq-a').forEach(function (ans) {
      ans.style.maxHeight = ans.scrollHeight + 'px';
    });
  });

  /* ---- 疑似フォーム送信（実送信なし・ハニーポット） ---- */
  var form = document.getElementById('demoForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // ハニーポット（ボット除外）
      var hp = form.querySelector('input[name="company-extra"]');
      if (hp && hp.value !== '') return;
      var success = document.getElementById('formSuccess');
      form.style.display = 'none';
      if (success) {
        success.classList.add('show');
        success.setAttribute('tabindex', '-1');
        success.focus();
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ---- フッターの西暦自動更新 ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- デモ注記を閉じる ---- */
  var noteClose = document.getElementById('demoNoteClose');
  if (noteClose) {
    noteClose.addEventListener('click', function () {
      var n = document.getElementById('demoNote');
      if (n) n.remove();
    });
  }
})();
