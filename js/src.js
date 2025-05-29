// Oyun Elemanları - DOM Referansları
document.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector(".start"); // Oyunu başlat butonu
    const game = document.querySelector("#game"); // Ana oyun konteyneri
    const sco = document.getElementById("score"); // Skor göstergesi
    const audio = document.getElementById("audio"); // Arka plan müziği
    const ply = document.getElementById("play"); // Oyun başlangıç sesi
    const out = document.getElementById("out"); // Oyun bitiş sesi
    const results = document.getElementById("result"); // Sonuç sesi
    const result_box = document.querySelector(".result_box"); // Sonuç popup kutusu
    const restart = result_box.querySelector(".restart"); // Yeniden başlat butonu
    const text = result_box.querySelector(".score_text"); // Final skor metni
    const nameForm = result_box.querySelector(".name_form"); // İsim giriş formu
    const playerNameInput = document.getElementById("player_name"); // İsim giriş alanı
    const saveScoreBtn = document.getElementById("save_score"); // Skor kaydet butonu
    const topScoresList = document.querySelector(".top-scores-list"); // Top scores listesi

    // Oyun Durum Değişkenleri
    let a; // Kare oluşturma için interval referansı
    let tos = 2400; // Kare kaldırma zaman aşımı (milisaniye)
    let bool1 = bool2 = bool3 = bool4 = true; // Hız seviyesi bayrakları
    var count = 1; // Kare oluşturma sayacı
    var score = 0; // Oyuncunun skoru
    var step = 0; // Mevcut hız seviyesi
    var mar = randomMargin(), mar2; // Kareler için kenar boşluğu pozisyonları
    var hasSubmittedScore = false; // Skor gönderildi mi?

    // Liderlik tablosunu yükle
    async function loadLeaderboard() {
        try {
            const response = await fetch('api/get_leaderboard.php');
            const data = await response.json();
            
            if (data.success && topScoresList) {
                const scores = data.scores;
                
                // Sadece ilk 3 skoru göster
                topScoresList.innerHTML = scores.slice(0, 3).map((score, index) => `
                    <div class="top-score-item">
                        <div class="rank">#${index + 1}</div>
                        <div class="player-name">${score.username}</div>
                        <div class="player-score">${score.score}</div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
        }
    }

    // Skoru kaydet
    async function saveScore(name) {
        try {
            const response = await fetch('api/save_score.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    score: score
                })
            });
            
            const data = await response.json();
            if (data.success) {
                hasSubmittedScore = true;
                if (nameForm) nameForm.style.display = 'none';
                loadLeaderboard(); // Liderlik tablosunu güncelle
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }

    // Oyun bittiğinde sonuç ekranını göster
    function viewResult(){
        if (game) game.style.display = "none";
        if (results) results.play();
        if (result_box) {
            result_box.classList.add("activeResult");
            if (text) text.innerText = "You've scored " + score + " points";
            
            // İlk kez oynuyorsa isim formunu göster
            if (!hasSubmittedScore && nameForm) {
                nameForm.style.display = 'flex';
            }
            
            // Liderlik tablosunu yükle
            loadLeaderboard();
        }
    }

    // Skor kaydet butonuna tıklandığında
    if (saveScoreBtn) {
        saveScoreBtn.onclick = () => {
            if (playerNameInput) {
                const name = playerNameInput.value.trim();
                if (name) {
                    saveScore(name);
                } else {
                    alert('Lütfen isminizi girin!');
                }
            }
        };
    }

    // Yeniden başlatıldığında oyun durumunu sıfırla
    if (restart) {
        restart.onclick = ()=>{
            if (start) start.style.display = "block";
            if (result_box) result_box.classList.remove("activeResult");
            if (sco) sco.innerText = 0;
            if (audio) audio.currentTime = 0;
            score = 0;
            hasSubmittedScore = false;
        }
    }

    // Arka plan müziğini başlat ve döngüye al
    function startAudio(){
        audio.play();
    }
    audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        audio.play();
    });

    // Kare oluşturma hızını ayarla
    function speed(e){
        a = setInterval(appendDiv, e);
    }

    // Hız seviyesi bayraklarını sıfırla
    function reset(){
        bool1 = bool2 = bool3 = bool4 = true;
    }

    // Oyun bitişini yönet
    function outs(){
        audio.pause();
        out.play();
        setTimeout(viewResult, 1000);
    }

    // Yeni kare oluştur ve ekle
    function appendDiv(){
        var ob = document.createElement("div");

        // Yeni karenin önceki kareden farklı bir sütunda görünmesini sağla
        do{mar2 = randomMargin()}
        while(mar == mar2){mar = mar2}

        ob.style.marginLeft = mar2+"%";
        setTimeout(moveDown, 100, ob);
        
        // Kare tıklama işlemini yönet
        ob.onclick = () =>{
            ob.style.background = "rgba(0,0,0,0.2)"
            updateScore();
        }

        // Skora göre oyun hızını ayarla
        if(score >= 70 && score < 150) step = 1;
        else if(score >= 150 && score < 400) step = 2;
        else if(score >= 400 && score < 800) step = 3;
        else if(score >= 800) step = 4;
        
        document.getElementById("tiles").prepend(ob);
    }

    // Rastgele kenar boşluğu pozisyonu oluştur (0%, 25%, 50% veya 75%)
    function randomMargin(){return 25*Math.floor(Math.random()*4)}

    // Kare hareketini ve hız ayarlamalarını yönet
    function moveDown(e){
        e.classList.add("move");
        
        // Hız seviyesi 1 (70-149 puan)
        if(step == 1){
            e.classList.add("speedX1");
            if(bool1 == true){
                clearInterval(a);
                speed(300);
                reset();
                bool1 = false;
                tos = 1600;
            }
        } 
        // Hız seviyesi 2 (150-399 puan)
        else if(step == 2){
            e.classList.add("speedX2");
            if(bool2 == true){
                clearInterval(a);
                speed(250);
                reset();
                bool2 = false;
                tos = 1600;
            }
        }
        // Hız seviyesi 3 (400-799 puan)
        else if(step == 3){
            e.classList.add("speedX3");
            if(bool3 == true){
                clearInterval(a);
                speed(200);
                reset();
                bool3 = false;
                tos = 1200;
            }
        } 
        // Hız seviyesi 4 (800+ puan)
        else if(step == 4){
            e.classList.add("speedX4");
            if(bool4 == true){
                clearInterval(a);
                speed(160);
                reset();
                bool4 = false;
                tos = 1000;
            }
        }
        setTimeout(removeDiv, tos, e)
    }

    // Kare tıklandığında skoru güncelle
    function updateScore(){
        score++;
        sco.innerText = score;
    }

    // Kareyi kaldır ve oyun bitişini kontrol et
    function removeDiv(e){
        var bg = e.style.background;
        if(bg == ""){
            clearInterval(a);
            outs();
        }
        e.remove()
    }

    // Oyun başlat butonuna tıklandığında oyunu başlat
    start.querySelector("button").onclick = ()=>{
        ply.play();
        game.style.display = "block";
        start.style.display = "none";
        document.querySelector(".dpuLogo").style.display = "none"; // Hide DPU logo
        score = 0;
        speed(400);
        setTimeout(startAudio, 1000);
    }
});