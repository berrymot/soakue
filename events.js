var worker = { postMessage() { } };
var page, res = [];
window.addEventListener("scroll", function (e) {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
        page++;
        load(res, page);
        checkLength();
    }
});
function checkLength() {
    if (res && (page + 1) * 100 - 1 >= res.length) {
        $`bottom`.innerHTML = res.length ? "ꝡofào ka" : "";
    }
}
function clearRes() {
    res = null;
    [`res`, `len`, `bottom`].forEach(x => $(x).innerHTML = "");
}

function navigate(q, push_state = true, is_search = false) {
    clearRes();
    if (!is_search) $`search`.value = q;

    if (q == '') {
        page = 0;
        return
    }

    let newLink = window.location.href.split("?")[0] + (q ? "?q=" + encodeURIComponent(q) : '')
    if (push_state) {
        window.history.pushState('', '', newLink)
    } else {
        window.history.replaceState('', '', newLink)
    }

    $`bottom`.innerHTML = "chum lao jí pó jóaıse"
    worker.postMessage({ q })
}

let timer;
$`search`.addEventListener("input", function () {
    clearTimeout(timer);
    clearRes();
    timer = setTimeout(() => {
        navigate(this.value.trim(), false, true);
    }, 100)
});
$`clear`.addEventListener("click", function () {
    $`search`.focus();
    navigate("", false);
});
$`english`.addEventListener("click", function () {
    let newQuery =
        $`search`.value.split(" ")
            .filter(t => !/^([!-]|not:)*(\$|scope:)/.test(t))
            .concat(["$en"]).join(" ").trim();
    $`search`.focus();
    navigate(newQuery, false);
});
