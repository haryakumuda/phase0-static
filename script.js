function showSubscribedMessage(event) {
  event.preventDefault();
  alert("Subscribed!");
}

let lastValidPrice = ""; // Store the last valid price

function formatPriceInput() {
  const priceInput = document.getElementById("price");
  let priceValue = priceInput.value.replace(/[Rp.,\s]/g, "");

  if (priceValue === "") {
    priceInput.value = "Rp 0";
    lastValidPrice = ""; // Reset last valid price
  } else if (!isNaN(priceValue) && priceValue !== "") {
    lastValidPrice = priceValue; // Update the last valid price
    priceValue = parseFloat(priceValue)
      .toLocaleString("en-US")
      .replace(/,/g, ".");
    priceInput.value = `Rp ${priceValue}`;
  } else {
    // Restore the last valid price if the input is not a number
    if (lastValidPrice !== "") {
      priceInput.value = `Rp ${parseFloat(lastValidPrice)
        .toLocaleString("en-US")
        .replace(/,/g, ".")}`;
    } else {
      priceInput.value = "Rp 0";
    }
  }

  updateDownPaymentPrice();
}

function updateDownPaymentPrice() {
  const priceInput = document.getElementById("price").value;
  const price = parseFloat(priceInput.replace(/[Rp.,\s]/g, "")) || 0;
  const downPaymentPercent = parseFloat(
    document.getElementById("down-payment").value
  );
  const downPaymentPrice = price * downPaymentPercent;

  const formattedDownPaymentPrice = downPaymentPrice
    .toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/,/g, ".");

  document.getElementById(
    "down-payment-price"
  ).value = `Rp ${formattedDownPaymentPrice}`;
}

function calculatePayment() {
  const priceInput = document.getElementById("price").value;
  const price = parseFloat(priceInput.replace(/[Rp.,\s]/g, "")) || 0;
  const downPaymentPriceInput =
    document.getElementById("down-payment-price").value;
  const downPaymentPrice =
    parseFloat(downPaymentPriceInput.replace(/[Rp.,\s]/g, "")) || 0;
  const assurancePercent = parseFloat(
    document.getElementById("assurance").value
  );

  const principal = price - downPaymentPrice;
  const payment = principal * (assurancePercent + 1);

  const duration = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
  let installment = [];

  for (let i = 0; i < duration.length; i++) {
    let monthlyPayment = payment / duration[i];
    installment.push(monthlyPayment);
  }

  showTenor(duration, installment);
}

function showTenor(duration, installment) {
  const resultBody = document
    .getElementById("result")
    .getElementsByTagName("tbody")[0];
  resultBody.innerHTML = ""; // Clear previous results

  for (let i = 0; i < duration.length; i++) {
    const row = document.createElement("tr");

    const durationCell = document.createElement("td");
    durationCell.textContent = duration[i];
    row.appendChild(durationCell);

    const installmentCell = document.createElement("td");
    const formattedInstallment = installment[i].toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    installmentCell.textContent = `Rp ${formattedInstallment}`;
    row.appendChild(installmentCell);

    resultBody.appendChild(row);
    document.getElementById("result").style.display = "show";
  }
}
