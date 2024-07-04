import { Schema } from 'mongoose';

const BaseEntitySchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now,
    select: false,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    select: false,
  },
  deleted_at: {
    type: Date,
    select: false,
  },
});

export default BaseEntitySchema;
