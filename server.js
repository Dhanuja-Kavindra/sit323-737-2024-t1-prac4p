
const express = require('express');
const winston = require('winston');
const cal_app = express();
const port = 8080;

// Logging Configuration for Winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

cal_app.use(express.json());

// API Endpoints for Arithmatic Operations

// Endpoint - Subtraction
cal_app.post('/subtract', (req, res) => {
    const { num1, num2, operation } = req.body;
    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        logger.log({
            level: 'error',
            message: `Invalid inputs for ${operation} operation`
            });
        const result = `Invalid inputs for ${operation} operation`;
        res.send({result});
            
        return res.status(400).send({ error: 'Invalid input numbers' });
        
    }
    const result = num1 - num2;
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`
        });
    res.send({ result });
});

// Endpoint - Multiplication
cal_app.post('/multiply', (req, res) => {
    const { num1, num2, operation } = req.body;
    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        logger.log({
            level: 'error',
            message: `Invalid inputs for ${operation} operation`
            });
        
        const result = `Invalid inputs for ${operation} operation`;
        res.send({result});
        return res.status(400).send({ error: 'Invalid input numbers' });
    }
    const result = num1 * num2;
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`
        });
    res.send({ result });
});

// Endpoint - Addition
cal_app.post('/add', (req, res) => {
    const { num1, num2, operation } = req.body;
    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        logger.log({
            level: 'error',
            message: `Invalid inputs for ${operation} operation`
            });
        
        const result = `Invalid inputs for ${operation} operation`;
        res.send({result});
        return res.status(400).send({ error: 'Invalid input numbers' });
    }
    const result = num1 + num2;
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`
        });
    res.send({ result });
});

// Endpoint - Division
cal_app.post('/divide', (req, res) => {
    const { num1, num2, operation } = req.body;
    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        logger.log({
            level: 'error',
            message: `Invalid inputs for ${operation} operation`
            });
        
        const result = `Invalid inputs for ${operation} operation`;
        res.send({result});
        return res.status(400).send({ error: 'Invalid input numbers' });
    }
    if (num2 === 0) {
        logger.log({
            level: 'error',
            message: `Zero received for ${operation} operation`
            });
       
        const result = `Zero received for ${operation} operation`;
        res.send({result});
        return res.status(400).send({ error: 'Cannot divide by zero' });
    }
    const result = num1 / num2;
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`
        });
    res.send({ result });   
});

// Logging
cal_app.listen(port, () => {
    console.log(`Calculator microservice running at http://localhost:${port}`);
    
});

// Serving index.html
cal_app.use(express.static('.'));

