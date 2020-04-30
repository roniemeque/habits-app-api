import { Collection } from "mongodb";

interface Context {
  db: {
    users: Collection;
    goals: Collection;
  };
}

type ResolverFn = (parent: any, args: any, ctx: Context) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}
