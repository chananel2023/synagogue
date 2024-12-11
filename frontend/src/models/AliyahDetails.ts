export interface AliyahDetails {
    _id: string;
    description: string;
    price: number;
    date: string; // או Date אם התאריך מוחזר כאובייקט Date
    buyer: string;
    isPaid:boolean
}
