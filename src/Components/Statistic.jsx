import "../style.css";

function Statistic({ cowsCount, milkCount, sort }) {
    return (
        <>
            <div className="statistic row col-lg-5 col-md-7 col-sm-10">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body" style={{height:"200px"}}>
                            <h5 className="card-title">Statistika</h5>
                            <p className="card-text"><h6>Bendras karvių skaičius</h6> {cowsCount}</p>
                            <p className="card-text"><h6>Bendras pieno kiekis</h6> {milkCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body" style={{height:"200px"}}>
                            <h5 className="card-title" style={{marginBottom:"25px"}}>Rūšiuoti pagal</h5>
                            <button type="button" class="btn btn-secondary m-1" onClick={() => sort("weight")}>
                                Pagal karvės svorį
                            </button>
                            <button type="button" class="btn btn-secondary m-1" onClick={() => sort("total_milk")}>
                                Pagal pieno kiekį
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Statistic