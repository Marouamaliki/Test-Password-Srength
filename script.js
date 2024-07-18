function checkPasswordStrength() {
    let password = document.getElementById("password").value;
    let upper_case = /[A-Z]/.test(password);
    let lower_case = /[a-z]/.test(password);
    let special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let digits = /[0-9]/.test(password);
    
    let characters = [upper_case, lower_case, special, digits];
    let score = 0;
    let length = password.length;
    
    // Common password list (for demonstration purposes, you can replace it with actual file reading in backend)
    let commonPasswords = ["123456", "password", "123456789", "12345678", "12345", "1234567", "qwerty", "abc123", "password1"];
    
    if (commonPasswords.includes(password)) {
        document.getElementById("result").innerText = "Password was found in a common list. Score 0/7";
        updateProgressBar(0);
        return;
    }
    
    if (length > 8) score += 1;
    if (length > 12) score += 1;
    if (length > 17) score += 1;
    if (length > 20) score += 1;
    if (sum(characters) > 1) score += 1;
    if (sum(characters) > 2) score += 1;
    if (sum(characters) > 3) score += 1;
    
    let resultText = `Password length is ${length}, adding ${score} points!\n`;
    resultText += `Password has ${sum(characters)} different character types, adding ${sum(characters) - 1} points!\n`;
    
    if (score < 4) {
        resultText += `The password is quite weak! Score: ${score}/7`;
    } else if (score == 4) {
        resultText += `The password is ok! Score: ${score}/7`;
    } else if (score > 4 && score < 6) {
        resultText += `The password is pretty good! Score: ${score}/7`;
    } else {
        resultText += `The password is strong! Score: ${score}/7`;
    }
    
    document.getElementById("result").innerText = resultText;
    updateProgressBar(score);
}

function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}

function updateProgressBar(score) {
    let progressBar = document.getElementById("progress-bar");
    let percentage = (score / 7) * 100;
    progressBar.style.width = `${percentage}%`;
    progressBar.style.backgroundColor = getProgressBarColor(score);
}

function getProgressBarColor(score) {
    if (score < 4) {
        return "red";
    } else if (score == 4) {
        return "orange";
    } else if (score > 4 && score < 6) {
        return "yellow";
    } else {
        return "green";
    }
}
