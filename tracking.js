(function () {
  'use strict';
  const config = window.JVL_TRACKING || {};
  const key = 'jvl_tracking_consent';
  const hasId = value => typeof value === 'string' && value.trim() !== '';
  let enabled = false;

  function loadTracking() {
    if (enabled) return;
    enabled = true;
    if (hasId(config.ga4Id)) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', config.ga4Id, { send_page_view: true });
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.ga4Id);
      document.head.appendChild(script);
    }
    if (hasId(config.metaPixelId)) {
      const fbq = window.fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = '2.0';
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
      fbq('init', config.metaPixelId);
      fbq('track', 'PageView');
    }
  }

  function record(name, params, metaEvent) {
    if (!enabled) return;
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.fbq === 'function' && metaEvent) window.fbq('track', metaEvent, params);
  }

  window.JVL_trackWhatsApp = function (source) {
    record('generate_lead', { method: 'whatsapp', source: source || 'button' }, 'Contact');
  };

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') {
      window.JVL_trackWhatsApp(link.classList.contains('whatsapp-float') ? 'floating_button' : 'product_link');
    } else if (url.hostname.endsWith('mercadolivre.com.br')) {
      record('select_item', { destination: 'mercado_livre', link_url: url.origin + url.pathname }, 'ViewContent');
    } else if (url.protocol === 'tel:') {
      record('contact', { method: 'phone' }, 'Contact');
    } else if (url.protocol === 'mailto:') {
      record('contact', { method: 'email' }, 'Contact');
    }
  });

  function showNotice() {
    if (document.querySelector('.cookie-notice')) return;
    const notice = document.createElement('div');
    notice.className = 'cookie-notice';
    notice.setAttribute('role', 'dialog');
    notice.setAttribute('aria-label', 'Preferências de cookies');
    notice.innerHTML = '<p>Usamos cookies de análise e publicidade para entender visitas e melhorar nossos anúncios. Você pode aceitar ou recusar. <a href="privacidade.html">Saiba mais</a>.</p><div><button type="button" data-consent="rejected">Recusar</button><button type="button" data-consent="accepted">Aceitar</button></div>';
    document.body.appendChild(notice);
    notice.addEventListener('click', function (event) {
      const choice = event.target.closest('[data-consent]');
      if (!choice) return;
      const previous = localStorage.getItem(key);
      localStorage.setItem(key, choice.dataset.consent);
      notice.remove();
      if (choice.dataset.consent === 'accepted') loadTracking();
      if (choice.dataset.consent === 'rejected' && previous === 'accepted') location.reload();
    });
  }

  window.JVL_manageCookies = showNotice;
  const stored = localStorage.getItem(key);
  if (stored === 'accepted') loadTracking();
  if (stored !== 'accepted' && stored !== 'rejected') showNotice();
})();
