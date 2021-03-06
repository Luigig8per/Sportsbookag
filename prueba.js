USE [DonBest]
GO
/****** Object:  StoredProcedure [dbo].[sportsbookag_insert_event_nhl]    Script Date: 10/26/2017 4:05:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sportsbookag_insert_event_nhl]
	
	@sportsbookag_event_id INT,
	@title varchar(60),
  	@propositions_name varchar(200),
    @home_team varchar(60),
  
    @hour varchar(60),
	@home_money_ln varchar(200),
	
	  @away_team varchar(60), 
	 
	  @away_money_ln varchar(200),
	
	  @game_title varchar(60),
	  @option_3 varchar(60),
	  @option_3_money_ln int,
	  @option_4 varchar (60),
	  @option_4_money_ln int,
	  @qPlayers int,
	  @note varchar(60),
	  @idProposition int


	

	
AS
BEGIN
--SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
--BEGIN TRANSACTION
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @id AS INT;
	declare @id2 as int

	SELECT @id = id_sportsbookag_event FROM sportsbookag_event WHERE id_sportsbookag_event=@sportsbookag_event_id

	IF @id IS NULL
    BEGIN
       if (@qPlayers=4)
	   BEGIN
	Insert into sportsbookag_event(id_sportsbookag_event, propositions_name, title,hour, home_team,   home_money_ln, away_team, away_money_ln,  time_received, game_title, option_3, option_3_money_ln, option_4, option_4_money_ln, note, id_proposition) values (@sportsbookag_event_id, @propositions_name, @title,  @hour, @home_team, @home_money_ln,  @away_team, @away_money_ln, GETDATE(), @game_title, @option_3, @option_3_money_ln, @option_4, @option_4_money_ln, @note, @idProposition)
	Insert into sportsbookag_event_history_temp(id_sportsbookag_event, home_team,   home_money_ln,  away_team, away_money_ln,  time_received,  option_3, option_3_money_ln, option_4, option_4_money_ln) values (@sportsbookag_event_id,  @home_team, @home_money_ln,  @away_team, @away_money_ln, GETDATE(),  @option_3, @option_3_money_ln, @option_4, @option_4_money_ln)
	end
	else 
	if (@qPlayers=3)
	begin

	Insert into sportsbookag_event(id_sportsbookag_event, propositions_name,title,hour, home_team,   home_money_ln,  away_team, away_money_ln,  time_received, game_title, option_3, option_3_money_ln, note, id_proposition) values (@sportsbookag_event_id, @propositions_name, @title,  @hour, @home_team, @home_money_ln,  @away_team, @away_money_ln,   GETDATE(), @game_title, @option_3, @option_3_money_ln,@note, @idProposition)
	Insert into sportsbookag_event_history_temp(id_sportsbookag_event, home_team,   home_money_ln, away_team, away_money_ln, time_received, option_3, option_3_money_ln) values (@sportsbookag_event_id,  @home_team, @home_money_ln,  @away_team, @away_money_ln,   GETDATE(), @option_3, @option_3_money_ln)
	end
	else
	if (@qPlayers=2)
	begin

	Insert into sportsbookag_event(id_sportsbookag_event,propositions_name, title,hour, home_team,   home_money_ln,away_team, away_money_ln, time_received, game_title, note, id_proposition ) values (@sportsbookag_event_id, @propositions_name, @title,  @hour, @home_team, @home_money_ln,  @away_team, @away_money_ln,  GETDATE(), @game_title, @note, @idProposition)
	Insert into sportsbookag_event_history_temp(id_sportsbookag_event, home_team,   home_money_ln,away_team, away_money_ln, time_received ) values (@sportsbookag_event_id,   @home_team, @home_money_ln,  @away_team, @away_money_ln, GETDATE())

	end
    END
	ELSE
	BEGIN

	SELECT @id2 = id_sportsbookag_event FROM sportsbookag_event_history_temp WHERE (id_sportsbookag_event=@sportsbookag_event_id) and (home_team=@home_team) and  (home_money_ln=@home_money_ln) and (away_team=@away_team) and  (away_money_ln=@away_money_ln) 

	--SELECT @id2 = id_sportsbookag_event FROM sportsbookag_event_history_temp WHERE (id_sportsbookag_event=@sportsbookag_event_id) and (home_team=@home_team) and  (home_money_ln=@home_money_ln) and (away_team=@away_team) and  (away_money_ln=@away_money_ln) and  (option_3=@option_3) and (option_3_money_ln=@option_3_money_ln) and (option_4=@option_4) and (option_4_money_ln=@option_4_money_ln) 


	IF @id2 IS NULL
	begin
       if (@qPlayers=4)
	Insert into sportsbookag_event_history_temp(id_sportsbookag_event, home_team,   home_money_ln,away_team, away_money_ln,time_received,  option_3, option_3_money_ln, option_4, option_4_money_ln) values (@sportsbookag_event_id,    @home_team, @home_money_ln, @away_team, @away_money_ln,  GETDATE(), @option_3, @option_3_money_ln, @option_4, @option_4_money_ln)
	else 
	if (@qPlayers=3)
	Insert into sportsbookag_event_history_temp(id_sportsbookag_event,home_team,   home_money_ln, away_team, away_money_ln, time_received,option_3, option_3_money_ln) values (@sportsbookag_event_id,  @home_team, @home_money_ln, @away_team, @away_money_ln, GETDATE(), @option_3, @option_3_money_ln)
	else
	if (@qPlayers=2)
	Insert into sportsbookag_event_history_temp(id_sportsbookag_event, home_team,   home_money_ln,away_team, away_money_ln, time_received) values (@sportsbookag_event_id,  @home_team, @home_money_ln, @away_team, @away_money_ln,  GETDATE())
    END
	end
-- COMMIT TRANSACTION


end