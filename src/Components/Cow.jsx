import { useState, useEffect } from "react";


function Cow({ id, cow, deleteCow, editCow }) {


    const [weight, setWeight] = useState('');
    const [milk, setMilk] = useState('');
    const [time, setTime] = useState('');


    useEffect(() => {
        setWeight(cow.weight)
        setMilk(cow.total_milk);
        setTime(cow.last_milking_time);
    }, [cow]);



    const control = (e, what) => {
        switch (what) {
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


    const edit = (id) => {
        editCow(id, {
            weight: weight,
            total_milk: milk,
            last_milking_time: time
        });
        setWeight("");
        setMilk("");
        setTime("")
    };


    if (id === 0) {
        return null;
    }


    const d = new Date(cow.last_milking_time);
    let month = "00" + (d.getMonth() + 1);
    month = month.substring(month.length - 2);
    let day = "00" + d.getDate();
    day = day.substring(day.length - 2);
    cow.last_milking_time = `${d.getFullYear()}-${month}-${day}`;




    return (<>
        <table className="table" >
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Karvės vardas</th>
                    <th scope="col">Karvės svoris</th>
                    <th scope="col">Pieno kiekis</th>
                    <th scope="col">Paskutinė melžimo diena</th>
                    {/* <th>Bendras karvės pieno kiekis</th> */}
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{cow.name}</td>
                    <td>{cow.weight} kg</td>
                    <td>{cow.total_milk} l</td>
                    <td>{cow.last_milking_time}</td>
                    {/* <td>{cow.total_milk} +</td>  */}
                    <td><button type="button" className="btn btn-danger" style={{ width: '90px', borderRadius: "10px" }} onClick={() => deleteCow(cow.id)}>
                        Ištrinti
                    </button></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="number" className="form-control" style={{ width: "100px" }} onChange={(e) => control(e, "weight")} value={weight} />
                        <small className="form-text text-muted">
                            Įvesti naują svorį
                        </small>
                    </td>
                    <td><input type="number" className="form-control" style={{ width: "100px" }} onChange={(e) => control(e, "total_milk")} value={milk} />
                        <small className="form-text text-muted">
                            Įvesti naują kiekį
                        </small>
                    </td>
                    <td><input type="date" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} className="form-control" style={{ width: "190px" }} onChange={(e) => control(e, "last_milking_time")} value={time} />
                        <small className="form-text text-muted">
                            Įvesti naują datą
                        </small>
                    </td>
                    <td><button type="button" className="btn btn-warning" style={{ width: '90px', borderRadius: "10px", color: "green" }} onClick={() => edit(cow.id)} >
                        Redaguoti
                    </button></td>
                </tr>
            </tbody>
        </table>
    </>
    )
}

export default Cow;