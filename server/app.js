// EXPRESS 

const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// SQL
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "farm",
  password: "farm",
  database: "cows_farm"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// CORS
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

// ROUTINGO PROCESAS
app.get('/labas/:id', (req, res) => {
  res.send(`labas tau ${req.params.id} `)
})

//  TESTAS
app.get('/test', (req, res) => {
  res.send(JSON.stringify({ test: 'OK' }))
})

//   READ NODE

app.get('/cows', (req, res) => {
  const sql = `
    SELECT *
    FROM cows
       `;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})

// DELETE NODE

app.delete('/cows/:id', (req, res) => {
  const sql = `
      DELETE FROM cows
      WHERE id = ?
      `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  })
})


//UPDATE NODE
app.put('/cows/:id', (req, res) => {
  const sql = `
      UPDATE cows
      SET weight = ?, total_milk = ?, last_milking_time = ? 
      WHERE id = ?
      `;
  con.query(sql, [req.body.weight, req.body.total_milk, req.body.last_milking_time, req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  })
})

// CREATE NODE
app.post('/cows', (req, res) => {
  console.log(req.body.title)
  const sql = `
      INSERT INTO cows
      (name, weight, total_milk, last_milking_time)
      VALUES (?, ?, ?, ?)
      `;
  con.query(sql, [req.body.name, req.body.weight, req.body.total_milk, req.body.last_milking_time], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  })
})

// COUNTS COWS
app.get('/cows/count', (req, res) => {
  const sql = `
SELECT COUNT(id) as cowsCount
FROM cows
`;
  // console.log(req.query.s);
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})

// COUNTS MILK
app.get('/cows/milk-count', (req, res) => {
  const sql = `
SELECT SUM(total_milk) as milkCount
FROM cows
`;
  // console.log(req.query.s);
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})