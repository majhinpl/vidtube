import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const helthcheck = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "ok", "helthcheck passed"));
});

export { helthcheck };
