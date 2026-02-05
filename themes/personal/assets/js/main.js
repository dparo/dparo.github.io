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

  // ── Heading anchor links ─────────────────────────────────────
  // For every content heading that Hugo gave an id, prepend a small
  // <a class="heading-anchor"> containing the FA link icon.
  // On click: push #id into the URL via replaceState (no page jump)
  // and flash the icon green briefly as confirmation.

  document.querySelectorAll('.content h2[id], .content h3[id], .content h4[id]').forEach((heading) => {
    const id   = heading.id;
    const link = document.createElement('a');
    link.className = 'heading-anchor';
    link.setAttribute('href', '#' + id);
    link.setAttribute('aria-label', 'Link to ' + heading.textContent.trim());
    link.innerHTML = '<i class="fa-solid fa-link"></i>';

    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Update the URL hash without scrolling
      history.replaceState(null, '', window.location.pathname + window.location.search + '#' + id);

      // Flash confirmation
      link.classList.add('clicked');
      setTimeout(() => link.classList.remove('clicked'), 1200);
    });

    // Append so the icon sits right after the heading text in the DOM
    heading.append(link);
  });

});
