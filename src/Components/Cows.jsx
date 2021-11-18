import Cow from "./Cow";


function Cows({ cows, deleteCow, editCow}) {
    return (
        <div className='list'>
            {cows.map(cow => <Cow key={cow.id} cow={cow} deleteCow={deleteCow} editCow={editCow} ></Cow>)}
        </div>
    );

}
export default Cows;