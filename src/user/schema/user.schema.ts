import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import BaseEntitySchema from 'src/common/schema/base.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.add(BaseEntitySchema);

export { UserSchema };
