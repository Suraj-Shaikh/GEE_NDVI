// Dummy Data for Visualization
const ctx = document.getElementById('chartCanvas').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Region A', 'Region B', 'Region C'],
        datasets: [{
            label: 'NDVI Value',
            data: [0.4, 0.6, 0.8],
            backgroundColor: ['red', 'green', 'blue']
        }]
    },
});
