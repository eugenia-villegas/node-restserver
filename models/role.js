import { Schema, model } from "mongoose";

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Rol is necessary']
    }
});

export default model("Role", RoleSchema)