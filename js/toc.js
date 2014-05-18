(function() {
    var article = document.body.getElementsByTagName("article");
    if (article.length != 1)
        return false;

    article = article[0];

    var container = document.getElementById("toc");
    if (!container) {
        container = document.createElement("nav");
        container.id = "toc";
        document.body.insertBefore(container, document.body.firstChild);
    }
    var tocTitle = document.createElement('span');
    tocTitle.innerHTML = "Table of Contents";
    tocTitle.className = "title";

    var h1 = article.getElementsByTagName("h1")[0];
    var h1Link = document.createElement("a");
    h1Link.href = "#" + h1.id;
    h1Link.innerHTML = h1.innerHTML;

    h1 = document.createElement("h1");
    h1.appendChild(h1Link);

    function recursion(oldlevel, root) {
        for (var i = 0; i < root.childNodes.length; ++i) {
            if (root.childNodes[i].nodeType !== 1)
                continue;

            var node = root.childNodes[i];
            var ctx = toc;
            var tagName = node.nodeName.toLowerCase();

            var link = document.createElement("a");
            link.href = "#" + node.id;
            link.innerHTML = node.innerHTML;

            if (tagName === "h1") {
                continue;
            } else
            if (tagName.length == 2 && tagName.charAt(0) == "h" && tagName !== "hr") {
                var level = tagName.charAt(1);
                for (var n = 1; n < level; n++) {
                    if(ctx.lastChild)
                        ctx = ctx.lastChild;
                }
                var li = document.createElement('li');
                li.appendChild(link);
                if (level > oldlevel) {
                    var ol = document.createElement('ol');
                    ol.appendChild(li);
                    ctx.appendChild(ol);
                } else if (level == oldlevel) {
                    ctx.lastChild.appendChild(li);
                } else {
                    ctx.appendChild(li);
                }
                oldlevel = level;
            } else
            if (node.childNodes.length > 0) {
                ctx = recursion(oldlevel, node);
            }
        }
        return ctx;
    }

    function tocGen(toc, root) {
        var oldlevel = 0;
        toc = recursion(oldlevel, root);

    }
    tocGen(container,article);

    toc.insertBefore(tocTitle, toc.firstChild);
    toc.insertBefore(h1, toc.firstChild);
})();
