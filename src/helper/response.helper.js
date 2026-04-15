/**
 * Send response success with HATEOAS standar .
 * 
 * @param {Object} res - Objek response Express.
 * @param {Number} code - HTTP Status Code.
 * @param {String} message - Message success.
 * @param {Object|Array} data - Data sending.
 * @param {Array} links - List link navigasi { rel, method, href }.
 */
export default function ResponseOk(res, code = 200, message = "Success", data = null, links = []) {
    const hypermediaLinks = links.reduce((acc, link) => {
        acc[link.rel] = {
            href: link.href,
            method: link.method || "GET"
        };
        return acc;
    }, {});

    res.status(code).json({
        success: true,
        message: message,
        data: data,
        _links: hypermediaLinks
    });
}


export function ResponseErr(res, { code, message, errors, links }) {
    res.status(code).json({
        success: false,
        message,
        errors,
        links
    })
}

/**
 * Send response error 404 with HATEOAS standar.
 * 
 * @param {Object} res - Objek response Express
 * @param {Object} options - Detail error
 * @param {string|Array} options.errors - Detail error.
 * @param {Array} options.links - Array objek link { rel, href }.
 */
export function ResponseErr404(res, { errors, links = [] }) {
    res.setHeader('Content-Type', 'application/problem+json');

    return res.status(404).json({
        type: "http://localhost:3000", // change when it depoloy to http://68.183.226.223:3001
        title: "Resource Not Found",
        status: 404,
        detail: (errors?.message || errors || "404 Not Found"),
        instance: res.req.originalUrl,
        _links: links.reduce((acc, link) => {
            acc[link.rel] = { href: link.href };
            return acc;
        }, {})
    });
}

/**
 * Send response error 500 with HATEOAS standar.
 * 
 * @param {Object} res - Objek response Express
 * @param {Object} options - Detail error
 * @param {Error|string} options.errors - Objek error.
 * @param {Array} options.links - Array object link { rel, href }.
 */
export function ResponseErr500(res, { error, links = [] }) {
    res.setHeader('Content-Type', 'application/problem+json');

    return res.status(500).json({
        type: "http://localhost:3000",
        title: "Internal Server Error",
        status: 500,
        detail: (error?.message || error || "An unexpected error occurred while processing the request."),
        instance: res.req.originalUrl,
        _links: links.reduce((acc, link) => {
            acc[link.rel] = { href: link.href };
            return acc;
        }, {})
    });
}
