const { CONNREFUSED } = require("dns");
const mysql = require("mysql")
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});
conn.connect(function(error, result) {
    if (error) {
        return console.log('error', error)
    }
    console.log('Connected!!')
        /*
        conn.query("CREATE DATABASE mydb", function(error, result) {
            if (error) {
                return console.log(error)
            }
            console.log("Database created!!")
            var sql = 'CREATE TABLE candidate (id INT(25),name VARCHAR(25),email_add VARHCAR(25))'
            conn.query(sql, function(error, result) {
                if (error) {
                    return console.log(error)
                }
                console.log("Candidate table created!!!")
                var sql1 = 'CREATE TABLE test_score (id INT(25),test1_score INT(25),test2_score INT(25),test3_score INT(25))'
                conn.query(sql1, function(error, result) {
                    if (error) {
                        return console.log(error)
                    }
                    console.log("Table test_score created!!!")
                })

            })
            

        })
        */

})

InsertIntoDatabase = (myname, myemail, test1, test2, test3) => {
    var values = [myname, myemail]
    var sql = "INSERT INTO candidate(name,email_add) VALUES (?,?)"
    conn.query(sql, values, (err, result) => {
        if (err) {
            return console.log(err)
        }
        conn.query("SELECT id from candidate where name = ?", [myname], (error, result) => {
            if (error) {
                return console.log(error)
            }
            var sql1 = 'INSERT INTO test_score(id,test1_score,test2_score,test3_score) VALUES(?,?,?,?)'
            var values1 = [result[0].id, test1, test2, test3]
            conn.query(sql1, values1, (error, result) => {
                if (error) {
                    console.log(error)
                }
                console.log("Data inserted!!")

            })
        })
    })
}

getStudent = () => {
    return new Promise((resolve, reject) => {
        var sql = "select name,(test1_score+test2_score+test3_score) from test_score,candidate where (test1_score+test2_score+test3_score)=(SELECT max(test1_score+test2_score+test3_score) from test_score) and test_score.id=candidate.id"
        conn.query(sql, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve("The highest scoring candidate is => " + result[0].name)
        })

    })


}

getAverageScores = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT AVG(test1_score)as avg_test1score,AVG(test2_score) as avg_test2score,AVG(test3_score) as avg_test3score from test_score"
        conn.query(sql, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)

        })

    })
}



module.exports = {
    mysql,
    conn,
    InsertIntoDatabase,
    getStudent,
    getAverageScores
}