var selectSede = document.getElementById('select-sede');
var selectTurma = document.getElementById('select-turma');

window.onload = chooseSede();

function chooseSede(){
  var option1 = document.createElement('option');
  option1.innerHTML = 'Selecione uma sede';
  option1.value = 'none';
  selectSede.appendChild(option1);
  var option2 = document.createElement('option');
  option2.innerHTML = 'Selecione uma turma';
  option2.value = 'none';
  selectTurma.appendChild(option2);
  for (sede in data) {
    var itemMenu = document.createElement('option');
    itemMenu.value = sede;
    itemMenu.innerHTML = sede;
    selectSede.appendChild(itemMenu);
  }
}

function chooseTurma(){
  selectTurma.options.length = 1;
  var selectedSede = selectSede.value;
  var turmas = Object.keys(data[selectedSede]);
  for (turma in turmas) {
    var itemMenu2 = document.createElement('option');
    itemMenu2.value = turmas[turma];
    itemMenu2.innerHTML = turmas[turma];
    selectTurma.appendChild(itemMenu2);
  }
}

selectSede.addEventListener('change', chooseTurma);
selectTurma.addEventListener('change', dataGeral);


function dataGeral() {
  sede = selectSede.value;
  turma = selectTurma.value;

  /* Calcula o número total de estudantes por sede e geração */
  for (students in data[sede][turma]) {
    var students = data[sede][turma].students;
    var studentsCounter = document.getElementById('studentsCounter');
    studentsCounter.innerHTML = students.length + '<br>' + '<span class="info-text">  NÚMERO DE ESTUDANTES</span>';
    var enrollment = document.getElementById('enrollment');
    enrollment.setAttribute('class', 'data-box');
    var enrollmentTitle = document.getElementById('enrollmentTitle');
    enrollmentTitle.innerHTML = 'REGISTRO' + '<hr class="hr-data-title"></hr>';
  }

  /* Calcula a porcentagem de estudantes desistentes */
  var quitter = 0;
  for (i in data[sede][turma]["students"]) {
    if (students[i].active === false) {
      quitter++;
      var quitterPercentage = parseInt((quitter * 100 / students.length));
    }
    var quitterCounter = document.getElementById("quitterPercentage");
    quitterCounter.innerHTML = quitterPercentage + '%' + '<br>' + '<span class="info-text">  % DE DESISTÊNCIAS</span>';
  }


  /* Calcula o número de alunas que excedem a meta de pontos, em média, de todos os sprints*/
  var array = [];
  for (var i = 0; i < students.length; i++) {
    var techTotal = 0;
    var hseTotal = 0;
    if (students[i].active === true) {
      var sprint = students[i].sprints.length;
      for (var j = 0; j < sprint; j++) {
        var tech = students[i].sprints[j].score.tech;
        techTotal = techTotal + tech;
        var hse = students[i].sprints[j].score.hse;
        hseTotal = hseTotal + hse;
      }
      var hseAverage = hseTotal / sprint;
      var techAverage = techTotal / sprint;
  
      array.push([techAverage, hseAverage]);
      var averageStudents = 0;
      for (var k = 0; k < array.length; k++) {
        if (array[k][0] > 1260 && array[k][1] > 840) {
          averageStudents++;
        }
      }
    }
    var result = document.getElementById('averageStudents');
    result.innerHTML = averageStudents + '<br>' + ' <span class="info-text">NÚMERO DE ESTUDANTES</span>';
    var achievement = document.getElementById('achievement');
    achievement.setAttribute('class', 'data-box');
    var achievementTitle = document.getElementById('achievementTitle');
    achievementTitle.innerHTML = 'ALCANCES' + '<hr class="hr-data-title"></hr>' + '<span class="description">ESTUDANTES QUE ATINGEM A META DE PONTOS EM TODOS OS SPRINTS</span>';
   
    /* Porcentagem que representa os dados anteriores em relação ao total de alunas*/ 
    var averageStudentsPercentage = parseInt((averageStudents * 100 / students.length));
    var final = document.getElementById('averageStudentsPercentage');
    final.innerHTML = averageStudentsPercentage + '%' + '<br>' + '<span class="info-text">% DO TOTAL ' + '(' + students.length + ')</span>';
  }

  /* Cálculo do NPS médio total */
  var ratings = data[sede][turma].ratings;
  var npsCount = 0;
  var promoters = 0;
  var passive = 0;
  var detractors = 0;
  var cumple = 0;
  var supera = 0;
  var noCumple = 0;
  var mentores = 0;
  var jedi = 0;

  for (var i = 0; i < ratings.length; i++) {
    var subtraction = ratings[i]['nps']['promoters'] - ratings[i]['nps']['detractors'];
    npsCount = npsCount + subtraction;
    promoters = promoters + ratings[i]['nps']['promoters'];
    passive = passive + ratings[i]['nps']['passive'];
    detractors = detractors + ratings[i]['nps']['detractors'];
    
    cumple = cumple + ratings[i]['student']['cumple'];
    supera = supera + ratings[i]['student']['supera'];
    noCumple = noCumple +  ratings[i]['student']['no-cumple'];

    mentores = mentores + ratings[i]['teacher'];
    jedi = jedi + ratings[i]['jedi'];
  }
  var resultTotal = parseInt(npsCount/ratings.length);
  
  /* Cálculo do NPS médio específico */
  var resultPromoters = parseInt(promoters/ratings.length);
  var resultPassive = parseInt(passive/ratings.length);
  var resultDetractors = parseInt(detractors/ratings.length);

  var totalNps = document.getElementById('totalNps');
  totalNps.innerHTML = resultTotal + '%' + '<br>' + '<span class="info-text">% NPS CUMULATIVO</span>';
  var specificNps = document.getElementById('specificNps');
  specificNps.innerHTML = '<span class="info-text">' + resultPromoters + '%' + ' PROMOTERS' + '<br>' + resultPassive + '%' + ' PASSIVE' + '<br>' + resultDetractors + '%' + ' DETRACTORS' + '</span>';

  var nps = document.getElementById('nps');
  nps.setAttribute('class', 'data-box');
  var npsTitle = document.getElementById('npsTitle');
  npsTitle.innerHTML = 'NET PROMOTER SCORE (NPS)' + '<hr class="hr-data-title"></hr>' + '<span class="description">RECOMENDAÇÃO DAS ESTUDANTES PERANTE À LABORATORIA</span>' + '<br>' + '<span class="description">(NPS MÉDIO DOS SPRINTS)</span>';

  /* Percentual médio de satisfação das estudantes */
  var satisfaction = document.getElementById('satisfaction');
  satisfaction.setAttribute('class', 'data-box');
  var satisfactionTitle =  document.getElementById('satisfactionTitle');
  satisfactionTitle.innerHTML = 'MÉDIA DE SATISFAÇÃO DAS ESTUDANTES' + '<hr class="hr-data-title"></hr>' + '<span class="description">ESTUDANTES SATISFEITAS COM A EXPERIÊNCIA DA LABORATORIA <br> (CUMPRE, SUPERA OU NÃO CUMPRE ÀS EXPECTATIVAS)</span>';
  var satisfactionPercentage = document.getElementById('satisfactionPercentage');
  satisfactionPercentage.innerHTML = '<span class="sprint">CUMPRE = </span>' + parseInt((cumple/ratings.length)) + '%' + '<br>' + '<span class="sprint">SUPERA = </span>' + parseInt((supera/ratings.length)) + '%' + '<br>' + '<span class="sprint">NÃO CUMPRE = </span>' + parseInt((noCumple/ratings.length)) + '%';


  /* Pontuação média dos mentores */
  var totalMentores = mentores/ratings.length;
  var mentores = document.getElementById('mentores');
  mentores.setAttribute('class', 'data-box');
  var mentoresTitle =  document.getElementById('mentoresTitle');
  mentoresTitle.innerHTML = 'PONTUAÇÃO MÉDIA DE MENTORES' + '<hr class="hr-data-title"></hr>';
  var scoreMentores = document.getElementById('scoreMentores');
  scoreMentores.innerHTML = totalMentores.toFixed(1) + '<br>' + '<span class="info-text">PONTUAÇÃO MÁXIMA: 5.0</span>';

  /* Pontuação média dos mestres Jedi */
  var totalJedi = jedi/ratings.length;
  var jedi = document.getElementById('jedi');
  jedi.setAttribute('class', 'data-box');
  var jediTitle =  document.getElementById('jediTitle');
  jediTitle.innerHTML = "PONTUAÇÃO MÉDIA DE JEDI'S" + '<hr class="hr-data-title"></hr>';
  var scoreJedi = document.getElementById('scoreJedi');
  scoreJedi.innerHTML = totalJedi.toFixed(1) + '<br>' + '<span class="info-text">PONTUAÇÃO MÁXIMA: 5.0</span>';

  /*A quantidade e porcentagem que representa o total de alunas que excedem a meta de pontos de HSE em média e sprint*/
  var studentsHseSprint = [0, 0, 0, 0];
  
  for (var s = 0; s < students.length; s++) {
    var student = students[s];
    var studentSprints = student.sprints;

    for (var t = 0; t < studentSprints.length; t++) {
      var sprint = studentSprints[t];
    
      if (sprint.score.hse > 840) {
        studentsHseSprint[t] =  studentsHseSprint[t] + 1;
      }
    } 
  }

  var total = document.getElementById('hseNumber');
  total.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + studentsHseSprint[0] + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + studentsHseSprint[1] + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + studentsHseSprint[2] + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + studentsHseSprint[3] + '<br>' + '<span class="info-text">NÚMERO DE ESTUDANTES</span>';

  var totalPercentage = document.getElementById('hsePercentage');
  totalPercentage.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + parseInt(studentsHseSprint[0] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + parseInt(studentsHseSprint[1] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + parseInt(studentsHseSprint[2] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + parseInt(studentsHseSprint[3] * 100 / students.length) + '%' + '<br>' + '<span class="info-text">% DE ESTUDANTES</span>';

  var hseScores = document.getElementById('hseScores');
  hseScores.setAttribute('class', 'data-box');
  var hseTitle =  document.getElementById('hseTitle');
  hseTitle.innerHTML = 'ESTUDANTES QUE EXCEDEM A META DE HSE' + '<hr class="hr-data-title"></hr>';

  
  /*A quantidade e porcentagem que representa o total de alunas que excedem a meta de pontos técnicos em média e sprint*/
  var studentTechSprint = [0, 0, 0, 0];
  
  for (var s = 0; s < students.length; s++) {
    var student = students[s];
    var studentSprints = student.sprints;

    for (var t = 0; t < studentSprints.length; t++) {
      var sprint = studentSprints[t];
    
      if (sprint.score.tech > 1260) {
        studentTechSprint[t] = studentTechSprint[t] + 1;
      }
    } 
  }
  
  var totalTech = document.getElementById('techNumber');
  totalTech.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + studentTechSprint[0] + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + studentTechSprint[1] + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + studentTechSprint[2] + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + studentTechSprint[3] + '<br>' + '<span class="info-text">NÚMERO DE ESTUDANTES</span>';

  var totalPercentageTech = document.getElementById('techPercentage');
  totalPercentageTech.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + parseInt(studentTechSprint[0] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + parseInt(studentTechSprint[1] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + parseInt(studentTechSprint[2] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + parseInt(studentTechSprint[3] * 100 / students.length) + '%' + '<br>' + '<span class="info-text">% DE ESTUDANTES</span>';

  var techScores = document.getElementById('techScores');
  techScores.setAttribute('class', 'data-box');
  var techTitle =  document.getElementById('techTitle');
  techTitle.innerHTML = 'ESTUDANTES QUE EXCEDEM A META TECH' + '<hr class="hr-data-title"></hr>';
}

console.log(data);
