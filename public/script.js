document.getElementById('submit').addEventListener('click', async function() {
    const question = document.getElementById('research-question').value;
    const response = document.getElementById('response');

    if (!question) {
        response.innerHTML = "<p style='color: #ef4444;'>Please enter a question before submitting.</p>";
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });

        const data = await res.json();
        response.innerHTML = `
            <h2 style="color: #60a5fa;">Response:</h2>
            <p><strong>Question:</strong> "${question}"</p>
            <p>${data.answer}</p>
        `;
    } catch (error) {
        if (error.name === 'SyntaxError' && error.message.startsWith('JSON.parse')) {
            response.innerHTML = "<p style='color: #ef4444;'>The server returned an invalid JSON response.</p>";
        } else {
            response.innerHTML = "<p style='color: #ef4444;'>An error occurred. Please try again later.</p>";
        }
        console.error(error);
    }
});