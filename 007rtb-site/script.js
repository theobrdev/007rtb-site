// Força o download dos .rbxl em vez de abrir o XML no navegador
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[download]');
  if (!a) return;
  var url = a.getAttribute('href');
  if (!/\.rbxl(\?.*)?$/i.test(url)) return;
  e.preventDefault();
  var name = url.split('/').pop().split('?')[0];
  fetch(url)
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); })
    .then(function (b) {
      var blob = new Blob([b], { type: 'application/octet-stream' });
      var u = URL.createObjectURL(blob);
      var t = document.createElement('a');
      t.href = u; t.download = name;
      document.body.appendChild(t); t.click(); t.remove();
      setTimeout(function () { URL.revokeObjectURL(u); }, 5000);
    })
    .catch(function () { window.location.href = url; }); // fallback (ex.: abrindo via file://)
});
