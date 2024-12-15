import { POST } from "../api/add-item/route";

jest.mock("@/db/DB", () => ({
  DB: {
    collection: jest.fn().mockReturnValue({
      insertOne: jest
        .fn()
        .mockResolvedValueOnce({
          _id: "2",
          countryName: "badral",
        })
        .mockRejectedValueOnce(new Error("Error")),
    }),
  },
}));

describe("add countries test", () => {
  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = {
      json: jest.fn().mockResolvedValue({
        countryName: "badral",
      }),
    } as unknown as Request;

    global.Response = {
      json: jest.fn().mockImplementation((body, init) => ({
        ...body,
        status: init?.status || 200,
      })),
    } as unknown as typeof Response;
  });
  it("if it succussfully created", async () => {
    const result = await POST(mockRequest);
    expect(result.status).toEqual(200);
  });
  it("if it unsuccussfully created", async () => {
    const result = await POST(mockRequest);
    expect(result.status).toEqual(400);
  });
});
