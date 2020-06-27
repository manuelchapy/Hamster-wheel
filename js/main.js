var _userData;
var _gameID = 999;
var loadingScreen;
var _tokensToPlay = 1;
var gameJSONs = gameJsons;
var startScreen;
var balance;
var gameplay
var feeding
var isMuted = false;
var feedingButton;
var startSong, gameplaySong, feedSong, hit, feeding, sid1, sid2;
var i = 0; i2= 0;
var degrees = [-60, -45, -30, -15, 4, 20, 35, 50, 65, 83];

function init(){
    startSong = document.getElementById('startSong');
    gameplaySong = document.getElementById('gameplaySong');
    hit = document.getElementById('hit');
    feedSong = document.getElementById('feedSong');
    feeding = document.getElementById('feeding');
    sid1 = document.getElementById('sid1');
    sid2 = document.getElementById('sid2');
    sid3 = document.getElementById('sid3');
    sid4 = document.getElementById('sid4');
    sid5 = document.getElementById('sid5');
    sid6 = document.getElementById('sid6');
    sid7 = document.getElementById('sid7');
    sid8 = document.getElementById('sid8');
    sid9 = document.getElementById('sid10');
    sid10 = document.getElementById('sid10');

    startSong.loop = true
    startSong.play()

$('.layer').css({
	    height: ($('.layer').width() * 720 / 720) + "px", 
        maxHeight: window.innerHeight + "px",
        maxWidth: ($(window).height() * 720 / 720) + "px"
    })

    $('.super-container').css({
        maxWidth: ($(window).height() * 720 / 720) + "px"
    })

        $.ajax({
        type: "POST", 
        url: "https://everesttest.snowfly.com/gameapi/v1/getStartInfo", 
        data: { gameId: _gameID },
        success: function( data ) {
           _userData = data;
            gameJSONs.balance.layers[0].t.d.k[0].s.t = _userData.pointBalance+"";
            gameJSONs.balance.layers[1].t.d.k[0].s.t = _userData.tokenBalance+"";
            var balanceAnim = bodymovin.loadAnimation(balance)
           if (_userData.tokenBalance == 0){ 
                $('#no-tokens-screen').css({display: 'block', zIndex: 999}) 
           }
              if(_userData.status == 0){
                $('#t-s').text(_userData.message)
                $('#no-server-request').fadeIn()
                }
        }
    });

    $('#loading-screen').fadeOut()
        
        var startScreen = {
        container: document.getElementById("start-screen"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.startScreen
    }
    var startScreenAnim = bodymovin.loadAnimation(startScreen)
    startScreenAnim.play()

    $('.sound-toggle').click(function(){
        hit.play()
        isMuted = !isMuted
        setSoundSettings()
    })

        var startButton = {
        container: document.getElementById("start-button"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.startButton
    }
    var startButtonAnim = bodymovin.loadAnimation(startButton)
    startButtonAnim.play()

    if(window.location.href.match("no-init") != null){
        isMuted = (getParameterByName('isMuted') == 'true');
        setSoundSettings()
        startButtonAnim.playSegments([1, 10], true)
        $('#init-screen').fadeOut(function(){
            setupInitLayers()
        })
    }

        $('#start-button').click(function(){
        $(this).addClass('disabled')
        hit.play()
        $('#bar').css({zIndex: 112})
        startButtonAnim.playSegments([26, 36], true)
        startButtonAnim.play()
        $('#start-screen').fadeOut(function(){
            $('#s-layer').addClass('disabled')
            $('#start-button').fadeOut()
            setupInitLayers()
        })
    })

    $('.draggable').draggable({ 
        axis: "x",
        containment: "#bar",
        start: function() {
            updateDraggableValue($('.draggable').css('left'))
        },
        drag: function() {
            updateDraggableValue($('.draggable').css('left'))
        },
        stop: function() {
            updateDraggableValue($('.draggable').css('left'))
        }
    });

    $('#bar').click(function(e){
        var distanceA = ($('body').width()/2) - ($('.layer').width()/2)
        var distanceB = ($('.layer').width()/2) - ($('#token-ui').width()/2)
        var distanceC = ($('#token-ui').width()/2) - ($('#bar').width()/2)
        var value = e.clientX - (distanceA + distanceB + distanceC) - ($('.draggable').width()/2)
        $('.draggable').css({left: value})
        updateDraggableValue($('.draggable').css('left'))
    })
}

function updateDraggableValue(val){
    var value = parseInt(val)
    var barWidth = $('#bar').width() - $('.draggable').width()
    var newVal = value * 250 / barWidth
    
    if(newVal > 250){ 
        newVal = 250
    }

    if(newVal < 1) newVal = 1
    if(newVal > _userData.tokenBalance) newVal = _userData.tokenBalance
    _tokensToPlay = parseInt(newVal)
    $('#tokens-amount').text(parseInt(newVal))
}


function setupInitLayers(){
    var playButton = {
        container: document.getElementById("play-button"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: {"v":"4.10.1","fr":24,"ip":0,"op":12,"w":250,"h":100,"nm":"Play_B","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"PLAY","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-31.506,325.509,0],"ix":2},"a":{"a":0,"k":[2.079,-69.7,0],"ix":1},"s":{"a":0,"k":[111.016,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[4.198,0],[0,0],[0,0],[0,0],[0,0],[0,0],[-1.967,1.542],[0,3.319],[1.927,1.594]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[4.065,0],[1.966,-1.542],[0,-3.319],[-1.927,-1.594]],"v":[[-38.451,-83.401],[-47.955,-83.401],[-47.955,-56],[-43.282,-56],[-43.282,-64.036],[-38.372,-64.036],[-29.323,-66.349],[-26.373,-73.64],[-29.264,-81.01]],"c":true},"ix":2},"nm":"P","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[2.587,0],[0,0],[0,0],[0,0],[-1.188,-0.784],[0,-1.894],[0.937,-0.98]],"o":[[0,0],[0,0],[0,0],[2.534,0],[1.188,0.784],[0,1.895],[-0.937,0.98]],"v":[[-37.857,-68.23],[-43.282,-68.23],[-43.282,-79.206],[-38.53,-79.206],[-32.947,-78.03],[-31.165,-74.012],[-32.57,-69.7]],"c":true},"ix":2},"nm":"P","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"P","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-3.564,-56],[-3.564,-60.39],[-16.196,-60.39],[-16.196,-83.401],[-20.869,-83.401],[-20.869,-56]],"c":true},"ix":2},"nm":"L","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"L","np":2,"cix":2,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[19.325,-62.233],[22.097,-56],[27.086,-56],[14.89,-83.401],[9.9,-83.401],[-2.297,-56],[2.693,-56],[5.465,-62.233]],"c":true},"ix":2},"nm":"A","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[7.366,-66.506],[12.395,-77.795],[17.424,-66.506]],"c":true},"ix":2},"nm":"A","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"A","np":3,"cix":2,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[41.817,-66.819],[52.113,-83.401],[47.005,-83.401],[39.441,-70.935],[31.878,-83.401],[26.769,-83.401],[37.065,-66.819],[37.065,-56],[41.817,-56]],"c":true},"ix":2},"nm":"Y","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Y","np":2,"cix":2,"ix":4,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Mask","parent":4,"td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-28.263,325.749,0],"ix":2},"a":{"a":0,"k":[-28.263,325.749,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[249.102,71.856],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":20,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":2,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-28.263,325.749],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Circle","parent":4,"tt":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.51],"y":[1]},"o":{"x":[0.49],"y":[0]},"n":["0p51_1_0p49_0"],"t":0,"s":[0],"e":[33]},{"i":{"x":[0.51],"y":[1]},"o":{"x":[0.49],"y":[0]},"n":["0p51_1_0p49_0"],"t":4.714,"s":[33],"e":[0]},{"t":12}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-28.263,324.21,0],"ix":2},"a":{"a":0,"k":[-5,7,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.51,0.51,0.51],"y":[1,1,1]},"o":{"x":[0.49,0.49,0.49],"y":[0,0,0]},"n":["0p51_1_0p49_0","0p51_1_0p49_0","0p51_1_0p49_0"],"t":1.571,"s":[0,0,100],"e":[215.777,265.571,100]},{"t":10}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[140,140],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-5,7],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Button","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[127,84.467,0],"ix":2},"a":{"a":0,"k":[-28.263,361.677,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":0,"s":[90.077,100,100],"e":[83,92.143,100]},{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":5,"s":[83,92.143,100],"e":[90.077,100,100]},{"t":11}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[249.102,71.856],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":55,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.305499147901,0.580392156863,0.184359860888,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.117647058824,0.780392156863,0.36862745098,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-28.263,325.749],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Button 2","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-28.263,331.774,0],"ix":2},"a":{"a":0,"k":[-28.263,325.749,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":0,"s":[100.426,100.426,100],"e":[92.536,92.536,100]},{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":5,"s":[92.536,92.536,100],"e":[100.426,100.426,100]},{"t":11}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[249.102,71.856],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":55,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.305499147901,0.580392156863,0.184359860888,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.011626296885,0.494117647059,0.195029434503,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-28.263,325.749],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0}]}
    }
    var playButtonAnim = bodymovin.loadAnimation(playButton);
    playButtonAnim.playSegments([0, 2], true);

        $('#play-button').click(function(){
        $(this).addClass('disable')
        playButtonAnim.play()
        playButtonAnim.playSegments([3, 13], true);
        $('#init-animations').fadeOut();
        hit.play()
    })

    $('#play-button').click(function(){
        playButtonAnim.playSegments([3, 13], true)
        $(this).addClass('disabled')
        hit.play()

        $.ajax({
            type: "POST", 
            url: "https://everesttest.snowfly.com/gameapi/v1/playGame", 
            data: { tokens: _tokensToPlay, gameId: _gameID },
            success: function( data ) {

                startSong.pause()
                
                playID = data.playId
                //playID = 10;
                __tokensResponse = data;
                //console.log(playID);
                //console.log(__tokensResponse.totalPoints);
                        setUpFeeding()
    
            }
        }); 
    })
}

function setUpFeeding(){
    //console.log("feeding");
        feedSong = document.getElementById('feedSong');
        feedSong.play()
        feedingButton = {
            container: document.getElementById("feeding-button"),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            rendererSettings: {
                progressiveLoad:false
            },

            animationData: gameJSONs.feedButton
        }

        var feedButtonPlayAnim = bodymovin.loadAnimation(feedingButton);
        //feedButtonPlayAnim.play();

        feeding = {
            container: document.getElementById("feeding-screen"),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            rendererSettings: {
                progressiveLoad:false
            },

            animationData: gameJSONs.hamsterFeeding
        }
        var feedingplayAnim = bodymovin.loadAnimation(feeding);
        
    $('#feeding-button').click(function(){
        feeding = document.getElementById('feeding');
        feeding.play()
        hit.play()
        //hit.play()
        feedButtonPlayAnim.playSegments([1, 7], true)
        feedingplayAnim.play()
        setTimeout(function(){
            if(i2==0){
                $('#feeding-screen').fadeOut();
                $('#feeding-button').fadeOut();
                setUpWinning()
            }
        },6000)
    })

}

function setUpWinning(){
    i2 = 1;

    gameplaySong.play()

    gameJSONs.gamePlay.assets[1].layers[0].ef[playID-1].ef[0].v.k = 1
    gameJSONs.gamePlay.assets[15].layers[1].t.d.k[0].s.t = _userData.tokenBalance+"";
    gameJSONs.gamePlay.assets[15].layers[0].t.d.k[0].s.t = _userData.pointBalance+"";;
    gameJSONs.gamePlay.layers[0].ef[playID-1].ef[0].v.k = 1;
    gameJSONs.gamePlay.assets[1].layers[2].t.d.k[0].s.t = __tokensResponse.totalPoints+"";
    gameJSONs.gamePlay.assets[1].layers[1].t.d.k[0].s.t  = _tokensToPlay+"";
    


    gameJSONs.gamePlay.layers[49].ks.r.k[8].s = [degrees[playID - 1]];
    if(playID == 1){ sid1.play(); /*console.log('salio 1')*/}
    if(playID == 2){ sid2.play(); /*console.log('salio 2')*/}
    if(playID == 3){ sid3.play(); /*console.log('salio 3')*/}
    if(playID == 4){ sid4.play(); /*console.log('salio 4')*/}
    if(playID == 5){ sid5.play(); /*console.log('salio 5')*/}
    if(playID == 6){ sid6.play(); /*console.log('salio 6')*/}
    if(playID == 7){ sid7.play(); /*console.log('salio 7')*/}
    if(playID == 8){ sid8.play(); /*console.log('salio 8')*/}
    if(playID == 9){ sid9.play(); /*console.log('salio 9')*/}
    if(playID == 10){ sid10.play(); /*console.log('salio 10')*/}
            gameplay = {
        container: document.getElementById("gameplay"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.gamePlay
     }

        var gameplayAnim = bodymovin.loadAnimation(gameplay)
        gameplayAnim.play();
        setTimeout(function(){
            $('#play-again').css({zIndex: 999})
        },8000)
        
        playAgain()

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function setSoundSettings() {
    if(!isMuted) {$('.sound-toggle').attr('src','./assets/img/sound_on.png')}
    else {$('.sound-toggle').attr('src','./assets/img/sound_off.png')}

    startSong.volume    = (isMuted) ? 0 : 1
    feedSong.volume  = (isMuted) ? 0 : 1
    hit.volume         = (isMuted) ? 0 : 1
    feeding.volume         = (isMuted) ? 0 : 1
    gameplaySong.volume         = (isMuted) ? 0 : 1
    sid1.volume         = (isMuted) ? 0 : 1
    sid2.volume          = (isMuted) ? 0 : 1
    sid3.volume          = (isMuted) ? 0 : 1
    sid4.volume          = (isMuted) ? 0 : 1
    sid5.volume          = (isMuted) ? 0 : 1
    sid6.volume          = (isMuted) ? 0 : 1
    sid7.volume          = (isMuted) ? 0 : 1
    sid8.volume          = (isMuted) ? 0 : 1
    sid9.volume          = (isMuted) ? 0 : 1
    sid10.volume          = (isMuted) ? 0 : 1
}


function playAgain(){
    $('#play-again').click(function(){
                $(this).addClass('disabled')
                hit.play()
                setTimeout(function(){
                    var mainURL = location.protocol + '//' + location.host + location.pathname
                    window.location.href = mainURL+ "?no-init=true&isMuted=" + isMuted
                    $('#s-layer').hide();

                },500)
            }) 
}



function loading(){

	balance = {
        container: document.getElementById("balance"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.balance
    }

     var loadingScreen = {
        container: document.getElementById("loading-screen"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.loadingScreen
    }
    var loadingScreenAnim = bodymovin.loadAnimation(loadingScreen)
    loadingScreenAnim.play();

    setTimeout(function(){

        init();

    },1000)

}