/*
 * =====================================
 * Scripts
 * =====================================
 */

$(document).ready(function() {
  var hasStarted = false;
  $('#startButton').click(function() {
    if (hasStarted) {
      return;
    }
    hasStarted = true;

    $('.welcome').addClass('fadeOut');
    setTimeout(() => {
      $('.is-start').removeClass('is-start');
      draw();
    }, 500);
  });

  function draw() {
    wavesurferA.drawer.containerWidth =
      wavesurferA.drawer.container.clientWidth;
    wavesurferA.drawBuffer();
    wavesurferB.drawer.containerWidth =
      wavesurferB.drawer.container.clientWidth;
    wavesurferB.drawBuffer();
  }

  /*
		 * =====================================
		 * Contrôle des sons
		 * =====================================
		 */

  // -------------------------------------------
  // Préparation de l'affichage du signal son A
  var wavesurferA = WaveSurfer.create({
    container: '#waveformA',
    waveColor: '#102B3F',
    progressColor: '#006494',
    normalize: 'true',
    cursorWidth: 1,
    barWidth: 2,
    barHeight: 10
  });

  $mask = $('.mask');
  $listening = $('#listening');

  // Chargement du son A
  wavesurferA.load('sons/SequenceA.mp3');
  var $butA = $('#butplayA');
  // Clic à deux états sur bouton A
  $butA.funcToggle(
    'click',
    function() {
      // Premier clic
      $butA.text('Pause');
      $listening.addClass('playing');
      wavesurferA.play();

      $mask.fadeIn(500, function() {});
    },
    function() {
      // Deuxième clic

      $listening.removeClass('playing');
      $butA.text('Play');
      wavesurferA.pause();
      $mask.fadeOut(500, function() {});
    }
  );

  // Affichage de la barre de progression du son A
  wavesurferA.on('audioprocess', function() {
    // Calcul du pourcentage d'avancée du son
    var tempsEcoule = wavesurferA.getCurrentTime();
    var dureeTotale = wavesurferA.getDuration();
    var pourcentage = map_range(tempsEcoule, 0, dureeTotale, 0, 100);
  });

  wavesurferA.on('finish', function() {
    $butA.click();
    wavesurferA.stop();
  });

  // -------------------------------------------
  // Préparation de l'affichage du signal son B
  var wavesurferB = WaveSurfer.create({
    container: '#waveformB',
    waveColor: '#214F4B',
    progressColor: '#25A18E',
    normalize: 'true',
    cursorWidth: 1,
    barWidth: 2,
    barHeight: 10
  });

  // Chargement du son B
  wavesurferB.load('sons/SequenceB.mp3');

  var $butB = $('#butplayB');
  // Clic à deux états sur bouton B
  $butB.funcToggle(
    'click',
    function() {
      // Premier clic
      $butB.text('Pause');

      $listening.addClass('playing');
      $mask.fadeIn(500, function() {
        wavesurferB.play();
      });
    },
    function() {
      // Deuxième clic
      $butB.text('Play');
      wavesurferB.pause();

      $listening.removeClass('playing');
      $mask.fadeOut(500, function() {});
    }
  );

  wavesurferB.on('finish', function() {
    $butB.click();
    wavesurferB.stop();
  });

  // Affichage de la barre de progression du son B
  wavesurferB.on('audioprocess', function() {
    // Calcul du pourcentage d'avancée du son
    var tempsEcoule = wavesurferB.getCurrentTime();
    var dureeTotale = wavesurferB.getDuration();
    var pourcentage = map_range(tempsEcoule, 0, dureeTotale, 0, 100);
  });

  // --------------------------------------
  // En cas de redimensionnement
  $(window).resize(function() {
    draw();
  });

  $('#want-more-title').click(function() {
    $('#want-more-title').toggleClass('up');
    $('#want-more').slideToggle('fast');
  });

  $('#wait-title').click(function() {
    $('#wait-title').toggleClass('up');
    $('#wait-block').slideToggle('fast');
  });
});
