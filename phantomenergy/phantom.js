const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1AM','4AM','8AM','12PM','4PM','8PM'],
    datasets: [{
      label: 'Energy Usage',
      data: [2,3,4,5,3,4],
    }]
  }
});