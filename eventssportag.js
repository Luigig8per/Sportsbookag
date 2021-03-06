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
   console.log("Doing insert:") 
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


    var insertEventcHECK = function(qPlayers, propositions_name, sportsbookag_event_id, title, hour,  home_team,   home_money_ln,  home_sp,home_total, away_team,  away_money_ln , away_sp,away_total, game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition) {
        console.log("Doing check:") 
        console.log(qPlayers, propositions_name, sportsbookag_event_id, title, hour, home_team,  home_money_ln, away_team,'',  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition )
        
             return sql.execute( {
                 procedure: "[dbo].[sportsbookag_insert_event__check]",
                 params: {
     
                     qPlayers: {
                         type: sql.int,
                         val: qPlayers,
                         
                     },
     
                     propositions_name: {
                         type: sql.VARCHAR(300),
                         val: propositions_name
                     },
                     sportbookag_event_id: {
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
             } ).then( function( results ) {
                var ret= ( "Return:" + results )
               
                if (ret==0)
                {
                    console.log(propositions_name, thegreek_event_id, title, game_title + " changed, inserting changes");
                  //  insertEventNHL(qPlayers, propositions_name, thegreek_event_id, title, hour,  home_team,   home_money_ln,  away_team,  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition)
    
               
    
                //     var linetosend = {
                        
                 
                 
                 
                //          "u":"g8",
                //           "p":"g8bridge",
                //           "action": "setValue",   
                //           "lid": "154",
                //          "vml": away_money_ln,
                //          "hml": home_money_ln ,
                //          "ttl": '-9999' ,
                //          "tov": '-9999' ,
                //           "tun": '-9999' ,
                //          "vsd": '-9999',
                //           "vso": '-9999' ,
                //            "hsd": '-9999' ,
                //            "hso": '-9999' ,
                //            "draw": '-9999', 
                //            "eid": thegreek_event_id,
                 
                 
                 
                //  }
    
    //                 sendLine(linetosend,function(lineResult){
    //         console.log(lineResult);
    // });
    
                }
                else
                {
                    console.log('Event ' + sportsbookag_event_id + 'already exists')
                    return false
                }
            }, function( err ) {
                console.log( "Something bad happened:", err );
                console.log(qPlayers, propositions_name, sportsbookag_event_id, title, hour, home_team,  home_money_ln, away_team,'',  away_money_ln , game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, idProposition )
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
       readWebSites();
      });

      readWebSites();


      task.start();



function readWebSites()
{
   
    readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-score-first.sbk');
    readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-first-score.sbk');
   readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-score-in-minutes.sbk');
   readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-longest-td.sbk');
   readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-points.sbk');
     readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/props-team-totals.sbk');
     readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/props-game-props.sbk');
    readDataFromWebsite('https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/props-team-score-first.sbk');
}

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
            "Type":".panel-heading.clearfix .titleLabel",
            "Main":".col-sm-12.eventbox",
           
            "mainline":{
                 "_s":".col-sm-12.eventbox",
                 "_d":[{
                    "time":"#time",
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

console.log(json2.PROPOSITIONS);
     console.log('Analizying ' + dirFile + 'for updates');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
 fs.writeFile(dirFile + ".json", JSON.stringify(json, null, 4), function(err) {
            
            });

    
                
             
            var numPlayers=0;
        
            for (var mainLiness in json2.PROPOSITIONS.mainline)
            {
              
                for( var EachLines in json2.PROPOSITIONS.mainline[mainLiness].EachLine) {   
                    
                 var idEvent= json2.PROPOSITIONS.mainline[mainLiness].idevent;
                // console.log("idEvent inicial:" + idEvent);
                    if (idEvent.includes("moreBets"))
                    {
                 idEvent= idEvent.replace('moreBets','')
                //    console.log("idevent replaced:" +idEvent.replace('moreBets',''))
                   }
                   
                //     console.log("idevent replaced:" + idevent)
                
                insertEventcHECK(2,dirFile, idEvent, json2.PROPOSITIONS.mainline[mainLiness].Title, json2.PROPOSITIONS.mainline[mainLiness].time,json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[3].Secondteam,json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[3].Money,json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[3].Spread, json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[3].Total, json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[1].Firstteam,json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[1].Money, json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[1].Spread, json2.PROPOSITIONS.mainline[mainLiness].EachLine[EachLines].Dirline[1].Total, json2.PROPOSITIONS.mainline[mainLiness].Title, 'option3', 'option3ML', "option4 ", 'option4ML', 'NOTE', '1');


                   var link = json2.PROPOSITIONS.mainline[mainLiness].Link;
                   link=link.replace('./getrelated/','https://www.sportsbook.ag/sbk/sportsbook4/nfl-betting/getrelated/');
                

                   readDataFromWebsite(link);
    
            }
            }
          
           
            
      });

    
    
    
    
}







 