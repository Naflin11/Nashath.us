(async function () {
  const mount = document.getElementById("footerMount");
  if (!mount) return;

  const res = await fetch("assests/html/footer.html");
  mount.innerHTML = await res.text();

  document.getElementById("year").textContent = new Date().getFullYear();
})();