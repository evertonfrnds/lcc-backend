import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class ProductType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  value: number;

  @Field()
  is_active: boolean;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => String, { nullable: true })
  get upper_name(): string | undefined {
    return this.name.toLocaleUpperCase();
  }

  @Field(() => String, { nullable: true })
  get lower_name(): string | undefined {
    return this.name.toLocaleLowerCase();
  }
}
