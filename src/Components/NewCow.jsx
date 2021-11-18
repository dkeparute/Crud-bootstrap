import { useState } from "react";

function NewCow({ addCow }) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [milk, setMilk] = useState('');
    const [time, setTime] = useState('');

    const control = (e, what) => {
        switch (what) {
            case "name":
                setName(e.target.value);
                break;
            case "weight":
                setWeight(e.target.value);
                break;
            case "total_milk":
                setMilk(e.target.value);
                break;
            case "last_milking_time":
                setTime(e.target.value);
                break;
                default:
        }
    };



    const insert = () => {
        addCow({
            name: name,
            weight: weight,
            total_milk: milk,
            last_milking_time: time
        });
        setName("");
        setWeight("");
        setMilk("");
        setTime("")
    };

    return (
        <>
            <form>
                <h4 style={{ marginLeft: "250px", marginTop: '40px'}}>Įvesti naują karvę</h4>
                <div className="col-md-3" style={{ marginLeft: "100px"}}>
                    <label>Karvės vardas</label>
                    <input onChange={(e) => control(e, "name")} value={name} type="text" className="form-control" />
                </div>
                <div className="col-md-3" style={{ marginLeft: "100px"}}>
                    <label>Karvės svoris</label>
                    <input onChange={(e) => control(e, "weight")} value={weight} type="number" className="form-control" />
                </div>
                <div className="col-md-3" style={{ marginLeft: "100px"}}>
                    <label>Karvės pieno kiekis</label>
                    <input onChange={(e) => control(e, "total_milk")} value={milk} type="number" className="form-control" />
                </div>
                <div className="col-md-3" style={{ marginLeft: "100px"}}>
                    <label>Paskutinė melžimo diena</label>
                    <input onChange={(e) => control(e, "last_milking_time")} value={time} type="date" className="form-control" />
                </div>
                <button onClick={insert} type="submit" className="btn btn-dark" style={{ marginLeft: "250px", width: "150px", marginTop: '30px' }}>Įvesti</button>
            </form>
        </>
    )

}

export default NewCow;