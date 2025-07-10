const currencySelects = ["from", "to"];
const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "CAD"];

const API_KEY = "A3LPpHgcsNwexG51Ltkyh0ka3fEjoTX3EY";
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
    const response = await fetch(`${API_URL}&symbols=${from},${to}`);
    const data = await response.json();

    if (data.success) {
      const rateFrom = data.rates[from];
      const rateTo = data.rates[to];

      const converted = (amount / rateFrom) * rateTo;
      document.getElementById("result").textContent =
        `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
    } else {
      document.getElementById("result").textContent = "Failed to fetch exchange rates.";
    }
  } catch (error) {
    document.getElementById("result").textContent = "Error: " + error.message;
  }
}