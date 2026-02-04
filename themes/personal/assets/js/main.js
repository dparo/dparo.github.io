document.addEventListener('DOMContentLoaded', () => {
  // ── Copy buttons for code blocks ──────────────────────────────
  // Hugo renders fenced code blocks as:
  //   .highlight > .chroma > table.lntable > tr
  //     > td.lntd   (line numbers)
  //     > td.lntd   (code)  ← this is what we copy
  //
  // The copy button is injected into .highlight (position: relative)
  // and on click it reads textContent from the *code* td only, so
  // line numbers are never included in the clipboard.

  document.querySelectorAll('.highlight').forEach((block) => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    // SVG clipboard icon — intentionally minimal
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>' +
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' +
      '</svg>';

    btn.addEventListener('click', () => {
      // Find the code td — it is the last .lntd in the table
      const codeTd = block.querySelector('.lntd:last-child code');
      if (!codeTd) return;

      navigator.clipboard.writeText(codeTd.textContent).then(() => {
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1500);
      });
    });

    block.appendChild(btn);
  });
});
