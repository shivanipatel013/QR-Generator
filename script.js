const generateBtn = document.getElementById("generateBtn");
const qrBox = document.getElementById("qrBox");
const loader = document.getElementById("loader");
const downloadBtn = document.getElementById("downloadBtn");

let qrCode; // global reference

generateBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
        alert("Please fill all fields");
        return;
    }

    // Reset
    qrBox.innerHTML = "";
    downloadBtn.style.display = "none";
    loader.style.display = "block";

    setTimeout(() => {
        loader.style.display = "none";

        const qrData = `Name:${name}\nEmail: ${email}\nPhone: ${phone}`;

        qrCode = new QRCode(qrBox, {
            text: qrData,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadBtn.style.display = "block";
    }, 600);
});

/* DOWNLOAD QR (handles canvas + img both) */
downloadBtn.addEventListener("click", () => {
    const canvas = qrBox.querySelector("canvas");
    const img = qrBox.querySelector("img");

    let qrURL = "";

    if (canvas) {
        qrURL = canvas.toDataURL("image/png");
    } else if (img) {
        qrURL = img.src;
    } else {
        alert("QR not found!");
        return;
    }

    const link = document.createElement("a");
    link.href = qrURL;
    link.download = "qr-code.png";
    link.click();
});