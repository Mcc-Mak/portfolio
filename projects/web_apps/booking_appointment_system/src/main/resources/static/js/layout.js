const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

const initGlobal = async () => {

    const token = $('meta[name="_csrf"]').attr('content');
    const header = $('meta[name="_csrf_header"]').attr('content');
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });

    async function globalConstants(URL) {
        let response = await $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            cache: false,
            url: URL,
        });
        return response;
    }
    const roleMap = await globalConstants(url = "/api/user/getBackendMap?attr=role");

    let loggedInRole = $('#LoggedIn-Role')[0];
    loggedInRole.setAttribute('value', roleMap[loggedInRole.getAttribute('value')]);
}
initGlobal();
