export declare class Parser {
    /**
     * Parses all the data
     * @return {any} The parsed data needed for views
     */
    parse: (filePath: string) => any;
    /**
     * Parse the documentation file
     * @return {any} The parsed documentation file
     */
    private parseFile;
    /**
     * Parse the data from the documentation file
     * @param data The parsed documentation file
     * @return {any} The data needed to show views
     */
    private parseData;
}
declare const _default: Parser;
export default _default;
