import { Document } from 'mongoose';

export interface Capture extends Document {
  readonly mushroom_name: string;
  readonly location: {
    lat: number;
    lng: number;
  };
  readonly captured_by: string;
  readonly captured_date: Date;
}
