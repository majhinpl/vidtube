import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // if ((req.body = "" || {})) {
  //   throw new ApiError(400, "Blanks not accepted!");
  // }
  const { fullName, email, username, password } = req.body;

  //   validation

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required.");
  }

  // checking the existing data.
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "email or username is already register.");
  }

  console.warn(req.files);

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "Avatar files is missing.");
  // }
  // const avatar = await uploadOnCloudinary(avatarLocalPath);

  // if (!coverImageLocalPath) {
  //   throw new ApiError(400, "Avatar files is missing.");
  // }
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Uploaded avatar", avatar);
  } catch (error) {
    console.log("Error uploading avatar", error);
    throw new ApiError(500, "Error uploading avatar.");
  }

  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("Uploaded coverImage", coverImage);
  } catch (error) {
    console.log("Error uploading coverImage", error);
    throw new ApiError(500, "Error uploading coverImage.");
  }

  const user = await User.create({
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    username: username.toLowerCase(),
    fullName,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-papassword -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while creating the user.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "user registerd successfully."));
});

export { registerUser };
