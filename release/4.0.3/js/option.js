function translateNodes(nodes)  {
    for (var node of nodes) {

        if (node.nodeType != 1) // skip if not ELEMENT_NODE
            continue;
        var tl = node.getAttribute('tl');
        if (!tl)
            continue;

        node.removeAttribute('tl');

        var hasTarget = tl.indexOf(':') > 0;
        var target = hasTarget ? tl.split(':')[0] : '';
        var msgId = hasTarget ? tl.split(':')[1] : tl;

        var message = chrome.i18n.getMessage(msgId);
        switch (target) {
            case 'html':
                node.innerHTML = message;
                break;
            case '':
            case 'text':
                node.textContent = message;
                break;
            default:
                node.setAttribute(target, message);
        }
    }
}
new MutationObserver(function(mutations) {
    for (var mutation of mutations) {
        translateNodes(mutation.addedNodes);
    }
}).observe(document, {subtree: true, childList: true});