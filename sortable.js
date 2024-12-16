
const postUrl = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';
let superheroes = [];//storing superhero data
let pageSize = 20;//default pagesize
let currentPage = 1;//current page
let sortDirection = {};
//fetching data
async function getSuperheroes() {
    const response = await fetch(postUrl);
    const data = await response.json();
    console.log(data)
    return data;
}
//populating the table with data
function populateTable(superheroes) {
    const tableBody = document.getElementById('superhero-table-body');
    tableBody.innerHTML = '';
    superheroes.forEach(superhero => {
        const row = document.createElement('tr');//creating row for each of the superheroes
        row.addEventListener('click', function() {
            showDetailedView(superhero); // passing the superhero object to the detailed view function
          });
          //creating cells
        const iconCell = document.createElement('td');//creating iconcell itself
        const iconImg = document.createElement('img');//holding the image
        iconImg.src = superhero.images.xs;//stored image
        iconCell.appendChild(iconImg);//appending a image to the tablecell
        row.appendChild(iconCell);//appending the cell

        const nameCell = document.createElement('td');
        nameCell.textContent = superhero.name;
        row.appendChild(nameCell);

        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = superhero.biography.fullName;
        row.appendChild(fullNameCell);//Full name cell

        const powerstatsCell = document.createElement('td');
        const powerstats = Object.entries(superhero.powerstats).map(([key, value]) => `${key}: ${value}`).join('<br>');//converts into array of keys and maps them and joins
        powerstatsCell.innerHTML = powerstats;
        row.appendChild(powerstatsCell);

        const raceCell = document.createElement('td');
        raceCell.textContent = superhero.appearance.race;
        row.appendChild(raceCell);

        const genderCell = document.createElement('td');
        genderCell.textContent = superhero.appearance.gender;
        row.appendChild(genderCell);

        const heightCell = document.createElement('td');//creates the cell
        heightCell.textContent = superhero.appearance.height.join(', ');//converting array into str
        row.appendChild(heightCell);

        const weightCell = document.createElement('td');
        weightCell.textContent = superhero.appearance.weight.join(', ');
        row.appendChild(weightCell);

        const placeOfBirthCell = document.createElement('td');
        placeOfBirthCell.textContent = superhero.biography.placeOfBirth;
        row.appendChild(placeOfBirthCell);

        const alignmentCell = document.createElement('td');
        alignmentCell.textContent = superhero.biography.alignment;
        row.appendChild(alignmentCell);
        tableBody.appendChild(row);
        
    });
}
//initializing the page
async function initialize() {
    superheroes = await getSuperheroes();
    paginateSuperheroes();
    document.getElementById('pageSize').value = pageSize.toString();//html input element(dropdown) .value represent current choice
}
//to generate pagination buttons
function generatePaginationButtons(totalPages) {
    const paginationContainer = document.getElementById('paginationButtons');
    paginationContainer.innerHTML = '';
//creating a button for each page and attach event listeners
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            paginateSuperheroes();
        });
        paginationContainer.appendChild(button);
    }
}
//function to paginate superheroes
async function paginateSuperheroes() {
    const start = (currentPage - 1) * pageSize;//calculating which page are we on(firts)
    const end = currentPage * pageSize;//getting last page
    const paginatedSuperheroes = superheroes.slice(start, end);
    populateTable(paginatedSuperheroes);
    
    //generate pagination buttons
    if (pageSize !== 'all') {
        const totalPages = Math.ceil(superheroes.length / pageSize);
        generatePaginationButtons(totalPages);
    }
}
//changing pagesize
document.getElementById('pageSize').addEventListener('change', async (event) => {
    const selectedPageSize = event.target.value; 
    pageSize = selectedPageSize === 'all' ? superheroes.length : parseInt(selectedPageSize);//takes the new value(how many superheroes per page)
    currentPage = 1;//always start from the 1 page
    await paginateSuperheroes();
});
//search function
function searchHero(){
    const searchQuery = document.getElementById('search').value.toLowerCase();//making it case-insensitive
    const result = superheroes.filter(hero => 
        hero.name.toLowerCase().includes(searchQuery) || 
        hero.biography.fullName.toLowerCase().includes(searchQuery)
    )
    populateTable(result)
} 
//search input
document.getElementById('search').addEventListener('input', searchHero);

// Sorting function
function sortTable(column) {
    // Toggle sort direction when clicking on the same column
    sortDirection[column] = !sortDirection[column];
    // Sort the superheroes array based on the column clicked
    superheroes.sort((a, b) => {
        let valueA, valueB;
        if (column === 'powerStats') {
            // Calculate total powerstats for each superhero
            const powerstatsA = Object.values(a.powerstats).reduce((total, current) => total + parseInt(current), 0);
            const powerstatsB = Object.values(b.powerstats).reduce((total, current) => total + parseInt(current), 0);
            valueA = powerstatsA;
            valueB = powerstatsB;
        } else if (column === 'fullName') {
            // Handle empty full names
            if (!a.biography.fullName && !b.biography.fullName) {
                return 0; // Both names are empty, no change in order
            } else if (!a.biography.fullName) {
                return 1; // Name A is empty, push it to the end
            } else if (!b.biography.fullName) {
                return -1; // Name B is empty, push it to the end
            } else {
                valueA = a.biography.fullName.toLowerCase();
                valueB = b.biography.fullName.toLowerCase();
            }
        } else if (column === 'race') {
            // Handle '-' in races
            if (!a.appearance.race && !b.appearance.race) {
                return 0; // Both races are '-', no change in order
            } else if (!a.appearance.race) {
                return 1; // Race A is '-', push it to the end
            } else if (!b.appearance.race) {
                return -1; // Race B is '-', push it to the end
            } else {
                valueA = a.appearance.race.toLowerCase();
                valueB = b.appearance.race.toLowerCase();
            }
        } else if (column === 'gender') {
            // Handle '-' in genders
            if (a.appearance.gender === '-' && b.appearance.gender === '-') {
                return 0; // Both genders are '-', no change in order
            } else if (a.appearance.gender === '-') {
                return 1; // Gender A is '-', push it to the end
            } else if (b.appearance.gender === '-') {
                return -1; // Gender B is '-', push it to the end
            } else {
                valueA = a.appearance.gender.toLowerCase();
                valueB = b.appearance.gender.toLowerCase();
            }
        } else if (column === 'placeOfBirth') {
            // Handle '-' in place of births
            if (a.biography.placeOfBirth === '-' && b.biography.placeOfBirth === '-') {
                return 0; // Both genders are '-', no change in order
            } else if (a.biography.placeOfBirth === '-') {
                return 1; // Gender A is '-', push it to the end
            } else if (b.biography.placeOfBirth === '-') {
                return -1; // Gender B is '-', push it to the end
            } else {
                valueA = a.biography.placeOfBirth.toLowerCase();
                valueB = b.biography.placeOfBirth.toLowerCase();
            }
        } else if (column === 'alignment') {
            // Handle '-' in alignments
            if (a.biography.alignment === '-' && b.biography.alignment === '-') {
                return 0; // Both genders are '-', no change in order
            } else if (a.biography.alignment === '-') {
                return 1; // Gender A is '-', push it to the end
            } else if (b.biography.alignment === '-') {
                return -1; // Gender B is '-', push it to the end
            } else {
                valueA = a.biography.alignment.toLowerCase();
                valueB = b.biography.alignment.toLowerCase();
            }
        } else if (column === 'height') {
            const parseHeight = height => {
                if (height.toLowerCase() === "shaker heights" || !height) {
                    return NaN; // Treat "Shaker Heights" or empty values as NaN
                } else {
                    const [feetStr, inchesStr] = height.split("'");
                    const feet = feetStr ? parseInt(feetStr) : 0;
                    const inches = inchesStr ? parseInt(inchesStr) : 0;
                    return feet * 12 + inches;
                }
            };

            const heightA = a.appearance.height[0]; // Assuming height is always provided in the first element
            const heightB = b.appearance.height[0];

            // Handle invalid heights
            if (isNaN(parseHeight(heightA)) && isNaN(parseHeight(heightB))) {
                return 0; // Both heights are invalid, no change in order
            } else if (isNaN(parseHeight(heightA))) {
                return 1; // Height A is invalid, push it to the end
            } else if (isNaN(parseHeight(heightB))) {
                return -1; // Height B is invalid, push it to the end
            } else {
                const numericHeightA = parseHeight(heightA);
                const numericHeightB = parseHeight(heightB);

                return sortDirection[column] ? numericHeightA - numericHeightB : numericHeightB - numericHeightA;
            }
        } else if (column === 'weight') {
           // Handle weight sorting
           const weightA = parseInt(a.appearance.weight[0]);
           const weightB = parseInt(b.appearance.weight[0]);

           // Handle NaN values (invalid weights)
           if (isNaN(weightA) && isNaN(weightB)) {
               return 0; // Both weights are invalid, no change in order
           } else if (isNaN(weightA)) {
               return 1; // Weight A is invalid, push it to the end
           } else if (isNaN(weightB)) {
               return -1; // Weight B is invalid, push it to the end
           } else {
               return sortDirection[column] ? weightA - weightB : weightB - weightA;
           }
        } else {
            valueA = a[column].toLowerCase();
            valueB = b[column].toLowerCase();
        }
        //if sortingdir is ascending is true it compares the values
        //1=valueA>valueB && -1= valueA<valueB && 
        return sortDirection[column] ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });
    // Repopulate the table with sorted data
    paginateSuperheroes();
}
//initialize the page
initialize();
paginateSuperheroes();  




function showDetailedView(superhero) {
    // Redirect to the detailed view page
    window.location.href = `detailed-view.html?id=${superhero.id}`;

  }
