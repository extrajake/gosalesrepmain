const accordion = document.getElementsByClassName('contentDB');

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function(){
        this.classList.toggle('active');
    })
}