// import bookmarkModel from "../models/bookmarkModel.js";
import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";

export const handleAllBookmarks = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId).select("bookmarks").populate({
      path: "bookmarks"
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ bookmarks: user.bookmarks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const handleAddBookmark = async (req, res) => {
  try {
    const { userId } = req.user; // Get the user ID from the authentication middleware
    const { jobId } = req.body; // Get the job ID from the request body
    
    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the job post exists
    const jobPost = await jobModel.findById(jobId);
    if (!jobPost) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the bookmark already exists for this user and job
    if (user.bookmarks.includes(jobId)) {
      return res
        .status(400)
        .json({ message: "Bookmark already exists for this job" });
    }
    user.bookmarks.push(jobId); // Add the bookmark ID to user's bookmarks
    await user.save(); // Save the updated user

    return res.status(201).json({ message: "Bookmark added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const handleDeleteBookmark = async (req, res) => {
  try {
    const { userId } = req.user;  // Assuming user is already authenticated and attached to req
    const { jobId } = req.body;
  
    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Check if the job is bookmarked
    const isExist = user.bookmarks.indexOf(jobId);
    if (isExist===-1) {
      return res.status(404).json({ message: "Bookmark job not found" });
    }
  
    // Filter out the jobId from bookmarks and update the array
    user.bookmarks = user.bookmarks.filter((job) => job.toString() !== jobId);
  
    // Save the updated user data
    await user.save();
  
    // Respond with success
    return res.status(200).json({ success: true, message: "Job unbookmarked" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }  
};