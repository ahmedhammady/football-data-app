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



function showOptions() {
    document.getElementById('myDropdown').classList.toggle('show');
}

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

function createButton(competitionName, competitionId, competitionMatchDay) {
    // logic for creating button ...
    // document.create ...

    var button = document.createElement('a');
    button.innerHTML = competitionName;
    button.id = competitionId;
    button.className = 'leagueLink';

    document.getElementById('buttons').appendChild(button);

    button.onclick = function () {
        getLeagueTable(competitionId);
        getLeagueFixtures(competitionId, competitionMatchDay);

        // stop current interval and start a new one
        stopTimer();

        var leagues = listOfCompetitions.filter(function(item) {
            return item.id === competitionId;
        });
                
        currentCompetitionIndex = listOfCompetitions.indexOf(leagues[0]);
       
        intervalAction(); 
        startTimer();
        // startTimer();
        // find the index of current competition and set it as current using competitionId
        // use listOfCompetitions.filter (that will give you the competition)
        // find index of the item 
        // set currentIndex to the item index
        // call startTimer();
    }   
    
    
    //setInterval(); 
    //tried with button.id and the result was the same. 

    // var loadPage = function () {
    //     getLeagueTable(competitionId);
    //     getLeagueFixtures(competitionId, competitionMatchDay);
    //     competitionId++;

    // }

    // function startInterval() {
    //     setInterval(loadPage, 2000);
    //     clearInterval(interval);
    //     setInterval(loadPage, 2000);
    // }

}

//how do I make it start at the first one? 
//how do i make it go back to the beginning at the end? 
//why is the interval large between the first and the second but not after that?\
//if we get to the end = function () {
//clear clearInterval(interval);}

function processCompetition(competitionData) {

    createButton(competitionData.caption, competitionData.id, competitionData.currentMatchday);
    //getLeagueTable(competitionData.id); 
    //this above would set off the leagues loaded, using the competitionData.id as a parameter.
}

var listOfCompetitions;
var currentCompetitionIndex = 0;
var maxCompetitionIndex;
var intervalNumber;

function onCompetitionsLoaded(data) {
    // this is where you start doing things

    // very important in this case: iterate over the array - for loop. A lot of the functions need to be ran one by one. 
    data.forEach(processCompetition);

    listOfCompetitions = data;
    maxCompetitionIndex = data.length - 1;

    intervalAction();
    startTimer();

}

function startTimer() {
    intervalNumber = setInterval(intervalAction, 20000);
}

function stopTimer() {
    clearInterval(intervalNumber);
}

var intervalAction = function () {
    // take first competition - which is autoLoadId
    // show it
    var leagueToRender = listOfCompetitions[currentCompetitionIndex];
    getLeagueTable(leagueToRender.id);
    getLeagueFixtures(leagueToRender.id, leagueToRender.currentMatchday)

    currentCompetitionIndex++;

    if (currentCompetitionIndex > maxCompetitionIndex) {
        currentCompetitionIndex = 0;
    }
}

function getLeagueTable(competitionId) {
    var x = 'http://api.football-data.org/v1/competitions/' + competitionId + '/leagueTable';
    getData(x, onLeaguesLoaded);
    //the competitionId parameter is given a value further up, when it is called in the processCompetition function. 
}

function onLeaguesLoaded(data) {
    createTable(data);
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
        teamDiv.className = ('teamDiv');

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

        else {
            goalDifference.innerHTML = competitionData.standing[i].goalDifference;
        }
        teamDiv.appendChild(goalDifference);
        goalDifference.className = 'goalDifference';

        var teamPoints = document.createElement('span');
        teamPoints.innerHTML = competitionData.standing[i].points;
        teamDiv.appendChild(teamPoints);
        teamPoints.className = 'teamPoints';

        teamDiv.onclick = function () {
            var nextOpponent = document.createElement('span');
            nextOpponent.innerHTML = '';//I HAVE TO GO TO THE HREF ASSOCIATED WITH IT + /fixtures, then look at the first one with null value, and if the team name is not the name of the team, then write that. 
        }

    }
}

function getLeagueFixtures(competitionId, competitionMatchDay) {
    var x = 'http://api.football-data.org/v1/competitions/' + competitionId + '/fixtures?matchday=' + competitionMatchDay;
    getData(x, onFixturesLoaded)
}

function onFixturesLoaded(data) {
    createFixturesList(data);
}

function createFixturesList(fixturesData) {



    var fixturesContainer = document.getElementById('fixturesList')
    fixturesContainer.innerHTML = '';


    for (var i = 0; i < fixturesData.count; i++) {

        var fixture = fixturesData.fixtures[i];

        var fixtureDiv = document.createElement('div');
        fixturesContainer.appendChild(fixtureDiv);
        fixtureDiv.className = 'fixtureDiv';

        var homeTeam = document.createElement('span');
        homeTeam.innerHTML = fixture.homeTeamName;
        fixtureDiv.appendChild(homeTeam);
        homeTeam.className = 'teamName';

        var score = document.createElement('span');
        score.className = 'score';

        var hasScore = Number.isInteger(fixture.result.goalsHomeTeam) && Number.isInteger(fixture.result.goalsAwayTeam);
        if (hasScore) {
            score.innerHTML = fixture.result.goalsHomeTeam + '-' + fixture.result.goalsAwayTeam;
        }
        else {
            var date = new Date(fixture.date);
            var dtString = '';
            var monthString = '';
            if (date.getDate() < 10) {
                dtString = String = '0' + date.getDate();
            } else {
                dtString = String = date.getDate();
            }
            if (date.getMonth() + 1 < 10) {
                monthString = '0' + Number(date.getMonth() + 1);
            } else {
                monthString = String = date.getMonth() + 1;
            }
            score.innerHTML = monthString + '/' + dtString;
        }



        fixtureDiv.appendChild(score);

        var awayTeam = document.createElement('span');
        awayTeam.innerHTML = fixture.awayTeamName;
        fixtureDiv.appendChild(awayTeam);
        awayTeam.className = 'teamName';
    }
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
        }
    }
}


getData('http://api.football-data.org/v1/competitions', onCompetitionsLoaded); //This is what sets off the chain. 


//REMEMBER TO MAKE THE BUTTON ONCLICK RETURN TO AN EMPTY CLICK AT THE START SO THAT EVERY TIME WE CLICK, WE GET A NEW PAGE. 

// http://api.football-data.org/v1/competitions/445/fixtures?matchday=4


//DIV ONCLICK: all fixtures for that team. if score is null, replace by an empty string. 
//Until onclick, we could have all fixtures for the next matchday. Then onclick, that disappears. 