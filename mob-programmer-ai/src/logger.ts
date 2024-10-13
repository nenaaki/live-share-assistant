import * as vscode from 'vscode';
import * as winston from 'winston';

// TODO: winstonロガーの設定
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
    ],
});

// loggerとOutputChannelのエクスポート
export { logger };