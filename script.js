document.getElementById('generateButton').addEventListener('click', function () {
    // Получение данных из формы
    const fio = document.getElementById('fio').value;
    const subject = document.getElementById('subject').value;
    const date = document.getElementById('date').value;

    // Проверка заполненности формы
    if (!fio⠞⠟⠵⠺⠞⠵⠺⠵⠺⠟⠞⠟!date) {
        alert("Пожалуйста, заполните все поля формы.");
        return;
    }

    // Загрузка шаблона договора
    fetch("template.docx")
        .then(response => {
            if (!response.ok) throw new Error("Не удалось загрузить шаблон договора.");
            return response.arrayBuffer();
        })
        .then(data => {
            const zip = new PizZip(data);
            const doc = new window.docxtemplater().loadZip(zip);

            // Вставка данных в шаблон
            doc.setData({
                fio: fio,
                subject: subject,
                date: date
            });

            try {
                // Генерация документа
                doc.render();
                const output = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                // Сохранение файла
                saveAs(output, "Договор.docx");
            } catch (error) {
                console.error("Ошибка генерации документа:", error);
            }
        })
        .catch(error => {
            alert("Произошла ошибка: " + error.message);
        });
});