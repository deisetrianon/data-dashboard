$( document ).ready(function() {
  chooseSede();
  $('#select-sede').change(chooseTurma);
  $('#select-turma').change(dataGeral);
});

function chooseSede(){
  for (sede in data) {
    $('#select-sede').append(`
      <option value=${sede}>${sede}</option>
    `);
  }
}

function chooseTurma(){
  const selectTurma = document.getElementById('select-turma');
  selectTurma.options.length = 1;
  const selectedSede = $('#select-sede').val();
  const turmas = Object.keys(data[selectedSede]);
  for (turma in turmas) {
    $('#select-turma').append(`
      <option value=${turmas[turma]}>${turmas[turma]}</option>
    `);
  }
}

function dataGeral() {
  sede = $('#select-sede').val();
  turma = $('#select-turma').val();

  /* Cálculo do número total de estudantes por sede e geração e a porcentagem de estudantes desistentes */
  for (students in data[sede][turma]) {
    var students = data[sede][turma].students;
    var quitterStudents = students.filter(x => !x.active).length;

    $('#studentsCounter').html(`
      ${students.length} 
      <br> 
      <span class="info-text">  NÚMERO DE ESTUDANTES</span>
    `);

    $('#enrollment').attr('class', 'data-box');
    
    $('#enrollmentTitle').html(`
      REGISTRO
      <hr class="hr-data-title"></hr>
    `);

    $('#quitterPercentage').html(`
      ${Math.round(quitterStudents * 100 / students.length)}%
      <br>
      <span class="info-text">  % DE DESISTÊNCIAS</span>
    `);
  }

  /* Cálculo do número de alunas que excedem a meta de pontos, em média, de todos os sprints e a sua porcentagem */
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

    $('#averageStudents').html(`
      ${averageStudents}
      <br>
      <span class="info-text">NÚMERO DE ESTUDANTES</span>
    `);

    $('#achievement').attr('class', 'data-box');

    $('#achievementTitle').html(`
      ALCANCES
      <hr class="hr-data-title"></hr>
      <span class="description">ESTUDANTES QUE ATINGEM A META DE PONTOS EM TODOS OS SPRINTS</span>
    `);

    $('#averageStudentsPercentage').html(`
      ${Math.round((averageStudents * 100 / students.length))}%
      <br>
      <span class="info-text">% DO TOTAL (${students.length})</span>
    `)
  }

  /* Cálculo do NPS */
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

  $('#totalNps').html(`
    ${Math.round(npsCount / ratings.length)}%
    <br>
    <span class="info-text">% NPS CUMULATIVO</span>
  `);

  $('#specificNps').html(`
    <span class="info-text">
      ${Math.round(promoters / ratings.length)}% PROMOTERS
      <br>
      ${Math.round(passive / ratings.length)}% PASSIVE
      <br>
      ${Math.round(detractors / ratings.length)}% DETRACTORS
    </span>
  `);

  $('#nps').attr('class', 'data-box');

  $('#npsTitle').html(`
    NET PROMOTER SCORE (NPS)
    <hr class="hr-data-title"></hr>
    <span class="description">RECOMENDAÇÃO DAS ESTUDANTES PERANTE À LABORATORIA</span>
    <br>
    <span class="description">(NPS MÉDIO DOS SPRINTS)</span>
  `);

  /* Percentual médio de satisfação das estudantes */
  $('#satisfaction').attr('class', 'data-box');

  $('#satisfactionTitle').html(`
    MÉDIA DE SATISFAÇÃO DAS ESTUDANTES
    <hr class="hr-data-title"></hr>
    <span class="description">ESTUDANTES SATISFEITAS COM A EXPERIÊNCIA DA LABORATORIA <br> (CUMPRE, SUPERA OU NÃO CUMPRE ÀS EXPECTATIVAS)</span>
  `);

  $('#satisfactionPercentage').html(`
    <span class="sprint">CUMPRE = </span>
    ${Math.round((cumple / ratings.length))}%
    <br>
    <span class="sprint">SUPERA = </span> 
    ${Math.round((supera / ratings.length))}%
    <br>
    <span class="sprint">NÃO CUMPRE = </span>
    ${Math.round((noCumple / ratings.length))}%
  `);

  /* Pontuação média dos mentores */
  $('#mentores').attr('class', 'data-box');

  $('#mentoresTitle').html(`
    PONTUAÇÃO MÉDIA DE MENTORES
    <hr class="hr-data-title"></hr>
  `);

  $('#scoreMentores').html(`
    ${(mentores / ratings.length).toFixed(1)}
    <br>
    <span class="info-text">PONTUAÇÃO MÁXIMA: 5.0</span>
  `);

  /* Pontuação média dos mestres Jedi */
  $('#jedi').attr('class', 'data-box');

  $('#jediTitle').html(`
    PONTUAÇÃO MÉDIA DE JEDI'S
    <hr class="hr-data-title"></hr>
  `);

  $('#scoreJedi').html(`
    ${(jedi / ratings.length).toFixed(1)}
    <br>
    <span class="info-text">PONTUAÇÃO MÁXIMA: 5.0</span>
  `);

  /* A quantidade e porcentagem que representa o total de alunas que excedem a meta de pontos de HSE em média e sprint */
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

  $('#hseNumber').html(`
    <span class="sprint">SPRINT 1 = </span> 
    ${studentsHseSprint[0]}
    <br>
    <span class="sprint">SPRINT 2 = </span>
    ${studentsHseSprint[1]}
    <br>
    <span class="sprint">SPRINT 3 = </span>
    ${studentsHseSprint[2]}
    <br>
    <span class="sprint">SPRINT 4 = </span>
    ${studentsHseSprint[3]}
    <br>
    <span class="info-text">NÚMERO DE ESTUDANTES</span>
  `);
  
  $('#hsePercentage').html(`
    <span class="sprint">SPRINT 1 = </span>
    ${Math.round(studentsHseSprint[0] * 100 / students.length)}%
    <br>
    <span class="sprint">SPRINT 2 = </span>
    ${Math.round(studentsHseSprint[1] * 100 / students.length)}%
    <br>
    <span class="sprint">SPRINT 3 = </span>
    ${Math.round(studentsHseSprint[2] * 100 / students.length)}%
    <br>
    <span class="sprint">SPRINT 4 = </span>
    ${Math.round(studentsHseSprint[3] * 100 / students.length)}%
    <br>
    <span class="info-text">% DE ESTUDANTES</span>
  `);

  $('#hseScores').attr('class', 'data-box');

  $('#hseTitle').html(`
    ESTUDANTES QUE EXCEDEM A META DE HSE
    <hr class="hr-data-title"></hr>
  `);

  
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
  
  $('#techNumber').html(`
    <span class="sprint">SPRINT 1 = </span>
    ${studentTechSprint[0]}
    <br>
    <span class="sprint">SPRINT 2 = </span>
    ${studentTechSprint[1]}
    <br>
    <span class="sprint">SPRINT 3 = </span>
    ${studentTechSprint[2]}
    <br>
    <span class="sprint">SPRINT 4 = </span>
    ${studentTechSprint[3]}
    <br>
    <span class="info-text">NÚMERO DE ESTUDANTES</span>
  `);

  $('#techPercentage').html(`
    <span class="sprint">SPRINT 1 = </span>
    ${Math.round(studentTechSprint[0] * 100 / students.length)}%
    <br>
    <span class="sprint">SPRINT 2 = </span>
    ${Math.round(studentTechSprint[1] * 100 / students.length)}%
    <br>
    <span class="sprint">SPRINT 3 = </span>
    ${Math.round(studentTechSprint[2] * 100 / students.length)}%
    <br>
    <span class="sprint">SPRINT 4 = </span>
    ${Math.round(studentTechSprint[3] * 100 / students.length)}%
    <br>
    <span class="info-text">% DE ESTUDANTES</span>
  `);

  $('#techScores').attr('class', 'data-box');

  $('#techTitle').html(`
    ESTUDANTES QUE EXCEDEM A META TECH
    <hr class="hr-data-title"></hr>
  `);
}