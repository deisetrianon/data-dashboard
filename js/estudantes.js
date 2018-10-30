$( document ).ready(function() {
  chooseSede();
  $('#select-sede-students').change(chooseTurma);
  $('#select-turma-students').change(dataStudents);
});

function chooseSede(){
  for (sede in data) {
    $('#select-sede-students').append(`
      <option value=${sede}>${sede}</option>
    `);
  }
}

function chooseTurma(){
  const selectTurma = document.getElementById('select-turma-students');
  selectTurma.options.length = 1;
  const selectedSede = $('#select-sede-students').val();
  const turmas = Object.keys(data[selectedSede]);
  for (turma in turmas) {
    $('#select-turma-students').append(`
      <option value=${turmas[turma]}>${turmas[turma]}</option>
    `);
  }
}

function dataStudents() {
  sede = $('#select-sede-students').val();
  turma = $('#select-turma-students').val();

  $('#studentsProfiles').html('');

  for (student of data[sede][turma]['students']) {
    for (sprint of student.sprints) {
      if (student.sprints.length !== 0) {
        var tech1 = student.sprints[0]['score']['tech'];
        var tech2 = student.sprints[1]['score']['tech'];
        var hse1 = student.sprints[0]['score']['hse'];
        var hse2 = student.sprints[1]['score']['hse'];
        if (student.sprints.length > 2) {
          var tech3 = student.sprints[2]['score']['tech'];
          var hse3 = student.sprints[2]['score']['hse'];
            if (student.sprints.length > 3) {
            var tech4 = student.sprints[3]['score']['tech'];
            var hse4 = student.sprints[3]['score']['hse'];
          }
        }
      }
    }

    tech1 = tech1 ? tech1 : "sem dados";
    tech2 = tech2 ? tech2 : "sem dados";
    tech3 = tech3 ? tech3 : "sem dados";
    tech4 = tech4 ? tech4 : "sem dados";
    hse1 = hse1 ? hse1 : "sem dados";
    hse2 = hse2 ? hse2 : "sem dados";
    hse3 = hse3 ? hse3 : "sem dados";
    hse4 = hse4 ? hse4 : "sem dados";

    $('#studentsProfiles').append(`
      <div class="profile-box">
        <p class="profile-name">${student.name}</p>
        <hr class="hr-data-title"></hr>
        <img class="profile-image" src="https://upload.wikimedia.org/wikipedia/commons/1/19/Gray_-_replace_this_image_female.svg" />
        <p class="description">
          ${student.active ? '<span class="active">ATIVA</span>' : '<span class="inactive">INATIVA</span>'}
        </p>
        <p class="profile-scores">
          <span class="description">PONTOS TECH</span>
          <br>
          <span class="profile-title">SPRINT 1: </span> ${tech1}
          <br>
          <span class="profile-title">SPRINT 2: </span> ${tech2}
          <br>
          <span class="profile-title">SPRINT 3: </span> ${tech3}
          <br>
          <span class="profile-title">SPRINT 4: </span> ${tech4}
        </p>
        <p class="profile-scores">
          <span class="description">PONTOS HSE</span>
          <br>
          <span class="profile-title">SPRINT 1: </span> ${hse1}
          <br>
          <span class="profile-title">SPRINT 2: </span> ${hse2}
          <br>
          <span class="profile-title">SPRINT 3: </span> ${hse3}
          <br>
          <span class="profile-title">SPRINT 4: </span> ${hse4}
        </p>
      </div>
    `);
  }
}