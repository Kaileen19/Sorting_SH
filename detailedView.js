     async function populateData(id) {
        const postUrl = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';
        try {
            const response = await fetch(postUrl);
            const data = await response.json();
            const superhero = data.find(hero => hero.id === parseInt(id));


            const heroName = document.querySelector('.main-title');
            const heroImage = document.querySelector('.hero-image');
            const heroSlug = document.querySelector('.slug');
            const heroInt = document.querySelector('.int');
            const heroStr = document.querySelector('.str');
            const heroSpe = document.querySelector('.spe');
            const heroDur = document.querySelector('.dur');
            const heroPow = document.querySelector('.pow');
            const heroCom = document.querySelector('.com');
            const heroGender = document.querySelector('.gender');
            const heroRace = document.querySelector('.race');
            const heroHeight = document.querySelector('.height');
            const heroWeight = document.querySelector('.weight');
            const heroEye = document.querySelector('.eyecolor');
            const heroHair = document.querySelector('.haircolor');
            const heroFullname = document.querySelector('.fullname');
            const heroEgo = document.querySelector('.ego');
            const heroAlias = document.querySelector('.alias');
            const heroPob = document.querySelector('.pob');
            const heroApp = document.querySelector('.app')
            const heroPublisher = document.querySelector('.publisher');
            const heroAlign = document.querySelector('.alignment');
            const heroOccupation =document.querySelector('.occupation');
            const heroBase = document.querySelector('.base');
            const heroGroup = document.querySelector('.group');
            const heroRelatives = document.querySelector('.relatives');


            heroName.textContent = superhero.name
            heroSlug.textContent = superhero.slug
            heroImage.src = superhero.images.lg
            heroInt.textContent = superhero.powerstats.intelligence
            heroSpe.textContent = superhero.powerstats.speed
            heroStr.textContent = superhero.powerstats.strength
            heroDur.textContent = superhero.powerstats.durability
            heroPow.textContent = superhero.powerstats.power
            heroCom.textContent = superhero.powerstats.combat
            heroGender.textContent = superhero.appearance.gender
            heroRace.textContent = superhero.appearance.race
            heroHeight.textContent = superhero.appearance.height
            heroWeight.textContent = superhero.appearance.weight
            heroEye.textContent = superhero.appearance.eyeColor
            heroHair.textContent = superhero.appearance.hairColor
            heroFullname.textContent = superhero.biography.fullName
            heroEgo.textContent = superhero.biography.alterEgos
            heroAlias.textContent = superhero.biography.aliases
            heroPob.textContent = superhero.biography.placeofBirth
            heroApp.textContent = superhero.biography.firstAppearance
            heroPublisher.textContent = superhero.biography.publisher
            heroAlign.textContent = superhero.biography.alignment
            heroOccupation.textContent = superhero.work.occupation
            heroBase.textContent = superhero.work.base
            heroGroup.textContent = superhero.connections.groupAffiliation
            heroRelatives.textContent = superhero.connections.relatives





        } catch (error) {
            console.error('Error fetching superhero data:', error);
        }
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    populateData(id);
