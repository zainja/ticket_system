const connection = require('../connection')

exports.createTask = (task_name, start_date, end_date, teamname) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO task (task_name, start_date, end_date, team_name) VALUES (?, ?, ?, ?)",
            [task_name, start_date, end_date, teamname], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.assignTask = (task_id, username) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user_task (username, task_id) VALUES (?, ?)", [task_id, username],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.deleteUserFromTask = (taskID, username) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM user_task 
                                WHERE task_id = ?
                                AND username = ?`, [taskID, username],(err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    })
}
exports.changeTaskStatus = (task_id, status) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE task SET status = ? WHERE task_id = ? ", [], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}
// return new Promise((resolve, reject) => {
//     connection.query("",[],(err, result) => {
//         if (err) reject(err)
//         resolve(result)
//     })
// })
exports.getTeamTasks = (teamname) => {
    const sql = "SELECT task_name, start_date, end_date, creation_date" +
        "FROM task"
    return new Promise((resolve, reject) => {
        connection.query(`SELECT task_name,
                                 start_date,
                                 end_date,
                                 creation_date
                                FROM task
                                WHERE team_name = ?`,
            [teamname], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}
exports.getOpenTasks = (teamname) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT task_name,
                                 start_date,
                                 end_date,
                                 creation_date,
                                 status
                                FROM task
                                WHERE team_name = ?
                                AND status = 'open'`,
            [teamname], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.getClosedTasks = (teamname) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT task_name,
                                 start_date,
                                 end_date,
                                 creation_date,
                                 status
                                FROM task
                                WHERE team_name = ?
                                AND status = 'closed'`,
            [teamname], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.deleteTask = (task_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM task WHERE task_id = ?`,[task_id],(err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.getAssignedUsersForTask = (task_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT username
                                FROM user_task
                                WHERE task_id = ?`,[task_id],(err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.getAllUserTasks = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT team_name, task_name FROM task
                                RIGHT JOIN user_task ut ON task.task_id = ut.task_id 
                                AND ut.username = ?`,[username],(err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}