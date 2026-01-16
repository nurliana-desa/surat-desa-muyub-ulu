const form = document.querySelector("form");
const tableBody = document.querySelector("#tabelSurat tbody");
const pesan = document.getElementById("pesanSukses");

let dataSurat = JSON.parse(localStorage.getItem("dataSurat")) || [];

// TAMPILKAN DATA SAAT HALAMAN DIBUKA
function tampilkanData() {
  tableBody.innerHTML = "";

  dataSurat.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nomorSurat}</td>
      <td>${item.tanggal}</td>
      <td>${item.kodeDesa}</td>
      <td>${item.tujuan}</td>
      <td>${item.perihal}</td>
      <td>${item.dibuatOleh}</td>
      <td>${item.berkas || "-"}</td>
    `;
    tableBody.appendChild(row);
  });
}

tampilkanData();

// SIMPAN DATA
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nomorSurat = form.elements[0].value.trim();
  const tanggal = form.elements[1].value;
  const kodeDesa = form.elements[2].value.trim();
  const tujuan = form.elements[3].value.trim();
  const perihal = form.elements[4].value.trim();
  const dibuatOleh = form.elements[5].value.trim();

  const fileInput = form.elements[6];
  const namaFile = fileInput.files[0]?.name || "-";

  // CEK NOMOR SURAT DOBEL
  const sudahAda = dataSurat.some(
    (item) => item.nomorSurat === nomorSurat
  );

  if (sudahAda) {
    alert("Nomor surat sudah terdaftar. Silakan gunakan nomor lain.");
    return;
  }

  const suratBaru = {
    nomorSurat,
    tanggal,
    kodeDesa,
    tujuan,
    perihal,
    dibuatOleh,
    berkas: namaFile
  };

  dataSurat.push(suratBaru);
  localStorage.setItem("dataSurat", JSON.stringify(dataSurat));

  tampilkanData();
  form.reset();

  // PESAN SUKSES 5 DETIK
  pesan.style.display = "block";
  setTimeout(() => {
    pesan.style.display = "none";
  }, 5000);

  form.elements[0].focus();
});