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
    profileBox.style = " align-self: center; width: 700px; height: auto; background-color: white; margin: 20px; border: 1px solid rgb(209, 209, 209); padding: 10px;";

    /* Insere o nome da aluna */
    var names = document.createElement("p");
    names.innerHTML = data[sede][turma]['students'][i]['name'] + '<hr class="hr-data-title"></hr>';
    names.style = "text-transform: uppercase; color: black; font-family: 'Lato', sans-serif; font-weight: bold; font-size: 17px; letter-spacing: 0;"

    /* Insere as imagens das alunas */
    var img = document.createElement("img");
    var photoStudents = data[sede][turma]['students'][i]['photo'];
    img.setAttribute('src', photoStudents);
    img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/1/19/Gray_-_replace_this_image_female.svg');
    img.style = "width = 132px; height: 125px; float: left";

    /* Insere o status das alunas */
    var status = document.createElement("p");
    status.style = "font-family: 'Lato', sans-serif; font-size: 11px; color: black; font-weight: normal; text-align: center";
    if (data[sede][turma]['students'][i]['active'] === true) {
      status.innerHTML = 'ATIVA: SIM';
    } else {
      status.innerHTML = 'ATIVA: NÃO';
    }

    profileBox.appendChild(names);
    profileBox.appendChild(img);
    profileBox.appendChild(status);
    studentsProfiles.appendChild(profileBox);

  }
}