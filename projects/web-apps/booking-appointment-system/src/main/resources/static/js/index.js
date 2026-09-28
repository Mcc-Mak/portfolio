const request = async () => {

    const url = {
        "meta": '/meta-data'
    };

    async function syncLoad(url) {
        const response = await fetch(url);
        const dataList = await response.json();
        return dataList;
    }

    const metaData = await syncLoad(url.meta);

    const html = [
        '<div class="list-group">',
        '<a href="#" class="list-group-item list-group-item-action list-group-item">(Main)</a>',
        '<a href="#" class="list-group-item list-group-item-action list-group-item-info">Query booking</a>',
        '<a href="#" class="list-group-item list-group-item-action list-group-item-success">Add booking</a>',
        '<a href="#" class="list-group-item list-group-item-action list-group-item-danger">Drop booking</a>',
        '</div>'
    ];

    if(metaData.role == 'ROLE_ADMIN') {
        html.push('<a href="#" class="list-group-item list-group-item-action list-group-item-warning">Configuration</a>');
        html.push('<a href="#" class="list-group-item list-group-item-action list-group-item-info">Audit log</a>');
        html.push('<a href="#" class="list-group-item list-group-item-action list-group-item-success">Activate user</a>');
        html.push('<a href="#" class="list-group-item list-group-item-action list-group-item-danger">Delete user</a>');
    }

    Swal.fire({
        icon: 'info',
        title: '<h4><pre>Welcome to<br>booking appointment system!<pre></h4>',
        html: html.join(''),
        footer: '<footer>Copyright &copy; 2022</footer>'
    })
}

request();
