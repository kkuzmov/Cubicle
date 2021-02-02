const config = {
    development: {
        PORT: 5000,
    },
    production: {
        PORT: 80,
    }
};

module.exports = config[process.env.NODE_ENV.trim()];

// КОНФИГУРИРАНЕ НА ПОРТ - АКО Е DEVELOMPENT - 5000, ЗА PRODUCTION - 80
// СТАНДАРТНИ ПОРТОВЕ, ВЗИМАТ СЕ В ЗАВИСИМОСТ ОТ ТОВА, КАК СТАРТИРАШ ПРИЛОЖЕНИЕТО - С nPM START(DEV) ИЛИ NPM PROD(PRODUCTION)





// ЧАСТ ОТ EXAM PACKAGE