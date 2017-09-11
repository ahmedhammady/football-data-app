// 1) create a button for all competitions
// 2) when you click a button, display league table of the competition using http://api.football-data.org/v1/competitions/{id}/leagueTable
// 3) style it nicely :)
/* We need to be able to retrieve the data with a variable, then make sure that the code only runs if that variable is true/defined (since the code is constantly running in the background, the execution of the code may occur at a time when the data is not available. */

// var button = function(/*maybe ID number? Data number? */) {

//         create = function() {document.createElement('button')},
//         if (footballData){
//         innerHTML; /* name of the league */
//         button.onclick /* display league table */
//         }
// }

///////--------

function getData(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open('GET', url, true);
    xhttp.setRequestHeader('X-Auth-Token', 'df6dd416d0c84b2c8b5fc3388237d5a4');
    xhttp.send();
}

function createButton(competitionName, competitionId) {
    // logic for creating button ...
    // document.create ...

    var button = document.createElement('button');
    button.innerHTML = competitionName;
    button.id = competitionId;

    document.getElementById('buttons').appendChild(button);

    button.onclick = function () {
        getLeagueTable(competitionId); //tried with button.id and the result was the same. 
    }

}



function processCompetition(competitionData) {

    createButton(competitionData.caption, competitionData.id);
    //getLeagueTable(competitionData.id); 
    //this above would set off the leagues loaded, using the competitionData.id as a parameter.
}


function onCompetitionsLoaded(data) {
    // this is where you start doing things

    // very important in this case: iterate over the array - for loop. A lot of the functions need to be ran one by one. 
    data.forEach(processCompetition);
}

function getLeagueTable(competitionId) {
    var x = 'http://api.football-data.org/v1/competitions/' + competitionId + '/leagueTable';
    getData(x, onLeaguesLoaded);
    //the competitionId parameter is given a value further up, when it is called in the processCompetition function. 
}

function onLeaguesLoaded(data) {

    createTable(data);
    // this is where you start doing things
    //document.body.innerHTML = 'league table received!', data;
    // You can do things here
}

var createTable = function (competitionData) {

    var container = document.getElementById('bodyLeagueTable');
    container.innerHTML = '';    

    var leagueCaption = document.createElement('div'); 
    leagueCaption.innerHTML = competitionData.leagueCaption;
    container.appendChild(leagueCaption);
    leagueCaption.className = 'leagueCaption';

    for (var i = 0; i < competitionData.standing.length; i++) {
        var tableRow = competitionData.standing[i];
        console.log(tableRow.teamName, tableRow.points)
    }
    
    var container = document.getElementById('bodyLeagueTable');
    container.innerHTML = '';    

    var leagueCaption = document.createElement('div'); 
    leagueCaption.innerHTML = competitionData.leagueCaption;
    container.appendChild(leagueCaption);
    leagueCaption.className = 'leagueCaption';

    var tableHeader = document.createElement('div');
    container.appendChild(tableHeader);
    tableHeader.id = 'tableHeader';

    var positionHeader = document.createElement('span');
    tableHeader.appendChild(positionHeader);
    positionHeader.className = 'teamPosition';    

    var teamNameHeader = document.createElement('span');
    teamNameHeader.innerHTML = 'Team';
    tableHeader.appendChild(teamNameHeader);
    teamNameHeader.className = 'teamName';

    var gamesPlayedHeader = document.createElement('span');
    gamesPlayedHeader.innerHTML = 'GP';
    tableHeader.appendChild(gamesPlayedHeader);
    gamesPlayedHeader.className = ('gamesPlayed');

    var gdHeader = document.createElement('span');
    gdHeader.innerHTML = 'GD';
    tableHeader.appendChild(gdHeader);
    gdHeader.className = ('goalDifference');

    var pointsHeader = document.createElement('span');
    pointsHeader.innerHTML = 'Points';
    tableHeader.appendChild(pointsHeader);
    pointsHeader.className = ('teamPoints');

    for (var i = 0; i < competitionData.standing.length; i++) {

        var teamDiv = document.createElement('div');
        container.appendChild(teamDiv);
        teamDiv.className = ('teamDiv')

        var teamPosition = document.createElement('span');
        teamPosition.innerHTML = competitionData.standing[i].position;
        teamDiv.appendChild(teamPosition);
        teamPosition.className = 'teamPosition';

        var teamName = document.createElement('span');
        teamName.innerHTML = competitionData.standing[i].teamName;
        teamDiv.appendChild(teamName);
        teamName.className = 'teamName';

        var gamesPlayed = document.createElement('span');
        gamesPlayed.innerHTML = competitionData.standing[i].playedGames;
        teamDiv.appendChild(gamesPlayed);
        gamesPlayed.className = 'gamesPlayed';        

        var goalDifference = document.createElement('span');
        if (competitionData.standing[i].goalDifference > 0) {
            goalDifference.innerHTML = '+' + competitionData.standing[i].goalDifference;
        }

        else {goalDifference.innerHTML = competitionData.standing[i].goalDifference;
        }
        teamDiv.appendChild(goalDifference);
        goalDifference.className = 'goalDifference';

        var teamPoints = document.createElement('span');
        teamPoints.innerHTML = competitionData.standing[i].points;
        teamDiv.appendChild(teamPoints);
        teamPoints.className = 'teamPoints';

        teamDiv.onclick = function() {
            var nextOpponent = document.createElement('span');
            nextOpponent.innerHTML = //I HAVE TO GO TO THE HREF ASSOCIATED WITH IT + /fixtures, then look at the first one with null value, and if the team name is not the name of the team, then write that. 
        }

    }



    // var leagueTable = document.createElement('table');

    // var tr = leagueTable.insertRow(-1);

    // var col = [ 'position', 'teamName', 'points' ];    
    // for (var i = 0; i < col.length; i++) {
    //     var th = document.createElement('th');
    //     th.innerHTML = col[i];
    //     tr.appendChild(th);
    // }

    // for (var i = 0; i < competitionData.standing.length; i++) {

    //     tr = leagueTable.insertRow(-1);

    //     for (var j = 0; j < col.length; j++) {
    //         var tableCell = tr.insertCell(-1);
    //         tableCell.innerHTML = competitionData.standing[i][col[j]];
    //     }
    // }


}

getData('http://api.football-data.org/v1/competitions', onCompetitionsLoaded); //This is what sets off the chain. 


//so right now, onLeaguesLoaded gets set off straightaway, without the click of a button, even though I'm only calling it from the button.onClick command. Any idea as to what is wrong?

// ERROR: 

// //index.js:92 Uncaught TypeError: Cannot read property 'appendChild' of null
// at createTable (index.js:92)
// at onLeaguesLoaded (index.js:70)
// at XMLHttpRequest.xhttp.onreadystatechange (index.js:21)
// createTable @ index.js:92
// onLeaguesLoaded @ index.js:70
// xhttp.onreadystatechange @ index.js:21
// XMLHttpRequest.send (async)
// getData @ index.js:26
// getLeagueTable @ index.js:64
// button.onclick @ index.js:40


//REMEMBER TO MAKE THE BUTTON ONCLICK RETURN TO NULL OR WHATEVER AFTER SO WE CAN RECLICK ON IT AND IT REFRESHES INSTEAD OF WRITING THE CODE AGAIN