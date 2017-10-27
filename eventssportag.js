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


var config = {
    "host": "10.10.10.46",
     "user": "sportbookdba",
     "password": "lumalu",
     "database": "DonBest"
 };

sql.setDefaultConfig( config );


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


var insertEventNHL = function(qPlayers, propositions_name, sportsbookag_event_id, title, hour,  home_team,   home_money_ln,  away_team,  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition) {
   console.log("Printing from insertEventNHL:") 
    console.log(qPlayers, propositions_name, sportsbookag_event_id, title, hour, home_team,  home_money_ln, away_team,'',  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition )
   
        return sql.execute( {
            procedure: "[dbo].[sportsbookag_insert_event_nhl]",
            params: {

                qPlayers: {
                    type: sql.int,
                    val: qPlayers,
                    
                },

                propositions_name: {
                    type: sql.VARCHAR(300),
                    val: propositions_name
                },
                sportsbookag_event_id: {
                    type: sql.VARCHAR(200),
                    val: sportsbookag_event_id
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
                    type: sql.VARCHAR(60),
                    val: home_money_ln
                },
                 
                  away_team: {
                    type: sql.VARCHAR(60),
                    val: away_team
                },
                
                away_money_ln: {
                    type: sql.VARCHAR(60),
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
                            type: sql.VARCHAR(60),
                                val: option_3_money_ln
                              },

                              option_4: {
                                type: sql.VARCHAR(60),
                                    val: option_4
                                  },
        
                                  option_4_money_ln: {
                                    type: sql.VARCHAR(60),
                                        val: option_4_money_ln
                                      },

                                      note: {
                                        type: sql.VARCHAR(200),
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
        console.log('running a task every 5 minutes. Actual time: ' + getDateTime());
        readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-score-first.sbk');
        readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-first-score.sbk');
       readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-score-in-minutes.sbk');
       readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-longest-td.sbk');
       readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-points.sbk');
         readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/props-team-totals.sbk');
         readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/props-game-props.sbk');
        readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-score-first.sbk');
      });

      readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-score-first.sbk');
      readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-first-score.sbk');
     readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-score-in-minutes.sbk');
     readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-longest-td.sbk');
     readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-points.sbk');
       readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/props-team-totals.sbk');
       readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/props-game-props.sbk');
      readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-score-first.sbk');


      task.start();

function readDataFromWebsite(dirFile)
{


    var horseman = new Horseman();
    
    horseman
      .open(dirFile)
      .switchToFrame('content-frame')
      .html()
      .then(function(htmlText){
     
        horseman.close();


      
        
            var dataHtml= (htmlText);
            
             let $= cheerio.load(dataHtml);
        
             
             jsonframe($); // initializes the plugin
        
        
        let frame1={
            
            
        
        "PROPOSITIONS":
        {
          

                    "Category":".titleLabel",
                   
                    "Games":{
                        "_s":".col-sm-12.eventbox",
                        "_d":[{
                
                           "Game id":"#id",
                           "Game id2":"div.col-sm-12.eventbox#id",
                                "Time":"#time",   
                                
                                "Title":".row.event.eventheading",  
                                "Firstteam":"span#firstTeamName.team-title",  
                                "Secondteam":"span#secondTeamName.team-title", 
                                "Team1":".col-xs-3.col-md-6.col-lg-6 .team-title",
                                "Money":".column.money.pull-right",
                                "Spread":".column.spread.pull-right",
                                "Total":".column.total.pull-right",

                                "Team2":".col-xs-3.col-md-6.col-lg-6.team-title",
                                "Money2":".column.money.pull-right [1]",
                                "Spread2":".column.spread.pull-right [1]",
                                "Total2":".column.total.pull-right [1]",

                                "Id7":".column.total.pull-right#id",
                                "Id8":".column.total.pull-right #id",
                                "Id9":"a",
                                "idevent":"a @ id",
                                "Link":"a @ href",

                                "Event":{
                                    "Team1":"div.row",
                                    "_s":".col-xs-12",
                                    "_d":{
                                        "Team1Event":".team-title",
                                        "Money":".column.money.pull-right",
                                        "Spread":".column.spread.pull-right",
                                        "Total":".column.total.pull-right",
                                    }
                                    
                                },

                            "Events":{

                                "_s":".column.total.pull-right",

                                "_d":[{
                                     "Id":"#id",
                                    "Team":"#firstTeamName",
                                 "Hour":"#time",
                        //             "Title": ".col-xs-12",
                        //   "Name":".team-title",
                        //                         "Total":".column.money.pull-right",
                        //             "id":".lines  @ id[2]",
                        //             "id2":".lines [id]",
                                               
                    
                                        "Lines":{
                                            "_s":".row",
                                            "_d":[{
                                                "Name":".team-title",
                                                "Total":".column.money.pull-right",
                                              
                                                           
                                            
                                            
                                                    "Players":{
                                                        "_s":".row",
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


     var idProposition=1;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
 fs.writeFile(dirFile + ".json", JSON.stringify(json, null, 4), function(err) {
                console.log("file saved in " + dirFile + ".json file");
            });

      console.log("Games");  
        console.log(json2.PROPOSITIONS.Games);
       // console.log(json2.PROPOSITIONS.Games.Events)
      //  console.log(json2.PROPOSITIONS.Games.Id10.replace('moreBets',''));

//           var values= [];
          
                
             
            var numPlayers=0;
        
            
             for( var Game in json2.PROPOSITIONS.Games) {   
                
               
              
               
                                         insertEventNHL(2,dirFile, json2.PROPOSITIONS.Games[Game].idevent, json2.PROPOSITIONS.Games[Game].Title, json2.PROPOSITIONS.Games[Game].Time, json2.PROPOSITIONS.Games[Game].Secondteam,json2.PROPOSITIONS.Games[Game].Money[1], json2.PROPOSITIONS.Games[Game].Firstteam, json2.PROPOSITIONS.Games[Game].Money,  json2.PROPOSITIONS.Games[Game].Title, 'option3', 'option3ML', "option4 ", 'option4ML', 'NOTE', idProposition );
                                    
               
            }
        
            
      });

    
    
    
    
}







 