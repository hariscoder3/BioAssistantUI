document.getElementById('submit').addEventListener('click', function() {
    const category = document.getElementById('research-category').value;
    const question = document.getElementById('research-question').value;
    const response = document.getElementById('response');
    
    if (!category) {
        response.innerHTML = "<p style='color: #ef4444;'>Please select a research category before submitting.</p>";
        return;
    }
    
    response.innerHTML = `
        <h2 style="color: #60a5fa;">Response:</h2>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Question:</strong> "${question}"</p>
        <p>AI-generated response appear here</p>
    `;
});