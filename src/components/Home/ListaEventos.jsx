
function ListaEventos(){
return(
    <>
    <div className="ListaEventos">
        <div className="EventosPersonales">
            <h1>Eventos creados por ti</h1>
            {/*Recibir eventos que has creado */}
        </div>
        <div className="EventosParticipas">
            <h1>Eventos en los que participas</h1>
            {/*Recibir eventos que participas */}
        </div>
        <div className="Calendario">
            <button>Ver calendario</button>
        </div>
    </div>
    </>
)
}
export default ListaEventos;