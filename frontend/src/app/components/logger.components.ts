export class Logger {

    /**
     * writes the source, operation and result on console.
     * @param log - log string
     */
    log(log: any) {
        console.log('[LOG]: ' + + log);
    }

    /**
     * writes the source, operation and result on console.
     * @param log - log string
     */
    logWarning(log: any) {
        console.warn('[WARNING]: ' + log);
    }

    /**
     * writes the source, operation and result on console.
     * @param log - log string
     */
    logError(log: any) {
        console.error('[ERROR]: ' + log);
    }
}
