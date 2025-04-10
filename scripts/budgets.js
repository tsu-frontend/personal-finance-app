
 
 const ctx = document.getElementById('doughnut');

 const cyrcle = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: '# of Votes',
        data: [15, 150, 133, 40],
        borderWidth: 0,
        backgroundColor: [
           '#277C78',
           '#82C9D7',
           '#F2CDAC',
           '#626070',

        ]
      }]
    },
    options: {
        cutout: '68%', 
        responsive: true,
    }
  });

  