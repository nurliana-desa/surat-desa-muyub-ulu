const form = document.querySelector("form");
const pesan = document.getElementById("pesanSukses");

// LINK GOOGLE APPS SCRIPT KAMU
const URL = https://script.google.com/macros/s/AKfycbzKbEYm-h1HcUQxSn6WBg9qEx03LojDJRq978c3Jhh7W0HhV1LBforJPpW-Peiyq-UzPw/exec

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nomorSurat: form.elements[0].value.trim(),
    tanggal: form.elements[1].value,
    kodeDesa: form.elements[2].value.trim(),
    tujuan: form.elements[3].value.trim(),
    perihal: form.elements[4].value.trim(),
    dibuatOleh: form.elements[5].value.trim(),
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        pesan.style.display = "block";
        setTimeout(() => (pesan.style.display = "none"), 5000);
        form.reset();
        form.elements[0].focus();
      } else {
        alert("Gagal menyimpan data");
      }
    })
    .catch(() => alert("Koneksi gagal"));
});


