const form = document.querySelector('#add-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const statusSelect = document.querySelector('#status-select');
const errorTip = document.querySelector('#error-tip');
const recordList = document.querySelector('#record-list');

let comicList = [];

function render() {
    recordList.innerHTML = '';
    if (comicList.length === 0) {
        const li = document.createElement('li');
        li.textContent = "暂无漫画阅读记录，请添加！";
        recordList.appendChild(li);
        return;
    }

    comicList.forEach(comic => {
        const li = document.createElement('li');
        li.className = `record-item status-${comic.status}`;

        const textSpan = document.createElement('span');
        textSpan.textContent = `${comic.title} | ${comic.author} | ${comic.status}`;

        const delBtn = document.createElement('button');
        delBtn.classList.add('del-btn');
        delBtn.textContent = "删除";
        delBtn.dataset.id = comic.id;

        li.appendChild(textSpan);
        li.appendChild(delBtn);
        recordList.appendChild(li);
    })
}

recordList.addEventListener('click', function (e) {
    if (e.target.classList.contains('del-btn')) {
        const delId = Number(e.target.dataset.id);
        comicList = comicList.filter(item => item.id !== delId);
        render();
    }
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorTip.textContent = '';

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const status = statusSelect.value;

    if (title === '') {
        errorTip.textContent = '漫画名称不能为空！';
        return;
    }
    if (author === '') {
        errorTip.textContent = '作者不能为空！';
        return;
    }

    comicList.push({
        id: Date.now(),
        title: title,
        author: author,
        status: status
    })

    titleInput.value = '';
    authorInput.value = '';
    statusSelect.value = '未读';

    render();
})

render();
