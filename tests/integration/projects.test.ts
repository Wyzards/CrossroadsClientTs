jest.unmock('axios');

import { CrossroadsApiClient } from "../../src/CrossroadsApiClient";

const client = new CrossroadsApiClient("http://127.0.0.1:8000/api", "1|iRFqwv5iOZGrRsiq86JKQkvbAvsPQtgpqdKdvByL8b793ec6");

describe("Integration: CrossroadsApiClient.listAttachments", () => {

    it("returns attachment data from real API", async () => {
        const result = await client.projects.listAttachments(1);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 1,
                    path: "/image.jpg",
                }),
            ])
        );
    });
});