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


var insertEventNHL = function(qPlayers, propositions_name, sportsbookag_event_id, title, hour,  home_team,   home_money_ln,  home_sp,home_total, away_team,  away_money_ln , away_sp,away_total, game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition) {
   console.log("Printing from insertEventNHL:") 
    console.log(qPlayers, propositions_name, sportsbookag_event_id, title, hour, home_team,  home_money_ln, away_team,'',  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition )
   
        return sql.execute( {
            procedure: "[dbo].[sportsbookag_insert_event_sp_tot]",
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

                home_sp: {
                    type: sql.VARCHAR(60),
                    val: home_sp
                },

                home_total: {
                    type: sql.VARCHAR(60),
                    val: home_total
                },
                 
                  away_team: {
                    type: sql.VARCHAR(60),
                    val: away_team
                },
                
                away_money_ln: {
                    type: sql.VARCHAR(60),
                    val: away_money_ln
                    
                },
    
                away_sp: {
                    type: sql.VARCHAR(60),
                    val: away_sp
                },

                away_total: {
                    type: sql.VARCHAR(60),
                    val: away_total
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

            "Main":".col-sm-12.eventbox",
            "mainline":{
                 "_s":".col-sm-12.eventbox",
                 "_d":[{
                    "Title":".row.event.eventheading",  
                   
                    "idevent":"a @ id",
                    "Link":"a @ href",

                  
        
                        "Each line":"div.col-xs-12.col-md-9.col-lg-9.eventrow",
                        "EachLine":{
                            "_s":".col-xs-12.col-md-9.col-lg-9.eventrow",
                            "_d":[{
        
        
                        "Gametitle":".row",
                        "Dirline":{
                            "_s":"div.row",
                            "_d":[{
                                "Title":".row.event.eventheading",  
                                "Firstteam":"span#firstTeamName.team-title",  
                                "Secondteam":"span#secondTeamName.team-title",
                                "Team:":".team-title",
                                "Team1":".col-xs-3.col-md-6.col-lg-6 .team-title",
                                "Money":".column.money.pull-right",
                                "Spread":".column.spread.pull-right",
                                "Total":".column.total.pull-right",
        
                                "Id7":".column.total.pull-right#id",
                                "Id8":".column.total.pull-right #id",
                                "Id9":"a",
                                "idevent":"a @ id",
                                "Link":"a @ href",
                            }]
                        },
        
                    }]
                    }

                 }

                 ]   
            },
          
           
        
        }
        }
        
        
        
        
            
        var json=$('body').scrape(frame1, { string: true } );
         
        var json2= JSON.parse(json);


     var idProposition=1;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
 fs.writeFile(dirFile + ".json", JSON.stringify(json, null, 4), function(err) {
                console.log("file saved in " + dirFile + ".json file");
            });

    //         console.log("Events"); 
    //  console.log(json2.PROPOSITIONS.EventSelected.Teams);
    
        console.log("Propositions");
      console.log(json2.PROPOSITIONS)

     //console.log("EachLine");
     //console.log(json2.PROPOSITIONS.EachLine)

    //  console.log("DirLine");
    //  console.log(json2.PROPOSITIONS.EachLine.Dirline)
      //  console.log(json2.PROPOSITIONS.Games.Id10.replace('moreBets',''));

//           var values= [];
          
                
             
            var numPlayers=0;
        
            for (var mainLiness in json2.PROPOSITIONS.mainline)
            {
                console.log("Mainline number " + mainLiness)
                for( var EachLines in json2.PROPOSITIONS.mainline[mainLiness].EachLine) {   
                    
                   console.log("EachLines number: " + EachLines);
                   console.log(json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines]);
                    for( var Dirlinen in json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline) {  
    
                        console.log("Dirline number: " + Dirlinen);
                      //  insertEventNHL(2,dirFile, json2.PROPOSITIONS.Games[Game].idevent, json2.PROPOSITIONS.Gametitle, json2.PROPOSITIONS.Games[Game].Time, '2ndteam','2ndtml','2ndtSP', '2ndtTotal', json2.PROPOSITIONS.Games[Game].Firstteam, json2.PROPOSITIONS.Games[Game].Money, json2.PROPOSITIONS.Games[Game].Spread, json2.PROPOSITIONS.Games[Game].Total, json2.PROPOSITIONS.Games[Game].Title, 'option3', 'option3ML', "option4 ", 'option4ML', 'NOTE', idProposition );
                        console.log(2,dirFile, json2.PROPOSITIONS.mainline[mainLiness].idevent, json2.PROPOSITIONS.mainline[mainLiness].Title, 'Time', json2.PROPOSITIONS.mainline[mainLiness].Title,'2ndtml','2ndtSP', '2ndtTotal', 'Firstteam', 'Money', 'Spread', 'Total', 'Title', 'option3', 'option3ML', "option4 ", 'option4ML', 'NOTE', idProposition)
                        console.log("Dirline number:" + Dirlinen) 
                  console.log("Dirline" + Dirlinen)
                  console.log("Away team:");
                  console.log(json2.PROPOSITIONS.EachLine[EachLines].Dirline[1].Team);
                  console.log("Away money:");
                  console.log(json2.PROPOSITIONS.EachLine[EachLines].Dirline[1].Money);
                 //  console.log(2,dirFile, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].idevent,json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Title, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Time, '2ndteam','2ndtml','2ndtSP', '2ndtTotal', json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Firstteam, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Money, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Spread, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLine].Dirline[Dirlinen].Total, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLine].Dirline[Dirlinen].Title, 'option3', 'option3ML', "option4 ", 'option4ML', 'NOTE', idProposition )
                           console.log("Each dirline : " + Dirlinen)   
                           console.log( console.log(json2.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen]))             
                                            // console.log("Team:" + json2.PROPOSITIONS.Dirline[Dirlinen].Link.replace('./','https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/'));
                                            console.log("Money:")
                                           console.log(json2.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Money)
                                                console.log(json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Money, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLines].Dirline[Dirlinen].Spread, json2.PROPOSITIONS.PROPOSITIONS.EachLine[EachLine].Dirline[Dirlinen].Total)
    
                                    //  //     setTimeout( readDataFromWebsite(json2.PROPOSITIONS.Games[Game].Link.replace('./','https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/')) 
                                              
                                    //       , 200);
                   
                }
    
            }
            }
          
           
            
      });

    
    
    
    
}







 