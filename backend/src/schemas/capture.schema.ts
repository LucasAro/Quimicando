import { Schema } from 'mongoose';

export const CaptureSchema = new Schema({
  mushroom_name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  captured_by: { type: String, required: true },
  captured_date: { type: Date, default: Date.now },
});
