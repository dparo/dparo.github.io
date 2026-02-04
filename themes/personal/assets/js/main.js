document.addEventListener('DOMContentLoaded', () => {

  // ── Copy buttons for code blocks ──────────────────────────────
  document.querySelectorAll('.highlight').forEach((block) => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>' +
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' +
      '</svg>';

    btn.addEventListener('click', () => {
      const codeTd = block.querySelector('.lntd:last-child code');
      if (!codeTd) return;
      navigator.clipboard.writeText(codeTd.textContent).then(() => {
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1500);
      });
    });

    block.appendChild(btn);
  });

  // ── Archive date filter ───────────────────────────────────────
  // Sidebar archive year/month links navigate to /posts/?year=X&month=Y.
  // This block reads those params, filters the post cards on the current
  // page, hides pagination (incomplete pages make no sense when filtered),
  // and shows a banner with a link to clear the filter.
  //
  // The sidebar's own <details> post lists are the authoritative
  // complete filtered view for every year/month.

  const params   = new URLSearchParams(window.location.search);
  const yearParam  = params.get('year');
  const monthParam = params.get('month');

  if (yearParam) {
    const cards      = document.querySelectorAll('section[data-year]');
    const pagination = document.querySelector('nav.pagination');
    let   visible    = 0;

    cards.forEach((card) => {
      const cardYear  = card.dataset.year;
      const cardMonth = card.dataset.month;
      const yearMatch  = cardYear === yearParam;
      const monthMatch = !monthParam || cardMonth === monthParam;

      if (yearMatch && monthMatch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    // Hide pagination — filtered results are partial-page only
    if (pagination) pagination.style.display = 'none';

    // Build the banner label
    const monthNames = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let label = yearParam;
    if (monthParam) label = monthNames[parseInt(monthParam, 10)] + ' ' + yearParam;

    // Inject (or reveal) filter banner at the top of .content
    let banner = document.querySelector('.filter-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'filter-banner';
      const content = document.querySelector('.content');
      // Insert after the h1 if present, otherwise at the very top
      const h1 = content.querySelector('h1');
      if (h1) {
        h1.after(banner);
      } else {
        content.prepend(banner);
      }
    }
    banner.innerHTML =
      '<span>Showing <strong>' + visible + '</strong> post' + (visible !== 1 ? 's' : '') +
      ' for <strong>' + label + '</strong> (this page only)</span>' +
      '<a href="' + window.location.pathname + '" class="clear-filter">Clear filter</a>';
    banner.classList.add('active');

    // Show no-results hint if nothing matched
    if (visible === 0) {
      let noRes = document.querySelector('.no-results');
      if (!noRes) {
        noRes = document.createElement('p');
        noRes.className = 'no-results';
        noRes.textContent = 'No posts match this filter on the current page. Browse the archive in the sidebar.';
        banner.after(noRes);
      }
      noRes.classList.add('active');
    }
  }

  // ── Archive <details> click: prevent navigation when clicking summary ─
  // The <summary> contains an <a> (for the filter shortcut) and an
  // .archive-count badge.  A click anywhere on <summary> should toggle
  // the <details> open/closed.  A click directly on the <a> should
  // ALSO navigate.  We let the browser handle both natively — the <a>
  // navigates and the <details> toggles — which is the correct default.
  // No extra JS needed here.

});
