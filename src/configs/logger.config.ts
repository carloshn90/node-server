import { format, transports } from 'winston';
import winston = require('winston');

export const LOGGER = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'node-server' },
    transports: [
        new winston.transports.Console({level: 'debug', format: format.combine(format.colorize(), format.simple())}),
        new transports.File({ filename: 'server.log', format: format.logstash()})
    ]
});
