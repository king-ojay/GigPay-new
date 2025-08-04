require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const User = require("./models/User");

async function fixUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    for (const user of users) {
      console.log(`User: ${user.email}`);
      console.log(`  - passwordHash exists: ${!!user.passwordHash}`);
      console.log(`  - passwordHash length: ${user.passwordHash ? user.passwordHash.length : 0}`);
      
      // If passwordHash is missing or invalid, remove the user (they'll need to re-register)
      if (!user.passwordHash || user.passwordHash.length < 10) {
        console.log(`  - Removing user ${user.email} due to invalid passwordHash`);
        await User.deleteOne({ _id: user._id });
      }
    }

    console.log("User cleanup completed");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixUsers();