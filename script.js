document.getElementById('generate-btn').addEventListener('click', async () => {
    const clientName = document.getElementById('client-name').value;

    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName })
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Договор.docx';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } else {
        alert('Ошибка генерации договора.');
    }
});