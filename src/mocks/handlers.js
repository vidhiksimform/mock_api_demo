import { rest } from "msw";
import { addTodoMockData, listTodoMockData } from "./mockData";
import { getApiUrl } from "../utils";

export const handlers = [
  rest.get(getApiUrl("posts"), async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(listTodoMockData));
  }),

  rest.post(getApiUrl("posts"), async (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(addTodoMockData));
  }),
];
