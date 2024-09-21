import { UserDao } from "./UserDao";
import { PostDao } from "./PostDao";
import { LikeDao } from "./LikeDao";
import { CommentDao } from "./CommentDao";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}
