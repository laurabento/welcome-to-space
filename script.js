const terraEn = document.getElementById("terra-en");
const terraName = document.getElementById("terra-name");
const terraMoons = document.getElementById("terra-moons");
const terraDensity = document.getElementById("terra-density");
const terraGravity = document.getElementById("terra-gravity");
const terraEccentricity = document.getElementById("terra-eccentricity");
const terraInclination = document.getElementById("terra-inclination");
const terraFlattening = document.getElementById("terra-flattening");
const luaEn = document.getElementById("lua-en");
const luaName = document.getElementById("lua-name");
const luaDensity = document.getElementById("lua-density");
const luaGravity = document.getElementById("lua-gravity");
const luaMean = document.getElementById("lua-mean");
const solEn = document.getElementById("sol-en");
const solName = document.getElementById("sol-name");
const solDensity = document.getElementById("sol-density");
const solGravity = document.getElementById("sol-gravity");
const solMean = document.getElementById("sol-mean");

preencherCards();
preencherTabela();
loadDashboard();

function preencherCards() {
    Promise.all([
      spaceGet("bodies/terre/"),
      spaceGet("bodies/lune/"),
      spaceGet("bodies/soleil/")
    ]).then(function (results) {
        terraEn.innerHTML = results[0].data.englishName;
        terraName.innerHTML = results[0].data.name;
        terraMoons.innerHTML = results[0].data.moons[0].moon;
        terraDensity.innerHTML = results[0].data.density;
        terraGravity.innerHTML = results[0].data.gravity;
        terraEccentricity.innerHTML = results[0].data.eccentricity;
        terraInclination.innerHTML = results[0].data.inclination;
        terraFlattening.innerHTML = results[0].data.flattening;
        luaEn.innerHTML = results[1].data.englishName;
        luaName.innerHTML = results[1].data.name;
        luaDensity.innerHTML = results[1].data.density;
        luaGravity.innerHTML = results[1].data.gravity;
        luaMean.innerHTML = results[1].data.meanRadius;
        solEn.innerHTML = results[2].data.englishName;
        solName.innerHTML = results[2].data.name;
        solDensity.innerHTML = results[2].data.density;
        solGravity.innerHTML = results[2].data.gravity;
        solMean.innerHTML = results[2].data.meanRadius;
    });
}

async function preencherTabela() {
    const response = await spaceGet("bodies/");
    const tableData = response.data.bodies;
  
    tableData.forEach((bodies) => {
        if(bodies.isPlanet === true){
            $("#planetsTable").append(`<tr>
            <td>${bodies.englishName}</td>
            <td>${bodies.name}</td>
            <td>${bodies.sideralOrbit}</td>
            <td>${bodies.sideralRotation}</td>
            </tr>`);
        }
    });
  }

function loadDashboard() {
    var nomes = [];
    var quantidade = [];
    Promise.all([countSpaceGet()]).then(function (items) {
      for (var i = 0; i < 6; i++) {
        nomes.push(items[0].data.knowncount[i].id);
        quantidade.push(items[0].data.knowncount[i].knownCount);
      }


      var spaceItems = document.getElementById("myChart").getContext("2d");
  
      var myChart = new Chart(spaceItems, {
        type: "doughnut",
        data: {
          labels: nomes,
          datasets: [
            {
              data: quantidade,
              backgroundColor: [
                'rgb(242, 201, 76)',
                'rgb(242, 153, 74)',
                'rgb(111, 207, 151)',
                'rgb(235, 87, 87)',
                'rgb(45, 156, 219)',
                'rgb(187, 107, 217)',
              ],
              borderColor: [
                'rgb(242, 201, 76)',
                'rgb(242, 153, 74)',
                'rgb(111, 207, 151)',
                'rgb(235, 87, 87)',
                'rgb(45, 156, 219)',
                'rgb(187, 107, 217)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          layout:{
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            },
          },
          plugins: {
            legend: {
              position: 'right',
              align: 'center',
              labels:{
                color: "white",
                font:{
                  size: 13,
                  family: "'PT Sans', sans-serif", 
                }
              }
            },
          },
          responsive: false,
          maintainAspectRatio: false,
          onResize: false
        },
      });
    });
  }

function spaceGet(params){
    return axios.get(`https://api.le-systeme-solaire.net/rest/${params}`);
}

function countSpaceGet(){
    return axios.get("https://api.le-systeme-solaire.net/rest/knowncount/")
}