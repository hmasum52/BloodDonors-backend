import {db_proc, db_query} from "../database/oracle_db.js";

export default class PostRepository{
    insertOne = async (postInfo, autoCommit = true) => {
        let columns = Object.keys(postInfo).join(', ');
        let params = Object.values(postInfo);
        const query = `
            insert into post 
            (${columns}) values(:1, :2, :3, :4)
        `
        return await db_query(query, params, autoCommit);
    }

    findOne = async function (id, autoCommit = true) {
        const query = `
            select * from post
            where post_id = '${id}'
        `

        return await db_query(query, [], autoCommit);
    }

    async deletePost(obj, autoCommit = true) {
        // console.log(obj);
        const query = `
            begin
                delete_post(:post_id, :user_id, :y);
            end;    
        `
        return await db_proc(query, obj, autoCommit)
    }
}

