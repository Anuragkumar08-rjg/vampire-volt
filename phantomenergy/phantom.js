const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1AM','4AM','8AM','12PM','4PM','8PM'],
    datasets: [{
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      label: 'Energy Usage',
      data: [2,3,4,5,3,4],
      backgroundColor: [
        'rgba(34,197,94,0.7)'
      ],
      borderRadius: 10,
      barThickness: 25,
      hoverBackgroundColor: '#22c55e'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#64748b'
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#64748b'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    }
  }
});
// Slider live value update
const slider = document.getElementById("rangeSlider");
const output = document.getElementById("targetValue");

if (slider) {
  output.innerText = slider.value;

  slider.oninput = function () {
    output.innerText = this.value;
  };
}
// WEEKLY BAR
new Chart(document.getElementById("weeklyChart"), {
  type: "bar",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      data: [4,5,3.8,6.2,4.9,7.1,5.4],
      backgroundColor: "#22c55e",
      borderRadius: 8,
      barThickness: 20
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#94a3b8" } },
      y: { ticks: { color: "#94a3b8" } }
    }
  }
});

// MONTHLY LINE
new Chart(document.getElementById("monthlyChart"), {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      data: [110,95,120,105,96,88],
      borderColor: "#06b6d4",
      tension: 0.4,
      fill: false
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#94a3b8" } },
      y: { ticks: { color: "#94a3b8" } }
    }
  }
});

// PIE CHART
new Chart(document.getElementById("pieChart"), {
  type: "doughnut",
  data: {
    labels: ["HVAC","Lighting","Appliances","Phantom"],
    datasets: [{
      data: [40,20,25,15],
      backgroundColor: [
        "#22c55e",
        "#06b6d4",
        "#facc15",
        "#ef4444"
      ]
    }]
  },
  options: {
    plugins: { legend: { display: false } }
  }
});

let devices = [];

// Device power map
const powerMap = {
  fan: 75,
  bulb: 10,
  tv: 100,
  router: 15,
  charger: 5,
  microwave: 1200
};

// Add device
function addDevice() {
  let selected = document.getElementById("deviceSelect").value;
  devices.push(selected);
  renderList();
}

// Show device list
function getSelectedDevices() {
  let checkboxes = document.querySelectorAll(".device-list input:checked");
  let selected = [];

  checkboxes.forEach(cb => {
    selected.push(cb.value);
  });

  return selected;
}

// Remove device
function removeDevice(index) {
  devices.splice(index, 1);
  renderList();
}

// Main calculation
function calculate() {
  let devices = getSelectedDevices();
  let hours = parseFloat(document.getElementById("hours").value);
  let rate = parseFloat(document.getElementById("rate").value);

  if (devices.length === 0 || !hours || !rate) {
    alert("Select devices & fill all fields!");
    return;
  }

  let totalWatts = devices.reduce((sum, d) => sum + powerMap[d], 0);

  let phantomWatts = totalWatts * 0.2;

  let energy = (phantomWatts * hours * 365) / 1000;
  let cost = energy * rate;

  document.getElementById("result").innerHTML = `
    ⚡ ${energy.toFixed(2)} kWh/year <br>
    💸 ₹${cost.toFixed(2)}
  `;

  generateAdvice(cost, energy, devices);
}
// AI Advice (rule-based but looks smart 🔥)
function generateAdvice(cost, energy, devices) {
  let advice = "";

  if (cost > 3000) {
    advice += "⚠️ High energy waste detected!<br>";
  }

  if (devices.includes("router")) {
    advice += "📡 Turn off router at night.<br>";
  }

  if (devices.includes("charger")) {
    advice += "🔌 Unplug chargers.<br>";
  }

  if (devices.includes("tv")) {
    advice += "📺 Avoid standby mode.<br>";
  }

  if (devices.includes("fan")) {
    advice += "🌀 Use energy-efficient fans.<br>";
  }

  if (energy > 500) {
    advice += "🔥 Use smart plugs for automation.<br>";
  }

  if (advice === "") {
    advice = "✅ Your energy usage is efficient!";
  }

  document.getElementById("advice").innerHTML = advice;
}
