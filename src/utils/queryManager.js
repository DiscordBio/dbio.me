module.exports.parseUrl = (url, queries) => {
    if (queries) {
        url += "&";

        for (const [key, value] of Object.entries(queries)) {
            url += `${key}=${value}&`;
        }

        url = url.slice(0, -1);
    }

    return url;
};

module.exports.addQuery = (router, ...queries) => {
    const path = router.pathname;
    
    let query = {
        ...router.query
    };
    
    queries.forEach(q => {
        query = {...query, ...q};
    });

    return path + "?" + Object.keys(query).map(key => key + "=" + query[key]).join("&");
};

module.exports.removeQuery = (router, q) => {
    const path = router.pathname;
    
    let query = {
        ...router.query
    };
    
    delete query[q];
    return path + "?" + Object.keys(query).map(key => key + "=" + query[key]).join("&");
};

module.exports.resetQuery = (router) => {
    const path = router.pathname;
    return path;
};

module.exports.appendQuery = (router, q, value) => {
    const path = router.pathname;
    let query = {
        ...router.query
    };

    query[q] = query[q] ? query[q] + "," + value : value;

    return path + "?" + Object.keys(query).map(key => key + "=" + query[key]).join("&");
}

module.exports.removeQueryValue = (router, q, value) => {
    const path = router.pathname;
    let query = {
        ...router.query
    };

    query[q] = query[q].split(",").filter(v => v !== value).join(",");

    if (query[q] === "") {
        delete query[q];
    }

    return path + "?" + Object.keys(query).map(key => key + "=" + query[key]).join("&");
}