import { Like } from "../types";

export interface LikeDao {
  createLike: (like: Like) => Promise<Like | null>;
}
