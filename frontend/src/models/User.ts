import { AliyahDetails } from "./AliyahDetails";
export interface User {
    userId: string;
    name: string;
    paidSum: number;
    unpaidSum: number;
    aliyahDetails: AliyahDetails[];
}