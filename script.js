document.getElementById('generate-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const address = document.getElementById('address').value;

    if (!name⠵⠵⠞⠞⠞⠟⠵⠟⠵!address) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    // Загружаем шаблон документа
    fetch('template.docx')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            const zip = new PizZip(arrayBuffer);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            // Подставляем данные в шаблон
            doc.setData({
                name: name,
                date: date,
                address: address,
            });

            try {
                // Рендерим документ
                doc.render();
            } catch (error) {
                console.error(error);
            }

            // Генерируем файл и скачиваем его
            const out = doc.getZip().generate({ type: 'blob' });
            saveAs(out, 'generated_contract.docx');
        })
        .catch(err => console.error(err));
});