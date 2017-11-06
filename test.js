let cheerio = require('cheerio')
var http= require("http")
var fs = require('fs');
var express = require('express');
var jquerygo = require('jquerygo');
var sql = require("seriate");
let jsonframe = require('jsonframe-cheerio');
var schedule = require('node-schedule');
var cronJob = require('cron').CronJob;
var cron = require('node-cron');
var Horseman = require('node-horseman');
var request = require('request');


var config = {
    "host": "10.10.10.46",
     "user": "sportbookdba",
     "password": "lumalu",
     "database": "DonBest"
 };

sql.setDefaultConfig( config );

function sendLine(params, cb){
    request.post(
            'http://tools.golden8sports.com/bridge/props.asp',
            { form: params },
            function (error, response, body) {
                    //console.log(body);
                    if (!error && response.statusCode == 200) {
                            cb(body);
                    }
            }
    );
}

function getDateTime() {
    
        var date = new Date();
    
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
    
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
    
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
    
        var year = date.getFullYear();
    
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
    
        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    
    }

    function postReq(){
        var http = require('http');
        var querystring = require('querystring');
        
        var postData = querystring.stringify({
            msg: 'hello world'
        });
        
        var options = {
            hostname: 'localhost',
            port: 3000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };
        
        var req = http.request(options, function (res) {
            console.log('STATUS:', res.statusCode);
            console.log('HEADERS:', JSON.stringify(res.headers));
        
            res.setEncoding('utf8');
        
            res.on('data', function (chunk) {
                console.log('BODY:', chunk);
            });
        
            res.on('end', function () {
                console.log('No more data in response.');
            });
        });
        
        req.on('error', function (e) {
            console.log('Problem with request:', e.message);
        });
        
        req.write(postData);
        req.end();
    }



    var insertEventNHL_check = function(qPlayers, propositions_name, thegreek_event_id, title, hour,  home_team,   home_money_ln,  away_team,  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition) {
        
    
       
        sql.execute( {
            procedure: "[dbo].[thegreek_insert_event_nhl_check]",
            params: {
                
                                qPlayers: {
                                    type: sql.int,
                                    val: qPlayers
                                },
                
                                propositions_name: {
                                    type: sql.VARCHAR(200),
                                    val: propositions_name
                                },
                                thegreek_event_id: {
                                    type: sql.INT,
                                    val: thegreek_event_id
                                },
                                home_team: {
                                    type: sql.VARCHAR(60),
                                    val: home_team
                                },
                                title: {
                                    type: sql.VARCHAR(60),
                                    val: title
                                },
                               
                                hour: {
                                    type: sql.VARCHAR(60),
                                    val: hour
                                },
                                 home_money_ln: {
                                    type: sql.int,
                                    val: home_money_ln
                                },
                                 
                                  away_team: {
                                    type: sql.VARCHAR(60),
                                    val: away_team
                                },
                                
                                away_money_ln: {
                                    type: sql.int,
                                    val: away_money_ln
                                    
                                },
                    
                               
                    
                                game_title: {
                                  type: sql.VARCHAR(60),
                                      val: game_title
                                    },
                
                
                                    option_3: {
                                        type: sql.VARCHAR(60),
                                            val: option_3
                                          },
                
                                          option_3_money_ln: {
                                            type: sql.int,
                                                val: option_3_money_ln
                                              },
                
                                              option_4: {
                                                type: sql.VARCHAR(60),
                                                    val: option_4
                                                  },
                        
                                                  option_4_money_ln: {
                                                    type: sql.int,
                                                        val: option_4_money_ln
                                                      },
                
                                                      note: {
                                                        type: sql.VARCHAR(60),
                                                            val: note
                                                          },
                
                
                                                          idProposition: {
                                                            type: sql.int,
                                                                val:idProposition
                                                              },
                    
                                  
                    
                    
                    
                            }
        } ).then( function( results ) {
            var ret= ( "Return:" + results ).replace('Return:,','');
           
            if (ret==0)
            {
                console.log(propositions_name, thegreek_event_id, title, game_title + " changed, inserting changes");
                insertEventNHL(qPlayers, propositions_name, thegreek_event_id, title, hour,  home_team,   home_money_ln,  away_team,  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition)

           

                var linetosend = {
                    
             
             
             
                     "u":"g8",
                      "p":"g8bridge",
                      "action": "setValue",   
                      "lid": "154",
                     "vml": away_money_ln,
                     "hml": home_money_ln ,
                     "ttl": '-9999' ,
                     "tov": '-9999' ,
                      "tun": '-9999' ,
                     "vsd": '-9999',
                      "vso": '-9999' ,
                       "hsd": '-9999' ,
                       "hso": '-9999' ,
                       "draw": '-9999', 
                       "eid": thegreek_event_id,
             
             
             
             }

                sendLine(linetosend,function(lineResult){
        console.log(lineResult);
});

            }
            else
            {
               
                return false
            }
        }, function( err ) {
            console.log( "Something bad happened:", err );
        } );
    
    
    
    
    
    
    
           
    
    
        
           
    
           
           
        };




var insertEventNHL = function(qPlayers, propositions_name, thegreek_event_id, title, hour,  home_team,   home_money_ln,  away_team,  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition) {
    

    






       


    
        

        return sql.execute( {
            procedure: "[dbo].[thegreek_insert_event_nhl]",
            params: {

                qPlayers: {
                    type: sql.int,
                    val: qPlayers
                },

                propositions_name: {
                    type: sql.VARCHAR(200),
                    val: propositions_name
                },
                thegreek_event_id: {
                    type: sql.INT,
                    val: thegreek_event_id
                },
                home_team: {
                    type: sql.VARCHAR(60),
                    val: home_team
                },
                title: {
                    type: sql.VARCHAR(60),
                    val: title
                },
               
                hour: {
                    type: sql.VARCHAR(60),
                    val: hour
                },
                 home_money_ln: {
                    type: sql.int,
                    val: home_money_ln
                },
                 
                  away_team: {
                    type: sql.VARCHAR(60),
                    val: away_team
                },
                
                away_money_ln: {
                    type: sql.int,
                    val: away_money_ln
                    
                },
    
               
    
                game_title: {
                  type: sql.VARCHAR(60),
                      val: game_title
                    },


                    option_3: {
                        type: sql.VARCHAR(60),
                            val: option_3
                          },

                          option_3_money_ln: {
                            type: sql.int,
                                val: option_3_money_ln
                              },

                              option_4: {
                                type: sql.VARCHAR(60),
                                    val: option_4
                                  },
        
                                  option_4_money_ln: {
                                    type: sql.int,
                                        val: option_4_money_ln
                                      },

                                      note: {
                                        type: sql.VARCHAR(60),
                                            val: note
                                          },


                                          idProposition: {
                                            type: sql.int,
                                                val:idProposition
                                              },
    
                  
    
    
    
            }
        } );
       
    };

    var createorExtractIdProposition = function(propositions_name) {
        
            return sql.execute( {
                procedure: "[dbo].[thegreek_createorExtractIdProposition]",
                params: {
                  
                    propositions_name: {
                        type: sql.VARCHAR(200),
                        val: propositions_name
                    },    
                }
            } ).then( function( results ) {
              
            }, function( err ) {
                console.log( "Something bad happened:", err );
            } );
           
        };


    var task = cron.schedule('*/5 * * * *', function(){
       
       readWebsites();
      });

      console.log('running task every 5 minutes. Actual time: ' + getDateTime());
      readWebsites();


      task.start();


function readWebsites()
{
    readNHLData('http://www.thegreek.com/sportsbook/bet/betting-odds/Baseball%20Propositions');
    readNHLData('http://www.thegreek.com/sportsbook/bet/betting-odds/Hockey%20Propositions');
}

function readNHLData(dirFile)
{
   

    var horseman = new Horseman();
    
    horseman
      .open(dirFile)
      .switchToFrame('content-frame')
      .html()
      .then(function(htmlText){
     
        horseman.close();


        fs.readFile('propositionsBaseball.html', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
        
            var dataHtml= (htmlText);
            
             let $= cheerio.load(dataHtml);
        
             
             jsonframe($); // initializes the plugin
        
        
        let frame1={
            
        
        "PROPOSITIONS":
        {
        
        
            "All":"*",
                    "Sub":"h1",
                   
            
                
             
                    "Games":{
                        "_s":".simpleContainer .simpleContainer",
                        "_d":[{
                
                            "MainMsg":"#MainMsg",
                            "Title": "H2",
                           
                            "idGame":".lines  @ id",
                            "id2":".lines [id]",
                
                            "Events":{
                                "_s":".table-container",
                                "_d":[{
                        
                                    "id":".lines  @ id[2]",
                                    "id2":".lines [id]",
                                               
                    
                                        "Lines":{
                                            "_s":".lines",
                                            "_d":[{
                                    
                                                "id":"div  @ id",
                                                "id":".table  @ id",
                                                "id3":"  [id]",
                                                "id4":"  #id",
                                                "id5":"  [attr=id]",
                                             
                                                           
                                                "Title": ".title",
                                                "Note":".props-table.props-bar",
                                            
                                                    "Players":{
                                                        "_s":".table",
                                                        "_d":[{
                                                            "id":".table  @ id",
                                                            "id5":"  [attr=id]",
                                                            "id":".lines  @ id",
                                                          
                                                            "id3":"  [id]",
                                                            "id4":"  #id",
                                                         
                                             
                                                        
                                                              "player":".has-lines .name",
                                                              "playerodds":".has-lines .odd ",
                                                                                                  
                                                
                                                        }]
                                                    }
        
                                                               
                                    
                                            }]
                                        }
        
        
                                }]
                            }
                        
                
                        }]
                    },
           
        
           
        
        }
        }
        
        
        
        
            
        var json=$('body').scrape(frame1, { string: true } );
         
        var json2= JSON.parse(json);
     var idProposition;

       // console.log(json2);
       //  console.log(json2.PROPOSITIONS.Games.Events)
          var values= [];
          
                
          console.log(getDateTime() + '... Analizying ' + dirFile + ' for updates...')
            var numPlayers=0;
        
            
            for( var Game in json2.PROPOSITIONS.Games) {   
                
                     
                for( var Events in json2.PROPOSITIONS.Games[Game].Events) {    
                   
        
                    for( var Lines in json2.PROPOSITIONS.Games[Game].Events[Events].Lines) {   
                        
                        eventId= json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].id;
                      
                        
                        for( var Players in json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players) {    
                            
                         
                                         
                                           numPlayers=numPlayers+1;
                                       
                                     }
        
                                     if (numPlayers==1)
                                     {
                                       
                                      
                                     }
                                     
                                     else
                                     idProposition = createorExtractIdProposition(json2.PROPOSITIONS.Sub);

                                     if (json2.PROPOSITIONS.Sub=="Hockey Propositions")
                                     {
                                        idProposition=1;
                                     }
                                     else
                                     if (json2.PROPOSITIONS.Sub=="Baseball Propositions")
                                     {
                                         idProposition=2;
                                     }

                                  //   console.log(idProposition);
                                     if (numPlayers==2)
                                     {
                                        insertEventNHL_check(2,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, json2.PROPOSITIONS.Games[Game].MainMsg, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Note, idProposition );
                                     }
                                     else
                                     if (numPlayers==3)
                                    {

                                        insertEventNHL_check(2,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, json2.PROPOSITIONS.Games[Game].MainMsg, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Note, idProposition );

                                      // insertEventNHL(3,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, json2.PROPOSITIONS.Games[Game].MainMsg, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, idProposition );
                                       
                                       
                                    }
                                    if (numPlayers==4)
                                    {
                                       
                                        insertEventNHL_check(2,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, json2.PROPOSITIONS.Games[Game].MainMsg, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Note, idProposition );
                                        //  insertEventNHL(4,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, json2.PROPOSITIONS.Games[Game].MainMsg, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].playerodds, idProposition );
                                      
                                      
                                    }
        
                                    numPlayers=0;
        
        
                        
                      }
        
                   
                 }
               
           }
        
            
            fs.writeFile('thegreek.json', JSON.stringify(json, null, 4), function(err) {
              //  console.log('Thegreek saved in theGreek.json file');
            });
        
            
           
        });

      });

    
    
    
    
}







 