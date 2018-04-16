const express = require('express');

//const scraper = require('./scraper');

const app = express();

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const math = require('math');

const url = 'http://www.imdb.com/find?&s=tt&ttype=ft&ref_=fn_ft&q=';

var showTimes = [['4/15/18 1:00', '4/15/18 1:30', '4/15/18 3:15', '4/15/18 5:00',
        '4/15/18, 7:00', '4/15/18 9:00'], 
    ['4/16/18 1:00', '4/16/18 1:30', '4/16/18 3:15', '4/16/18 5:00',
        '4/16/18, 7:00', '4/16/18 9:00'], 
    ['4/17/18 1:00', '4/17/18 1:30', '4/17/18 3:15', '4/17/18 6:00',
        '4/17/18, 7:00', '4/17/18 9:00'], 
    ['4/18/18 1:00', '4/18/18 2:30', '4/18/18 3:15', '4/18/18 5:00',
        '4/18/18, 7:00', '4/18/18 9:00'], 
    ['4/19/18 1:00', '4/19/18 2:30', '4/19/18 3:15', '4/19/18 6:00',
        '4/19/18, 7:00', '4/19/18 9:00'], 
    ['4/20/18 1:00', '4/20/18 1:30', '4/20/18 3:15', '4/20/18 5:00',
        '4/20/18, 7:00', '4/20/18 9:00'], 
    ['4/21/18 1:00', '4/21/18 2:30', '4/21/18 3:15', '4/21/18 6:00',
        '4/21/18, 7:00', '4/21/18 9:00'],
    ['4/22/18 1:00', '4/22/18 2:30', '4/22/18 3:15', '4/22/18 6:00',
        '4/22/18, 7:00', '4/22/18 9:00'],
    ['4/23/18 1:00', '4/23/18 1:30', '4/23/18 3:15', '4/23/18 5:00',
        '4/23/18, 7:00', '4/23/18 9:00'],
    ['4/24/18 1:00', '4/24/18 2:30', '4/24/18 3:15', '4/24/18 5:00',
        '4/24/18, 7:00', '4/24/18 9:00'],
    ['4/25/18 1:00', '4/25/18 3:30', '4/25/18 3:15', '4/25/18 6:00',
        '4/25/18, 7:00', '4/25/18 9:00'],
    ['4/26/18 1:00', '4/26/18 5:30', '4/26/18 3:15', '4/26/18 5:00',
        '4/26/18, 7:00', '4/26/18 9:00']];

function makeShowTimes(){
    var outPut = [];
    var usedDays = [];
    var dayCounts = [4, 5, 6, 7];
    var numDays = Math.floor((Math.random() * 4) + 0);
    for (i = 0; i < dayCounts[numDays]; i++){
        var day = Math.floor((Math.random() * 11) + 0);
        //console.log('new day: ' + day);
            while (usedDays.includes(day)){
                //console.log('loopStartDay: ' + day);
                day = Math.floor((Math.random() * 11) + 0);
                //console.log('loopEndDay: ' + day);
         };       
        //console.log('loopDone!');
        outPut.push(showTimes[day]);
        usedDays.push(day);
        console.log('used days: ' + usedDays);
        //console.log(day);
    };
    usedDays = [];
    return outPut;
}

function searchMovies(searchTerm) {
    return fetch(`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
        $('.findResult').each(function(i, element) {
            const $element = $(element);
            $showTime = makeShowTimes();
            //console.log($showTime);
            //console.log($element.text());   
            const movie = {
                Title: $element.text().trim(),
                Showtimes: $showTime
            };
            movies.push(movie);
        });
    return movies;
});
}



//EXPRESS NODE STARTS HERE

app.get('/', (req, res) => {
        searchMovies('jurrasic park')
        .then(movies => {
            res.json(movies);
        });        
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
    });
    
    