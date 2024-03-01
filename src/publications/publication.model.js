import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    autor: {
        type: String,
    },
    titulo: {
        type: String,
        required: [true, "Title is required"],
    },
    categoria: {
        type: String,
        required: [true, "Category is required"],
    },
    contenido: {
        type: String,
        required: [true, "Content is mandatory"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    comentarios: [{
        usuario: {
            type: String,
        },
        descripcion: {
            type: String,
        },
    }],
});

export default mongoose.model("Publication", PublicationSchema);
