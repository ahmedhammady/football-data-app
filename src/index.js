getData('http://api.football-data.org/v1/competitions', function(data) {
    console.log('all competitions data', data);
});

// 1) create a button for all competitions
// 2) when you click a button, display league table of the competition using http://api.football-data.org/v1/competitions/{id}/leagueTable
// 3) style it nicely :)