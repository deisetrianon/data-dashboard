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
    var profileBox = document.createElement("div");
    var names = data[sede][turma]['students'][i]['name'];
    var img = document.createElement("img");
    var photoStudents = data[sede][turma]['students'][i]['photo'];
    img.setAttribute('src', photoStudents);

    profileBox.innerHTML = names;
    profileBox.appendChild(img);
    profileBox.setAttribute('class', 'profileBox');
    studentsProfiles.appendChild(profileBox);
  }

}