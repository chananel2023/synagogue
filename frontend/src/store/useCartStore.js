import { create } from "zustand";
import axios from "../lib/axios"; // נניח שזה הקובץ שלך לאקסיוס
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [], // רשימת עליות שנמצאות בעגלת קניות
    total: 0, // סכום כולל

    // שמירה על העליות בעגלה
    getCartItems: async () => {
        try {
            const res = await axios.get("/cart"); // קריאה ל-API להחזרת פרטי העגלה
            set({ cart: res.data });
            get().calculateTotal();
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response.data.message || "שגיאה בהחזרת העגלה");
        }
    },

    // הוספת עלייה לעגלה
    addToCart: async (aliyah) => {
        try {
            await axios.post("/cart", { aliyahId: aliyah._id }); // הוספת עלייה לעגלה
            toast.success("העלייה נוספה לעגלה");

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === aliyah._id);
                const newCart = existingItem
                    ? prevState.cart.map((item) =>
                        item._id === aliyah._id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                    : [...prevState.cart, { ...aliyah, quantity: 1 }];
                return { cart: newCart };
            });
            get().calculateTotal();
        } catch (error) {
            toast.error(error.response.data.message || "שגיאה בהוספת העלייה");
        }
    },

    // הסרת עלייה מהעגלה
    removeFromCart: async (aliyahId) => {
        try {
            await axios.delete(`/cart`, { data: { aliyahId } });
            set((prevState) => ({
                cart: prevState.cart.filter((item) => item._id !== aliyahId),
            }));
            get().calculateTotal();
        } catch (error) {
            toast.error(error.response.data.message || "שגיאה בהסרת העלייה");
        }
    },

    // חישוב הסכום הכולל של העליות בעגלה
    calculateTotal: () => {
        const { cart } = get();
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total });
    },

    // ניקוי העגלה
    clearCart: async () => {
        set({ cart: [], total: 0 });
    },
}));
