import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "Title is required"],
    },
    contenido: {
        type: String,
        required: [true, "Content is mandatory"],
    },
    categoria: {
        type: String,
        required: [true, "Category is required"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    comentarios: [{
        usuario: {
            type: String,
        },
        comentario: {
            type: String,
        },
    }],
});

export default mongoose.model("Publication", PublicationSchema);
