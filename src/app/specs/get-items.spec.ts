import { GET } from "../api/get-items/route";

jest.mock("@/db/DB", () => ({
  DB: {
    collection: jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValueOnce({
        toArray: jest
          .fn()
          .mockReturnValueOnce([{ _id: "1", countryName: "badral" }])
          .mockReturnValueOnce(new Error("Error")),
      }),
    }),
  },
}));

describe("get countries test", () => {
  let ResponseMock: typeof Response;

  beforeEach(() => {
    // Mock the Response API
    ResponseMock = {
      json: jest.fn().mockImplementation((body, init) => ({
        body,
        status: init?.status || 200,
      })),
    } as unknown as typeof Response;

    global.Response = ResponseMock;
  });
  const mockdata = [{ _id: "1", countryName: "badral" }];

  it("if it succussfully work", async () => {
    const result = await GET();
    expect(result.status).toEqual(200);
  });
  it("if it unsuccussfully work", async () => {
    const result = await GET();
    expect(result.status).toEqual(400);
  });
});
