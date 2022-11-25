'use strict';

const gameController={
    gameTitle:'GAME',
    gameScreen: $('#game-screen'),
    gameoverScreen:$('#gameover-screen'),
    playButton: $('#play-pause'),
    endGameButton:$('#end-game'),
    playScreen:$('#play-game'),
    isRunning:false,
    startGame: $('#start-button'),
    restartButton: $('#restart-game'),
    quitGameButton:$('#finish-game'),
    help:$('#dialog-opener'),
    activeScreen:'splash-screen',
    soundHit:$('audio-hit'),
    mysteryNumber:'',
    playerScore:0,
    playerLives:0,
    playerNameDisplay:$('#display-name'),
    playerJoin:$('player-join'),
    gameJoinButton:$('#game-join'),
    submitGuessButton:$('#submit-guess'),
    previousGuessField:$('#previousGuess'),
    
    
    

    

    //Has a method that switches the currently displayed screen
    currentGameScreen:function(currentScreen){
        $('.screen').hide();
        $(`#${currentScreen}`).show();
        gameController.activeScreen = currentScreen;
        if(gameController.activeScreen === 'splash-screen'){
        $('#dialog-opener').show();
        $('#quit-game').hide();
        
        
        }
        else if(gameController.activeScreen === 'game-screen'){
            $('#dialog-opener').show();
            $('#quit-game').show();
            
            
        }
        else if( gameController.activeScreen === 'gameover-screen'){
            $('#dialog-opener').hide();
            $('#quit-game').hide();
            
        }      
    },
    
    

    
    //Has a method to toggle game.isRunning
   
    toggleRunning: () => {
        

        gameController.isRunning =! gameController.isRunning;
        if (gameController.isRunning === true) {
            
            $(gameController.playButton).text('pause');
            document.getElementById('bg-audio').play();

            
            
            
        }
        else {
        $(gameController.playButton).text('Resume');
        $('#game-board').hide();
        document.getElementById('bg-audio').pause();
        

       

        };  
    },

    //start game toogle screen
    startGameMethod: () => {
        gameController.currentGameScreen('game-screen')
        $('#play-pause').on('click', gameController.startGame);
        document.getElementById('intro-bg-audio').play();
        
        
    },
    // play game method
    playGameMethod:()=>{
        if($('#player-name-input').val() === '' || $.isNumeric($('#player-name-input').val())) {
            return false;

        }else if(gameController.playerLives == 0){
            alert('Devil: Please select the level !!HOHAHAHA');

        }
        else{
        
        gameController.currentGameScreen('play-game')
        $('#game-join').on('click',gameController.playButton)
        document.getElementById('intro-bg-audio').pause();
         document.getElementById('bg-audio').play();
         
        }

    },


    //updatePlaternameMethod
    updatePlayerName:()=> {
        if ($('#player-name-input').val() === ''|| $.isNumeric($('#player-name-input').val()) ) {
            alert('Devil: Too scared to enter a name valid name!!HOHAHAHA');
            // gameController.currentGameScreen('play-game');
            
        }else{
        $('#display-name').text($('#player-name-input').val());
        }
    },
//    Open Game-board Method
    openGameBoard:()=>{

        if(gameController.isRunning != true ){


        
        $('play-pause').on('click',$('#game-board').css("display","block"));
        $('play-pause').on('click',$('#game-board').css("pointer-events","auto"));
        }else{
        $('play-pause').on('click',$('#game-board').css("pointer-events","none"));
        }


    },

    
   

    // creating mystery number
    mysteryNumberMethod:()=>{
        gameController.mysteryNumber = Math.floor(Math.random() * 101);
    },
    // Guessing - Game method
    playerGuessMethod:()=>{
        $('#player-guess').val();
        $('#previousGuess').css("display","none");
        

        if ($('#player-guess').val() < 0 || $('#player-guess').val() > 100) {
            alert("Please enter a number between 0 and 100");
            
        }else {
             if($('#player-guess').val() == gameController.mysteryNumber && $('#player-guess').val() != ''){
                document.getElementById('bg-audio').pause();
                document.getElementById('win-sound').play();
                


                $('#messages').text('Great Guess chief!!! we are finally free to go back to home');
                $('#game-board').css("pointer-events","none");
                alert("congratulations!!!");
                $(gameController.playButton).hide();
                gameController.playerScore++;
                document.getElementById("player-score").textContent = gameController.playerScore;
                $('#hello').css("display","none");
                gameController.isRunning = false;
           

            }else if($('#player-guess').val() > gameController.mysteryNumber && $('#player-guess').val() != '') {
                $('#messages').text('Your Number is too HIGH cheif!!!');
                gameController.playerLives--;
                document.getElementById("player-lives").textContent = gameController.playerLives;
                $('#previousGuess').after($('#player-guess').val());

                
            }else if($('#player-guess').val() < gameController.mysteryNumber && $('#player-guess').val() != '') {
                $('#messages').text('Your Number is too LOW cheif!!!');
                gameController.playerLives--;
                document.getElementById("player-lives").textContent = gameController.playerLives;
                const guessDiv = `<span>${$('#player-guess').val()}</span>`;
                $('#previousGuess').after(guessDiv,',');

            }else if($('#player-guess').val() == ''){
                alert('Please enter a Guess!!!');
                
            }else if(($('#hello').text()).replace(/[^0-9]/g,'').includes(($('#player-guess').val())) === true){
                
                alert("already guessed");
            }         
        
        }          

    },   

    //game-over method

    gameOverMethod:()=>{
        if(gameController.playerLives == 0){
            alert(`game-over!! The Correct Guess is ${gameController.mysteryNumber}  !!`);
            $(gameController.playButton).hide();
            gameController.currentGameScreen('gameover-screen');
            gameController.isRunning = false;
            gameController.currentGameScreen('gameover-screen');
            document.getElementById('bg-audio').pause();
            document.getElementById('game-over').play();



        }



    },
    
    

    
   
    //end game toggle screen
    endGameMethod:() =>{
        gameController.isRunning = false;
         gameController.currentGameScreen('gameover-screen');
         $('#restart-game').on('click',$('#end-game'));
         $('#game-board').css("display","none");
         document.getElementById('bg-audio').pause();
         $(gameController.playButton).text('play');
         $('#game-board').hide();
         


    },
    //playagain toggle screen
    
    playAgainMethod:() =>{
        gameController.currentGameScreen('game-screen')
        $('#play-pause').on('click',$('#restart-game'));
        document.getElementById('bg-audio').pause();
        document.getElementById('intro-bg-audio').play();
        document.getElementById('game-over').pause();
        $('#player-name-input').val('');
        $('#player-guess').val('');
        $('#hello').hide('');
        $('#play-pause').show();
        $('#game-board').hide();
        $('#player-score').text('0');
        gameController.playerScore = 0;
        $('#messages').text('');
        

        
        $('#play-pause').text('Play');
       
    },

    //quitgame method
    quitGameMethod:() =>{
         location.reload();
    },

    //Help button toggling:

    helpButton:() =>{
        if(gameController.activeScreen == 'splash-screen'){
            $('#dialog-example').text('This is the story mode.You are the cheif of the village. Your village members are captured by the monster.You need to guess the password to unlock the villagers.click on start game to start it!!!.').dialog({
                modal: true,
                
                    buttons: [{
                        text: "OK",
                        click: function() {
                        $( this ).dialog( "close" );
                        }
                    }
                    ],
                });
                $('#dialog-example').dialog();  
                $('#dialog-opener').button().on('click', () => {
                    $("#dialog-example" ).dialog( "open" );
            })

        }else if(gameController.activeScreen === 'play-game'){
            if( gameController.isRunning === false){
     
            $('#dialog-example').text('Guess the right number to unlock the villagers.You can end the game or click to play the game!!!').dialog({
                modal: true,
                
                    buttons: [{
                        text: "OK",
                        click: function() {
                        $( this ).dialog( "close" );
                        }
                    }
                    ],
                });
                $('#dialog-example').dialog();  
                $('#dialog-opener').button().on('click', () => {
                    $("#dialog-example" ).dialog( "open" );
                })

            }else{
                $('#dialog-example').text('You need to guess the number between 0-100 and it will tell you if you need high or low number.You can pause the game or end the game early.').dialog({
                    modal: true,
                    
                        buttons: [{
                            text: "OK",
                            click: function() {
                            $( this ).dialog( "close" );
                            }
                        }
                        ],
                    });
                    $('#dialog-example').dialog();  
                    $('#dialog-opener').button().on('click', () => {
                        $("#dialog-example" ).dialog( "open" );
                    })
            
        

            }
        }else if(gameController.activeScreen === 'game-screen'){
            $('#dialog-example').text('Please enter your name and select the difficulty level.Level 1 gives 7 guess attempt.Level 2 gives 5 guess attempt .Level 3 gives 4 guess attempt.').dialog({
                modal: true,
                
                    buttons: [{
                        text: "OK",
                        click: function() {
                        $( this ).dialog( "close" );
                        }
                    }
                    ],
                });
                $('#dialog-example').dialog();  
                $('#dialog-opener').button().on('click', () => {
                    $("#dialog-example" ).dialog( "open" );
                })
            

        }
          
            
            
         
    },

    //describing event listners

     
     init: function(){
            document.querySelector('h1').innerHTML = gameController.gameTitle;             
            gameController.currentGameScreen('splash-screen');
            gameController.startGame.on('click', gameController.startGameMethod);
            gameController.currentGameScreen('splash-screen');
            gameController.endGameButton.on('click',gameController.endGameMethod);
            gameController.currentGameScreen('splash-screen');
            gameController.playButton.on('click',gameController.openGameBoard);
            $('#easy-level').on('click',()=>{
                gameController.playerLives = 7;
                $('#player-lives').text('7');
            });
            $('#medium-level').on('click',()=>{
                gameController.playerLives = 5;
                $('#player-lives').text('5');
            });
            $('#hard-level').on('click',()=>{
                gameController.playerLives = 4;
                $('#player-lives').text('4');
            });
           gameController.gameJoinButton.on('click',gameController.updatePlayerName);
            gameController.submitGuessButton.on('click',gameController.playerGuessMethod);
            gameController.submitGuessButton.on('click',gameController.gameOverMethod);

            gameController.playButton.on('click',gameController.toggleRunning);
            gameController.restartButton.on('click',gameController.playAgainMethod);
            gameController.quitGameButton.on('click',gameController.quitGameMethod);
            gameController.help.on('click',gameController.helpButton);
            gameController.gameJoinButton.on('click',gameController.playGameMethod);
            gameController.gameJoinButton.on('click',gameController.mysteryNumberMethod);

        }, 

        



};
         



gameController.init();

