const express = require('express');
const winston = require('winston');
const cal_app = express();
const port = 8080;

// Logging configuration for Winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-service' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

cal_app.use(express.json());

// Arithmatic Functions
const add = (num1, num2) => {
    return num1 + num2;
};

const subtract = (num1, num2) => {
    return num1 - num2;
};

const multiply = (num1, num2) => {
    return num1 * num2;
};

const divide = (num1, num2) => {
    if (num2 === 0) {
        throw new Error("Division by zero error");
    }
    return num1 / num2;
};

// Endpoint -1 : ADD
cal_app.get('/add', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const originalNum1Str = req.query.num1.toString();
        const originalNum2Str = req.query.num2.toString();

        if (num1.toString() !== originalNum1Str) {
            throw new Error("Parsing Error...! number 1 incorrectly defined");
        }

        if (num2.toString() !== originalNum2Str) {
            throw new Error("Parsing Error...! number 2 incorrectly defined");
        }
        
        const result = add(num1, num2);
        logger.info(`Add operation successful: ${num1} + ${num2} = ${result}`);
        res.status(200).json({statuscode:200, data: result});
    } catch (error) {
        logger.error(`Add operation error: ${error}`);
        res.status(500).json({statuscode:500, message: error.toString()})
    }
});

// Endpoint -2 : SUBTRACT
cal_app.get('/subtract', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const originalNum1Str = req.query.num1.toString();
        const originalNum2Str = req.query.num2.toString();

        if (num1.toString() !== originalNum1Str) {
            throw new Error("Parsing Error...! number 1 incorrectly defined");
        }

        if (num2.toString() !== originalNum2Str) {
            throw new Error("Parsing Error...! number 2 incorrectly defined");
        }

        const result = subtract(num1, num2);
        logger.info(`Subtract operation successful: ${num1} - ${num2} = ${result}`);
        res.status(200).json({statuscode:200, data: result});
    } catch (error) {
        logger.error(`Subtract operation error: ${error}`);
        res.status(500).json({statuscode:500, message: error.toString()})
    }
});

// Endpoint -3 : MULTIPLY
cal_app.get('/multiply', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const originalNum1Str = req.query.num1.toString();
        const originalNum2Str = req.query.num2.toString();

        if (num1.toString() !== originalNum1Str) {
            throw new Error("Parsing Error...! number 1 incorrectly defined");
        }

        if (num2.toString() !== originalNum2Str) {
            throw new Error("Parsing Error...! number 2 incorrectly defined");
        }

        const result = multiply(num1, num2);
        logger.info(`Multiply operation successful: ${num1} * ${num2} = ${result}`);
        res.status(200).json({statuscode:200, data: result});
    } catch (error) {
        logger.error(`Multiply operation error: ${error}`);
        res.status(500).json({statuscode:500, message: error.toString()})
    }
});

// Endpoint -4 : DIVIDE
cal_app.get('/divide', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const originalNum1Str = req.query.num1.toString();
        const originalNum2Str = req.query.num2.toString();

        if (num1.toString() !== originalNum1Str) {
            throw new Error("Parsing Error...! number 1 incorrectly defined");
        }

        if (num2.toString() !== originalNum2Str) {
            throw new Error("Parsing Error...! number 2 incorrectly defined");
        }

        const result = divide(num1, num2);
        logger.info(`Divide operation successful: ${num1} / ${num2} = ${result}`);
        res.status(200).json({statuscode:200, data: result});
    } catch (error) {
        logger.error(`Divide operation error: ${error}`);
        res.status(500).json({statuscode:500, message: error.toString()})
    }
});

cal_app.listen(port, () => {
    logger.info(`Calculator service running at http://localhost:${port}`);
});

cal_app.use(express.static('.'));
