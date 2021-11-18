import axios from "axios";
import { useEffect } from "react";
import Cows from "./Components/Cows";
import { useState } from "react";
import NewCow from "./Components/NewCow";
import Statistic from "./Components/Statistic";

function App() {

  // TESTAS
  useEffect(() => {
    axios.get('http://localhost:3003/test')
      .then(res => {
        console.log(res.data);
      })
  }, [])

  const [cows, setCows] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // READ NODE
  useEffect(() => {
    axios.get("http://localhost:3003/cows")
    .then(res => {
        setCows(res.data);
        console.log(res.data);
    });
}, [lastUpdate]);


// DELETE NODE
const deleteCow = (id) => {
  axios.delete("http://localhost:3003/cows/" + id)
  .then(res => {
      setLastUpdate(Date.now());
      console.log(res.data);
  });
};

// UPDATE NODE
const editCow = (id, cow) => {
  axios.put("http://localhost:3003/cows/" + id, cow)
  .then(res => {
      setLastUpdate(Date.now());
      console.log(res.data);
  });
};

// CREATE NODE
const addCow = (cow) => {
  axios.post('http://localhost:3003/cows', cow)
      .then(res => {
        setLastUpdate(Date.now())
        console.log(res.data);
      })
}
// COUNT COWS
const [cowsCount, setCowsCount] = useState(0);

    useEffect(() => {
      axios.get('http://localhost:3003/cows/count')
          .then(res => {
              setCowsCount(res.data[0].cowsCount);
          })
  }, [lastUpdate])


// COUNT MILK
    const [milkCount, setMilkCount] = useState([]);
    
    useEffect(() => {
      axios.get('http://localhost:3003/cows/milk-count')
          .then(res => {
              setMilkCount(res.data[0].milkCount);
          })
  }, [lastUpdate])

  // SORT

  const sort = by => {
    const cowsCopy = cows.slice();
    if ('total_milk' === by) {
      cowsCopy.sort((a, b) => {
        if (a.total_milk > b.total_milk) {
          return 1
        }
        if (a.total_milk < b.total_milk) {
          return -1
        }
        return 0
      })
      setCows(cowsCopy)
    }
    if ('weight' === by) {
      cowsCopy.sort((a, b) => a.weight - b.weight)
      setCows(cowsCopy)
    }
  }


  return (
    <>
    <Statistic cowsCount={cowsCount} milkCount={milkCount} sort={sort} />
    <NewCow addCow={addCow}/>
    <h1 style={{ marginTop: "10px", marginBottom: "50px", fontSize: "60px", textAlign: "center" }}>Karvių ferma</h1>
    <Cows cows={cows} deleteCow={deleteCow} editCow={editCow}></Cows>
    </>
  );
}
export default App;