import {db_proc, db_query} from "../database/oracle_db.js";
import {generateParams} from "../utils/db_params.js";

export default class AuthRepository{
    /* insertUser = async function (id, name, email, password, role) {
        console.log(`inserting ${id} ${name}, ${email}, ${password}, ${role}`);
        const query =  `insert into "user" ("id", "name", "email", "password", "role") values(:1, :2, :3, :4, :5)`;
        return await db_query(query, [id, name, email, password, role]);
    } */

    insertUserLocation = async function (location, autoCommit = true) {
        // console.log(`inserting ${location.id} ${location.lat}, ${location.lang}, ${location.text}`);
        const query =  `insert into "LOCATION" 
                       ("ID", "LATITUDE", "LONGITUDE", "DESCRIPTION") 
                       values(:1, :2, :3, :4)`;
        return await db_query(query, [
            location.id, //1
            location.lat, // 2
            location.lang, //3
            location.text, //4
        ], autoCommit);
    }

    insertUser = async function (user, autoCommit = true) {
        // console.log(`inserting ${user.id} ${user.name}, ${user.email}, ${user.phone}`);
        const columns = Object.keys(user).join(', ');
        const params = Object.values(user);
        const param_place = generateParams(params.length);
        const query =  `insert into "USERS" 
        (${columns}) 
        values(${param_place})`;
        return await db_query(query, params, autoCommit);
    }

    checkUser = async function (email, autoCommit = true) {
        // console.log(`checking ${email}`);
        // const query =  `select * from "USERS" where "EMAIL" = :1`;
        // let q = `call hello()`
        // await db_query(q, [], false)
        // console.log(email);
        const query =  `select email_check(:1) "flag" from dual`;
        return await db_query(query, [email], autoCommit);
    }

    getUser = async function (email, autoCommit = true) {
        let query = `
        begin 
            get_user(:email, :y); 
        end;`
        // console.log(r);
        return await db_proc(query, {email}, false);
        // const query =  `select * from "USERS" where "EMAIL" = :1`;
        // return await db_query(query, [email], autoCommit);
    }
}

