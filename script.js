function getData() {
  const url = `${CONFIG.API_URL}?api-key=${CONFIG.API_KEY}&format=json&limit=10`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.records);
      displayData(data.records);
    })
    .catch(err => console.error(err));
}

function displayData(records) {
  const dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = "";

  if (!records || records.length === 0) {
    dataContainer.innerHTML = "<p>No data found</p>";
    return;
  }

  // Get all unique keys from records
  const keys = [...new Set(records.flatMap(record => Object.keys(record)))];

  // Create table HTML
  let html = `<table class="data-table">
    <thead>
      <tr>
        ${keys.map(key => `<th>${key}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${records.map(record => `
        <tr>
          ${keys.map(key => `<td>${record[key] || "-"}</td>`).join("")}
        </tr>
      `).join("")}
    </tbody>
  </table>`;

  dataContainer.innerHTML = html;
}
