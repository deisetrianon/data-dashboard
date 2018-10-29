var selectSede = document.getElementById("select-sede-students");
var selectTurma = document.getElementById("select-turma-students");

window.onload = chooseSede();

function chooseSede(){
  var option1 = document.createElement("option");
  option1.innerHTML = "Selecione uma sede";
  option1.value = "none";
  selectSede.appendChild(option1);
  var option2 = document.createElement("option");
  option2.innerHTML = "Selecione uma turma";
  option2.value = "none";
  selectTurma.appendChild(option2);
  for (sede in data) {
    var itemMenu = document.createElement("option");
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
    var itemMenu2 = document.createElement("option");
    itemMenu2.value = turmas[turma];
    itemMenu2.innerHTML = turmas[turma];
    selectTurma.appendChild(itemMenu2);
  }
}

selectSede.addEventListener("change", chooseTurma);
selectTurma.addEventListener("change", dataStudents);

function dataStudents() {
  sede = selectSede.value;
  turma = selectTurma.value;

  var studentsProfiles = document.getElementById("studentsProfiles");
  studentsProfiles.innerHTML = "";

  for (i in data[sede][turma]['students']) {
    /* Cria a div que vai receber as informações das alunas */
    var profileBox = document.createElement("div");
    profileBox.setAttribute('class', 'profile-box');

    /* Insere o nome da aluna */
    var names = document.createElement("p");
    names.innerHTML = data[sede][turma]['students'][i]['name'] + '<hr class="hr-data-title"></hr>';
    names.setAttribute('class', 'profile-name');

    /* Insere as imagens das alunas */
    var img = document.createElement("img");
    var photoStudents = data[sede][turma]['students'][i]['photo'];
    img.setAttribute('src', photoStudents);
    img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/1/19/Gray_-_replace_this_image_female.svg');
    img.setAttribute('class', 'profile-image');

    /* Insere o status das alunas */
    var status = document.createElement("p");
    status.setAttribute('class', 'description');
    if (data[sede][turma]['students'][i]['active'] === true) {
      status.innerHTML = '<span class="active">ATIVA</span>';
    } else {
      status.innerHTML = '<span class="inactive">INATIVA</span>';
    }

    for (j in data[sede][turma]['students'][i]['sprints']) {
      if (data[sede][turma]['students'][i].sprints.length !== 0) {
        var tech1 = data[sede][turma]['students'][i]['sprints'][0]['score']['tech'];
        var tech2 = data[sede][turma]['students'][i]['sprints'][1]['score']['tech'];
        var hse1 = data[sede][turma]['students'][i]['sprints'][0]['score']['hse'];
        var hse2 = data[sede][turma]['students'][i]['sprints'][1]['score']['hse'];
        if (data[sede][turma]['students'][i].sprints.length > 2) {
          var tech3 = data[sede][turma]['students'][i]['sprints'][2]['score']['tech'];
          var hse3 = data[sede][turma]['students'][i]['sprints'][2]['score']['hse'];
            if (data[sede][turma]['students'][i].sprints.length > 3) {
            var tech4 = data[sede][turma]['students'][i]['sprints'][3]['score']['tech'];
            var hse4 = data[sede][turma]['students'][i]['sprints'][3]['score']['hse'];
          }
        }
      }
    }

    tech1 = tech1?tech1:"sem dados";
    tech2 = tech2?tech2:"sem dados";
    tech3 = tech3?tech3:"sem dados";
    tech4 = tech4?tech4:"sem dados";
    hse1 = hse1?hse1:"sem dados";
    hse2 = hse2?hse2:"sem dados";
    hse3 = hse3?hse3:"sem dados";
    hse4 = hse4?hse4:"sem dados";
    
    var sprintsTech = document.createElement("p");
    sprintsTech.innerHTML = '<span class="description">PONTOS TECH</span>' + '<br>' + '<span class="profile-title">SPRINT 1: </span>' + tech1 + '<br>' + '<span class="profile-title">SPRINT 2: </span>' + tech2 + '<br>' + '<span class="profile-title">SPRINT 3: </span>' + tech3 + '<br>' + '<span class="profile-title">SPRINT 4: </span>' + tech4;
    sprintsTech.setAttribute('class', 'profile-scores');

    var sprintsHse = document.createElement("p");
    sprintsHse.innerHTML = '<span class="description">PONTOS HSE</span>' + '<br>' + '<span class="profile-title">SPRINT 1: </span>' + hse1 + '<br>' + '<span class="profile-title">SPRINT 2: </span>' + hse2 + '<br>' + '<span class="profile-title">SPRINT 3: </span>' + hse3 + '<br>' + '<span class="profile-title">SPRINT 4: </span>' + hse4;
    sprintsHse.setAttribute('class', 'profile-scores');

    profileBox.appendChild(names);
    profileBox.appendChild(img);
    profileBox.appendChild(status);
    profileBox.appendChild(sprintsTech);
    profileBox.appendChild(sprintsHse);
    studentsProfiles.appendChild(profileBox);
  }
}