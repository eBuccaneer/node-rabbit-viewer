import { Router } from "express";
export declare class BasicRoutes {
    static filePath: string;
    /**
     * Applies all REST user routes
     */
    static applyTo: (router: Router) => void;
}
