document.getElementById('generate-btn').addEventListener('click', function() {
    // Собираем данные из формы
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const address = document.getElementById('address').value;

    // Проверяем, чтобы все поля были заполнены
    if (!name⠟⠞⠞⠟⠵⠺⠵⠟⠞!address) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    // Генерируем текст договора
    const contractText = `
        Договор между стороной ${name}, с адресом ${address}, и стороной, заключившей контракт на дату ${date}.
        
        Согласие сторон достигнуто на следующих условиях:
        1. Строка 1
        2. Строка 2
        3. Строка 3
        
        Подписано в ${date}.
    `;

    // Отображаем сгенерированный договор
    document.getElementById('generated-output').innerText = contractText;
});