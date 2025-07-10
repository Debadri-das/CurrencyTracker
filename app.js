const currencySelects = ["from", "to"];
const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "CAD"];

const API_KEY = "A3A3LPpHgcsNwexG51Ltkyh0ka3fEjoTX3";
const API_URL = `https://data.fixer.io/api/latest?access_key=${API_KEY}`;

window.onload = () => {
  currencySelects.forEach(id => {
    const select = document.getElementById(id);
    currencies.forEach(curr => {
      const option = document.createElement("option");
      option.value = curr;
      option.text = curr;
      select.appendChild(option);
    });
  });

  // Default selection
  document.getElementById("from").value = "EUR";
  document.getElementById("to").value = "USD";
};

async function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  try {
    // NOTE: Base is always EUR for free plan
    const response = await fetch(`${API_URL}&symbols=${from},${to}`);
    const data = await response.json();

    if (data.success) {
      const rates = data.rates;

      // Conversion logic assuming base is always EUR
      let convertedAmount;
      if (from === "EUR") {
        convertedAmount = amount * rates[to]; // EUR → target
      } else if (to === "EUR") {
        convertedAmount = amount / rates[from]; // from → EUR
      } else {
        // from → EUR → to
        const amountInEUR = amount / rates[from];
        convertedAmount = amountInEUR * rates[to];
      }

      document.getElementById("result").textContent =
        `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    } else {
      document.getElementById("result").textContent =
        "Failed to fetch exchange rates: " + (data.error?.info || "Unknown error");
    }
  } catch (error) {
    document.getElementById("result").textContent = "Error: " + error.message;
  }
}
