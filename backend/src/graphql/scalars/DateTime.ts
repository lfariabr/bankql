import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A date and time, represented as an ISO-8601 string',
  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new Error(`DateTime cannot represent non-Date value: ${value}`);
    }
    return value.toISOString();
  },
  parseValue(value: unknown): Date {
    if (typeof value !== 'string') {
      throw new Error(`DateTime cannot represent non-string value: ${value}`);
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`DateTime cannot represent invalid date: ${value}`);
    }
    return date;
  },
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind !== Kind.STRING) {
      throw new Error(`DateTime cannot represent non-string value: ${ast.kind}`);
    }
    const date = new Date(ast.value);
    if (isNaN(date.getTime())) {
      throw new Error(`DateTime cannot represent invalid date: ${ast.value}`);
    }
    return date;
  },
});