document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('api/get_leaderboard.php');
        const data = await response.json();
        
        if (data.success) {
            const scores = data.scores;
            
            // Update top 3 podium
            if (scores.length > 0) {
                updatePodiumItem('first', scores[0]);
            }
            if (scores.length > 1) {
                updatePodiumItem('second', scores[1]);
            }
            if (scores.length > 2) {
                updatePodiumItem('third', scores[2]);
            }
            
            // Update all scores list
            const scoresList = document.querySelector('.scores-list');
            scoresList.innerHTML = scores.map((score, index) => `
                <div class="score-item">
                    <div class="rank">#${index + 1}</div>
                    <div class="player-name">${score.username}</div>
                    <div class="player-score">${score.score}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
});

function updatePodiumItem(position, score) {
    const podiumItem = document.querySelector(`.podium-item.${position}`);
    if (podiumItem) {
        podiumItem.querySelector('.player-name').textContent = score.username;
        podiumItem.querySelector('.player-score').textContent = score.score;
    }
} 