class Barre {
    constructor(largeur, classe, texte, classeTexte) {
        this.largeur = largeur
        this.classe = classe
        this.texte = texte
        this.classeTexte = classeTexte
    }

    baisserJauge() {
        if (this.largeur > 0) {
            this.largeur -= 10
        }

        this.display()
    }

    augmenterJauge() {
        if (this.largeur === 0) {
            return
        }

        if (this.largeur < 70) {
            this.largeur += 30
        } else {
            this.largeur = 100
        }
        this.display()
    }

    display() {
        let barre = document.querySelector(this.classe)
        let texteBarre = document.querySelector(this.classeTexte)
        barre.style.width = `${this.largeur}%`
        texteBarre.innerText = `${this.largeur}/100`

        if (this.largeur === 0) {
            let image = document.querySelector('.pikachu')
            image.src = './assets/sleepy.png'
            let rejouer = document.querySelector('.rejouer')
            rejouer.classList.remove('hidden')
        }
    }

    recupererLargeur() {
        return this.largeur
    }
}

function jouer() {
    let bouttonNourrir = document.querySelector('.boutton-nourrir')
    let bouttonSommeil = document.querySelector('.reposer')

    bouttonNourrir.addEventListener('click', augmenterVie)
    bouttonSommeil.addEventListener('click', reposer)

    let image = document.querySelector('.pikachu')
    image.src = './assets/happy.png'

    function augmenterVie() {
        barredeVie.augmenterJauge()
    }
    function reposer() {
        barreDeSommeil.augmenterJauge()
    }

    let rejouer = document.querySelector('.rejouer')
    rejouer.classList.add('hidden')
    let barredeVie = new Barre(100, '.vie', '#ffcc00', '.vie-info')
    let barreDeSommeil = new Barre(100, '.sommeil', '#14213D', '.sommeil-info')

    let monInterval = setInterval(baisserVie, 500)
    let intervalSommeil = setInterval(baisserSommeil, 500)

    function baisserVie() {
        barredeVie.baisserJauge()

        stopGame()
    }

    function baisserSommeil() {
        barreDeSommeil.baisserJauge()
        stopGame()
    }

    function stopGame() {
        let largeurVie = barredeVie.recupererLargeur()
        let largeurSommeil = barreDeSommeil.recupererLargeur()

        if (largeurVie < 10 || largeurSommeil < 10) {
            clearInterval(intervalSommeil)
            clearInterval(monInterval)
            alert("he's dead")
        }
    }
}

jouer()
