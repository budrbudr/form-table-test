'use strict';

const serverData = [];
//submit btn
document.getElementById('submit-btn')
    .addEventListener('click', (e) => {
        e.preventDefault();
        alert('Данные успешно отправлены!');
        serializeData();
        innerToTableData();
    });

function serializeData() {
    const clientData = $('form').serializeArray();
    const dataObj = {};
    for (let i = 0; i < clientData.length; i++) {
        dataObj[clientData[i]['name']] = clientData[i]['value'];
        dataObj['status'] = false;
    }
    serverData.push(dataObj);
}

function innerToTableData() {
    const tableBody = document.querySelector('.table-body');
    tableBody.classList.add('items');
    tableBody.innerHTML = serverData.reduce((html, serverDataRow, arrIndex) =>
        html + `
             <tr class="item">
               <td>${serverDataRow.name}</td>
               <td>${serverDataRow.email}</td>
               <td>${serverDataRow.tel}</td>
               <td>${serverDataRow.comments}</td>
               <td>
               <button type="button" id="${arrIndex}" class="btn ${serverDataRow.status ? 'btn-success' : 'btn-danger'} not-complete">${serverDataRow.status ? 'Обработано' : 'Необработанная'}</button>
               </td>
             </tr>`, '');

    $('.not-complete').on('click', function (e) {
        if ($(this).hasClass('btn-danger')) {
            serverData[e.target.id].status = true;
            let question = confirm('Заявка обработана?');
            if (question) {
                $(this).removeClass('btn-danger')
                    .addClass('btn-success')
                    .text('Обработано');
            }
        }
    });
}



