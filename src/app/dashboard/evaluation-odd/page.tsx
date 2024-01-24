export default function Page(){
    return(
        <div className="">
            {/* Put your Content Here */}
            <div style={{display: 'table', width: '400px', margin: '0'}}>
                <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', border: '1px solid black',padding: '10px',textAlign: 'center'}}>Régions</div>
                </div>
                <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell',border: '1px solid black', padding: '5px',textAlign: 'center'}}>Centre</div>
                </div>
                <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', border: '1px solid black',padding: '5px',textAlign: 'center'}}>Extreme Nord</div>
                </div>
                <div style={{display: 'table-row'}}>
                     <div style={{display: 'table-cell', border: '1px solid black', padding: '5px',textAlign: 'center'}}>Nord</div>
                 </div>
                <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', border: '1px solid black', padding: '5px',textAlign: 'center'}}>Nord-Ouest</div>
                </div>
                <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', border: '1px solid black', padding: '5px',textAlign: 'center'}}>Littoral</div>
                </div>
                <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', border: '1px solid black', padding: '5px',textAlign: 'center'}}>Sud</div>
                </div>
                <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', border: '1px solid black', padding: '5px',textAlign: 'center'}}>Sud-Ouest</div>
                </div>
            </div>
        </div>
    )
}