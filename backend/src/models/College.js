const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const College = mongoose.model("College", collegeSchema);

module.exports = College;