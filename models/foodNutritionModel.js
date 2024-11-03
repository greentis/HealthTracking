const mongoose = require("mongoose");

const foodNutritionSchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Name is required"]
        },
        unit: {
            type: String,
            required: true,
            default: "Weight"
        },
        protein: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const foodNutritionModel = mongoose.model("Product", foodNutritionSchema);

module.exports = foodNutritionModel;