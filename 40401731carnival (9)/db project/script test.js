document.addEventListener('DOMContentLoaded', function() {
    const playerInfoForm = document.getElementById('player-info-form');
    const gameLanding = document.getElementById('game-landing');
    const gameplay = document.getElementById('gameplay');
    const gameSummary = document.getElementById('game-summary');
    const playerNameInput = document.getElementById('player-name');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ammoCountDisplay = document.getElementById('ammo-count');
    const reloadBtn = document.getElementById('reload-btn');
    const gunImg = document.getElementById("gun-img");
    const targetImg = document.getElementById("target-img");
    const enemyImg = document.getElementById("enemy-img");
    const maxAmmo = 10; 
    const leaderboard = [];
    const playAgainBtn = document.getElementById("play-again-btn");

   


 
    // const levels = [
    //     { timeLimit: 30, targets: 5, negativeTargets: 3 },
    //     { timeLimit: 20, targets: 8, negativeTargets: 5},
    //     { timeLimit: 15, targets: 10, negativeTargets: 10}
    // ];
    const levels = [
        { timeLimit: 30, targets: 5, negativeTargets: 3, enemyMovementPattern: 'horizontal' },
        { timeLimit: 20, targets: 8, negativeTargets: 5, enemyMovementPattern: 'vertical' },
        { timeLimit: 15, targets: 10, negativeTargets: 10, enemyMovementPattern: 'mixed' },
        { timeLimit: 25, targets: 12, negativeTargets: 15, enemyMovementPattern: 'cross' },
        { timeLimit: 20, targets: 15, negativeTargets: 20, enemyMovementPattern: 'random' }
    ];
    const images = {
        gun: gunImg,
        target: targetImg,
        enemy: enemyImg
    };

    const gun = {
        x: 400, 
        y: 100, 
        width: 50, 
        height: 100 
    };
    let currentLevel = 0;
    let playerName = '';
    let startTime;
    let endTime;
    let shotsFired = 0;
    let hits = 0;
    let negativeHits = 0;
    let targets = [];
    let negativeTargets = [];
    let ammoCount = maxAmmo;
    let totalPoints = 0;
    let overallScore = 0;
    let overallStartTime;

    gunImg.src = "gun.png";
    targetImg.src = "target.png";
    enemyImg.src = "enemy.png";

    // initImages();

    playerInfoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        playerName = playerNameInput.value.trim();
        if (playerName !== '') {
            initImages();
            drawImages();
            startGame();
            
        }
        
    });

    // gunImg.onload = function() {
    //     initImages();
    //     drawImages();
    //     startGame();
    // };

    
    function startGame() {
        console.log("Game started");
        gameLanding.style.display = 'none';
        gameplay.style.display = 'block';
        // initImages();
        // drawImages();
        initializeGame();
        overallStartTime = Date.now();
        startTime = Date.now();
        updateLevelInfo(); 
        updateGame();
    }
    
    
    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveTargets();
        moveNegativeTargets(); 
        drawTargets(); 
        // drawImages();
        const level = levels[currentLevel];
        if (targets.length === 0) {
            if (currentLevel < levels.length - 1) {
                nextLevel();
                // currentLevel++;
                generateTargets();
                generateNegativeTargets();
                startTime = Date.now();
                updateLevelInfo();
            } else {
                endGame();
            }
        } else {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000;
            if (elapsedTime >= level.timeLimit) {
                endGame();
            } else {
                requestAnimationFrame(updateGame); 
            }
        }
    }
    
    

    function initializeGame() {
        canvas.width = 800;
        canvas.height = 400;
        gameplay.appendChild(canvas);
        canvas.addEventListener('mousedown', shoot);
        generateTargets();
        generateNegativeTargets();
    }

    
    function generateTargets() {
        targets = [];
        negativeTargets = [];
        const level = levels[currentLevel];
        for (let i = 0; i < level.targets; i++) {
            const target = {
                x: Math.random() * (canvas.width - 50),
                y: Math.random() * (canvas.height - 50),
                width: 50,
                height: 50
            };
            targets.push(target);
        }
        
    }
    function generateNegativeTargets() {
        negativeTargets = [];
        const level = levels[currentLevel];
        for (let i = 0; i < level.negativeTargets; i++) {
            const negativeTarget = {
                x: Math.random() * (canvas.width - 50),
                y: Math.random() * (canvas.height - 50),
                width: 50,
                height: 50,
                horizontalSpeed: Math.random() * 2 + 1, 
                verticalSpeed: Math.random() * 2 + 1
                // horizontalSpeed: 0, 
                // verticalSpeed: 0 
            };
            negativeTargets.push(negativeTarget);
        }
    }
    
    

    // function shoot(event) {
    //     decreaseAmmo();
    //     shotsFired++;
    //     const rect = canvas.getBoundingClientRect();
    //     const mouseX = event.clientX - rect.left;
    //     const mouseY = event.clientY - rect.top;

    //     targets.forEach((target, index) => {
    //         if (mouseX >= target.x && mouseX <= target.x + target.width &&
    //             mouseY >= target.y && mouseY <= target.y + target.height) {
    //             targets.splice(index, 1);
    //             hits++;
    //         }
    //     });

    //     negativeTargets.forEach((negativeTarget, index) => {
    //         if (mouseX >= negativeTarget.x && mouseX <= negativeTarget.x + negativeTarget.width &&
    //             mouseY >= negativeTarget.y && mouseY <= negativeTarget.y + negativeTarget.height) {
    //             negativeTargets.splice(index, 1);
    //             negativeHits++;
    //             if (negativeHits >= 1) {
    //                 endGame();
    //             }
    //         }
    //     });
    // }
    
function shoot(event) {
    if (ammoCount > 0) {
        decreaseAmmo();
        shotsFired++;
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        targets.forEach((target, index) => {
            if (mouseX >= target.x && mouseX <= target.x + target.width &&
                mouseY >= target.y && mouseY <= target.y + target.height) {
                targets.splice(index, 1);
                hits++;
                totalPoints += 5;
            }
        });

        negativeTargets.forEach((negativeTarget, index) => {
            if (mouseX >= negativeTarget.x && mouseX <= negativeTarget.x + negativeTarget.width &&
                mouseY >= negativeTarget.y && mouseY <= negativeTarget.y + negativeTarget.height) {
                negativeTargets.splice(index, 1);
                negativeHits++;
                if (negativeHits >= 1) {
                    endGame();
                }
            }
        });
    }
}

function reload() {
    ammoCount = maxAmmo;
    updateAmmoCount();
    canvas.addEventListener('mousedown', shoot);
}

function decreaseAmmo() {
    if (ammoCount > 0) {
        ammoCount--;
        updateAmmoCount();
        if (ammoCount === 0) {
            canvas.removeEventListener('mousedown', shoot);
            console.log('Out of ammo! Please reload.');
        }
    }
}


    
    

    function drawTargets() {
        ctx.fillStyle = 'green';
        targets.forEach(target => {
            // ctx.fillRect(target.x, target.y, target.width, target.height);
            ctx.drawImage(targetImg, target.x, target.y, target.width, target.height);
        });

        ctx.fillStyle = 'red';
        negativeTargets.forEach(negativeTarget => {
            ctx.drawImage(enemyImg, negativeTarget.x, negativeTarget.y, negativeTarget.width, negativeTarget.height);
            // ctx.fillRect(negativeTarget.x, negativeTarget.y, negativeTarget.width, negativeTarget.height);
        });
    }

    function endGame() {
        canvas.removeEventListener('mousedown', shoot);
        endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000); 
        const accuracy = hits / shotsFired * 100;
        const overallEndTime = Date.now();
        const overallDuration = Math.floor((overallEndTime - overallStartTime) / 1000);
    
        displayGameSummary(overallDuration, accuracy);
        
    }

    function displayGameSummary(overallDuration, accuracy) {
        gameplay.style.display = 'none';
        gameSummary.style.display = 'block';

        overallScore = (totalPoints + (110-overallDuration))*currentLevel;
        // document.getElementById('game-duration').innerText = `Duration: ${duration} seconds`;
        document.getElementById('shots-fired').innerText = `Shots fired: ${shotsFired}`;
        document.getElementById('hits').innerText = `Hits: ${hits}`;
        document.getElementById('negative-hits').innerText = `Negative hits: ${negativeHits}`;
        document.getElementById('accuracy').innerText = `Accuracy: ${accuracy.toFixed(2)}%`;
        document.getElementById('overall-duration').innerText = `Overall Duration: ${overallDuration} seconds`;
        document.getElementById('overall-score').innerText = `Overall Score: ${overallScore}`;
       

    
   


        
        addToLeaderboard(playerName,overallDuration,overallScore);
        displayLeaderboard();

    }

    
    function updateLevelInfo() {
        const level = levels[currentLevel];
        document.getElementById('current-level').innerText = currentLevel + 1;
        document.getElementById('time-limit').innerText = level.timeLimit;
    }
    
    function nextLevel() {
        currentLevel++;
        if (currentLevel < levels.length) {
            initializeGame(); 
            generateTargets(); 
            generateNegativeTargets();
            drawTargets();
            updateGame(); 
            startTime = Date.now();
            updateLevelInfo(); 
            console.log("Moved to level", currentLevel);
        } else {
            endGame();
        }
    }
    
    function moveTargets() {
        targets.forEach(target => {
            target.x += 1; 
            if (target.x > canvas.width) {
                target.x = 0; 
                target.y = Math.random() * (canvas.height - 50); 
            }
        });
    }
    
    
    function moveNegativeTargets() {
        negativeTargets.forEach(negativeTarget => {
            
            switch (levels[currentLevel].enemyMovementPattern) {
                case 'horizontal':
                    negativeTarget.x += 1; 
                    if (negativeTarget.x > canvas.width || negativeTarget.y > canvas.height) {
                        negativeTarget.x = Math.random() * (canvas.width - 50);
                        negativeTarget.y = Math.random() * (canvas.height - 50);
                                }
                    break;
                case 'vertical':
                    // negativeTarget.y += 1; 
                    // if (negativeTarget.x < 0 || negativeTarget.x + negativeTarget.width > canvas.width) {
                    //     negativeTarget.horizontalSpeed *= -1;
                    //     }
                    //     if (negativeTarget.y < 10 || negativeTarget.y + negativeTarget.height > canvas.height-10) {
                    //     negativeTarget.verticalSpeed *= -1;
                    //     }
                    //     negativeTarget.x = Math.max(0, Math.min(negativeTarget.x, canvas.width - negativeTarget.width));
                    //     negativeTarget.y = Math.max(0, Math.min(negativeTarget.y, canvas.height - negativeTarget.height));
                    //     negativeTarget.x += negativeTarget.horizontalSpeed;
                    //     negativeTarget.y += negativeTarget.verticalSpeed;
                    negativeTarget.y += negativeTarget.verticalSpeed; 
                    negativeTarget.y += 1;
                    if (negativeTarget.x < 0 || negativeTarget.x + negativeTarget.width > canvas.width) {
                        negativeTarget.horizontalSpeed *= -1;
                    }
                    
                    if (negativeTarget.y < 0 || negativeTarget.y + negativeTarget.height > canvas.height) {
                        negativeTarget.verticalSpeed *= -1;
                    }
                    
                    negativeTarget.x = Math.max(0, Math.min(negativeTarget.x, canvas.width - negativeTarget.width));
                    negativeTarget.y = Math.max(0, Math.min(negativeTarget.y, canvas.height - negativeTarget.height));
                    
                    break;
                case 'mixed':
                    if (negativeTarget.id % 2 === 0) {
                        negativeTarget.x += 1; 
                    } else {
                        negativeTarget.y += 1; 
                    }
                    if (negativeTarget.x > canvas.width || negativeTarget.y > canvas.height) {
                        negativeTarget.x = Math.random() * (canvas.width - 50);
                        negativeTarget.y = Math.random() * (canvas.height - 50);
                                }
                     
                    
                    break;
                case 'cross':
                    
                    negativeTarget.x += Math.random() > 0.5 ? 1 : -1;
                    negativeTarget.y += Math.random() > 0.5 ? 1 : -1;
                    if (negativeTarget.x > canvas.width || negativeTarget.y > canvas.height) {
                        negativeTarget.x = Math.random() * (canvas.width - 50);
                        negativeTarget.y = Math.random() * (canvas.height - 50);
                                }
                    
                    break;
                case 'random':
                    
                    const speed = 3; 
                    const noise = 3;
                    negativeTarget.x += speed * (Math.random() * 2 - 1) * noise;
                    negativeTarget.y += speed * (Math.random() * 2 - 1) * noise;

                    // negativeTarget.x += Math.random() * 2 - 1; // Random horizontal movement
                    // negativeTarget.y += Math.random() * 2 - 1; // Random vertical movement
                    if (negativeTarget.x > canvas.width || negativeTarget.y > canvas.height) {
                        negativeTarget.x = Math.random() * (canvas.width - 50);
                        negativeTarget.y = Math.random() * (canvas.height - 50);
                                }
                    break;
                default:
                    
                    negativeTarget.x += 1;
                    break;
            }
    
            
            if (negativeTarget.x < 0) negativeTarget.x = 0;
            if (negativeTarget.x > canvas.width) negativeTarget.x = canvas.width;
            if (negativeTarget.y < 0) negativeTarget.y = 0;
            if (negativeTarget.y > canvas.height) negativeTarget.y = canvas.height;
            if (negativeTarget.x > canvas.width || negativeTarget.y > canvas.height) {
                negativeTarget.x = Math.random() * (canvas.width - 50);
                negativeTarget.y = Math.random() * (canvas.height - 50);
                        }
        });
    }


    
    
    

    



function updateAmmoCount() {
    ammoCountDisplay.textContent = ammoCount;
}


function reload() {
    
    ammoCount = maxAmmo;
    updateAmmoCount();
}


function decreaseAmmo() {
    ammoCount--;
    updateAmmoCount();
    if (ammoCount === 0) {
        
        console.log('Out of ammo! Please reload.');
    }
}
function initImages() {
    for (let key in images) {
        images[key].onload = function() {
            drawImages();
             console.log("image loaded")
        };
    }
}

function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gunImg, gun.x, gun.y,gun.height,gun.width);
    targets.forEach(target => {
        ctx.drawImage(targetImg, target.x, target.y, target.width, target.height);
    });
    negativeTargets.forEach(enemy => {
        ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    });
}



reloadBtn.addEventListener('click', reload);

    




// function addToLeaderboard(playerName, overallDuration, overallScore) {
//     leaderboard.push({ playerName, overallDuration, overallScore });
//     leaderboard.sort((a, b) => a.overallScore - b.overallScore);
//     let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];


//     leaderboardData.push({ playerName,  overallDuration, overallScore });


//     localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
// }
function addToLeaderboard(playerName, overallDuration, overallScore) {
    let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

    const existingPlayerIndex = leaderboardData.findIndex(entry => entry.playerName === playerName);

    if (existingPlayerIndex !== -1) {
        leaderboardData[existingPlayerIndex].overallDuration = overallDuration;
        leaderboardData[existingPlayerIndex].overallScore = overallScore;
    } else {
        leaderboardData.push({ playerName, overallDuration, overallScore });
    }

    leaderboardData.sort((a, b) => b.overallScore - a.overallScore);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
}




function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; 
    let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

    leaderboardData.sort((a, b) => b.overallScore - a.overallScore);

    leaderboardData.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.playerName} - Duration: ${entry.overallDuration} seconds, score: ${entry.overallScore}`;
        leaderboardList.appendChild(listItem);
    });
}


playAgainBtn.addEventListener('click', playAgain);

function playAgain() {
    console.log("play agin button click")
    resetGame();
    startGame();
}

function resetGame() {
    shotsFired = 0;
    hits = 0;
    negativeHits = 0;
    currentLevel = 0;
    ammoCount = maxAmmo;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameplay.removeChild(canvas);
}
function exitGame() {
    // localStorage.removeItem('leaderboard');

    window.location.href ="index1.html";  
}

const exitGameBtn = document.getElementById('exit-game-btn');
exitGameBtn.addEventListener('click', exitGame);


    
    
});
