module.exports = {
    apps: [{
        name: "kitchat",
        script: "index.js",
        cwd: "/var/www/kitchat",
        env: {
            "NODE_ENV": "production",
            "PORT": "5000"
        }
    }]
};