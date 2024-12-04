import request from "supertest";
import app from "../server"; // השרת הראשי
import User from "../models/User";
import TorahAliyah from "../models/TorahAliyah";

// Mock למודלים
jest.mock("../models/User");
jest.mock("../models/TorahAliyah");

describe("Aliyah Controller Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("markAliyahAsPaid", () => {
        it("should mark an aliyah as paid", async () => {
            const userId = "674e3b4a61f16ffdc17c31b2";
            const aliyahId = "674e6a7fc170f34edb0636bb";
            const stripePaymentId = "pi_test_123";

            // Mock Data
            const mockUser = {
                _id: userId,
                cartItems: [{ _id: aliyahId, isPaid: false }],
                save: jest.fn(),
            };

            const mockAliyah = {
                _id: aliyahId,
                isPaid: false,
                save: jest.fn(),
            };

            User.findById.mockResolvedValue(mockUser);
            TorahAliyah.findById.mockResolvedValue(mockAliyah);

            const response = await request(app)
                .put("/api/aliyah/mark-paid")
                .send({ userId, aliyahId, stripePaymentId });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(mockAliyah.isPaid).toBe(true);
            expect(mockAliyah.save).toHaveBeenCalled();
            expect(mockUser.cartItems[0].isPaid).toBe(true);
            expect(mockUser.save).toHaveBeenCalled();
        });
    });

    describe("deleteAliyah", () => {
        it("should delete an aliyah", async () => {
            const userId = "674e3b4a61f16ffdc17c31b2";
            const aliyahId = "674e6a7fc170f34edb0636bb";

            // Mock Data
            const mockUser = {
                _id: userId,
                cartItems: [{ _id: aliyahId }],
                save: jest.fn(),
            };

            const mockAliyah = { _id: aliyahId };

            User.findById.mockResolvedValue(mockUser);
            TorahAliyah.findByIdAndDelete.mockResolvedValue(mockAliyah);

            const response = await request(app)
                .delete("/api/aliyah/delete")
                .send({ userId, aliyahId });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(mockUser.cartItems).toHaveLength(0);
            expect(mockUser.save).toHaveBeenCalled();
            expect(TorahAliyah.findByIdAndDelete).toHaveBeenCalledWith(aliyahId);
        });
    });
});
