import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);

    return res.status(429).json({

      type: "https://httpstatuses.com/429",
      title: "Too Many Requests",
      status: 429,
      detail: "Terlalu banyak percobaan login, tunggu 10 menit",

      _links: [{
        self: {
          href: req.originalUrl,
          method: req.method,
          after: retryAfter+" second",
        },
        retry: {
          href: req.originalUrl,
          method: req.method,
          after: retryAfter+" second",
        },
        home: {
          href: "/",
          method: "GET"
        }
      }]
    });
  }
});

export default authLimiter