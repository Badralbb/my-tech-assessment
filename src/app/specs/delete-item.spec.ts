import { DELETE } from "../api/delete-item/[id]/route";

jest.mock("@/db/DB", () => ({
  DB: {
    collection: jest.fn().mockReturnValue({
      deleteOne: jest
        .fn()
        .mockResolvedValueOnce({
          _id: "2",
          countryName: "badral",
        })
        .mockRejectedValueOnce(new Error("Error")),
    }),
  },
}));

describe("delete countries test", () => {
  let ResponseMock: typeof Response;

  beforeEach(() => {
    // Mock the global Response API
    ResponseMock = {
      json: jest.fn().mockImplementation((body, init) => ({
        body,
        status: init?.status || 200,
      })),
    } as unknown as typeof Response;

    global.Response = ResponseMock;
  });
  const params = Promise.resolve({ id: "1221421412" });
  it("if it succussfully deleted", async () => {
    const result = await DELETE(new Request(""), { params });
    expect(result.status).toEqual(200);
  });
  it("if it unsuccussfully created", async () => {
    const result = await DELETE(new Request(""), { params });
    expect(result.status).toEqual(400);
  });
});
