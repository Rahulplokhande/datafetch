const fs = require("fs");
const CONFIG = require("../config.js");

const url = `${CONFIG.API_URL}?api-key=${CONFIG.API_KEY}&format=json&limit=10`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    // Save only records
    if (data.records) {
      fs.writeFileSync(
        "data.json",
        JSON.stringify(data.records, null, 2),
        "utf-8"
      );
      console.log("✅ Data saved to data.json");
    } else {
      console.error("❌ Error: No records in response", data);
    }
  })
  .catch(err => console.error("❌ Error:", err));

