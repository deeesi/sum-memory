var numberOfCards = 5;
var $cardClicked1;
var $cardClicked2;
var fehlversuche = 0;
var paare = 0;
var sekundenSichtbarkeit = 2;
var clickEnabled = true;
var vergangeneZeit=0;
var myInterval;



function init(){
	myInterval = setInterval('time()',1000); // Sekundenweise hochzählen
}


$(document).ready( function() {
	
	$(".open-layer").click(function() {
      $('.start-button').fadeIn(500);
      $('.dimmer').fadeIn(500);
    });
    $(".close-layer").click(function() {
      $('.start-button').fadeOut(500);
      $('.dimmer').fadeOut(500);
    }); 
    $(".pause").click(function() {
    	clearInterval(myInterval);
    	myInterval = null;
    	$(this).parent().children(".play").show();
    	$(this).hide();
    });
    $(".play").click(function() {
    	if (!myInterval){
    		myInterval = setInterval('time()',1000);
    		$(this).parent().children(".pause").show();
    		$(this).hide();
    	}
    });
    $(".spiel-beenden-btn").click(function() {
    	$('.bubble').show();
    });
    $(".quit-true").click(function() {
    	$('.gewonnen').hide();
    });
    $(".quit-false").click(function() {
    	$('.bubble').hide();
    });
    $(".spiel-info-btn").click(function() {
    	$('.spiel-info').show();
    });
    $(".close-info").click(function() {
    	$('.spiel-info').hide();
    });
    
    
    
    
	
	
	$('.card').click(function(event){
		var that = this; /*sagt: that ist immer .card*/
		var firstCard;
		var secondCard;
		if ( !clickEnabled ) {
			return;
		}
		$(that).toggleClass('card-rueck');
		if (!$cardClicked1){
			/*Wenn noch keine Karte geklickt wurde, decke auf*/
			$cardClicked1 = $(that);
			$cardClicked1.find('img').fadeIn('fast');
			$cardClicked1.find('.aufgabe1').show().css("display", "block");
		} else {
			$cardClicked2 = $(that);
			$cardClicked2.find('img').fadeIn('fast');
			$cardClicked2.find('.summe1').show().css("display", "block");
			firstCard = $cardClicked1.attr('data-type');
			secondCard = $cardClicked2.attr('data-type');
			
			if ($cardClicked1.get(0) != $cardClicked2.get(0)){
				if(firstCard == secondCard){
					/*Pärchen: Karten ausblenden und das Click Event wegnehmen*/
					var c1 = $cardClicked1;
					var c2 = $cardClicked2;
					setTimeout( function(){
						c1.fadeTo('fast', 0.2);
						c2.fadeTo('fast', 0.2);	
					}, sekundenSichtbarkeit*1000 );
					
					$cardClicked1.addClass('found');
					$cardClicked2.addClass('found');
					$cardClicked1.off('click');
					$cardClicked2.off('click');
					paare += 1;
					$('.paareNum').html(paare);
					
					if( paare == numberOfCards ){
						/*wenn "Paare = Anzahl der Karten", dann gewonnen*/
						clearInterval(myInterval);
						$('.dimmer').fadeIn(500);
						$('.gewonnen').fadeIn(500);
						$('.endZeit').html(vergangeneZeit);
					}
					/*Klickversuche zurückstellen*/
					$cardClicked1 = null;
					$cardClciked2 = null;
					
				} else{
					/*Fehlversuch hochzählen und Karten wieder umdrehen*/
					fehlversuche += 1;
					$('.fehlversucheNum').html(fehlversuche);
					clickEnabled = false;
					setTimeout(flipCardsBack, sekundenSichtbarkeit*1000);
					
				}
				
				
			}
	
		}
	});
});


var zufallszahl1;
var zufallszahl2;
var summe;
var aufgabe1;
zufallszahl1 = getRandom(1,99);
zufallszahl2 = getRandom(1,99);
summe1 = zufallszahl1 + zufallszahl2;
aufgabe1 = zufallszahl1 + " + " + zufallszahl2;

$('.aufgabe1').html(aufgabe1);
$('.summe1').html(checkSumSmallerHundret());

// Zufallszahlen zwischen min und max erzeugen
function getRandom(min, max) {
	 if(min > max) {
	  return -1;
	 } 
	 if(min == max) {
	  return min;
	 }
	 var r;
	 do {
	  r = Math.random();
	 }
	 while(r == 1.0);
	 return min + parseInt(r * (max-min+1));
}

// Wenn die Summe, nur 2stellig ist, häng eine 0 davor
function checkSumSmallerHundret() {
	if (summe1 < 100) {
		return "0" + summe1;
	} else {
		return summe1;
	}
}

// Sekundenzähler
function time() {
	vergangeneZeit++;
	document.timer.time.value= vergangeneZeit+" sek.";
}

// Falsche Paare wieder umdrehen
function flipCardsBack(){
	$cardClicked1.find('img').fadeOut('fast');
	$cardClicked2.find('img').fadeOut('fast');
	/*Klickevent wieder aktivieren*/
	clickEnabled = true;
	/*Klickversuche zurückstellen*/
	$cardClicked1 = null;
	$cardClciked2 = null;
}


/*Mit Button das Spiel starten*/
$(".start-button").click(init);
