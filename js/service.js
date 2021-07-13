async function getFeriadosByAnio(anio){
    try {
        const response = await fetch(`${SERVICEENDPOINT.URL}${anio}${SERVICEENDPOINT.OPTIONS}`);

        if (!response.ok) return {ERROR: VALIDATIONMESSAGES.ERROR_SERVICIO} ;

        const data = await response.json();
        return data;
    } catch(e) {
        return {ERROR: VALIDATIONMESSAGES.ERROR_CONSULTA};
    }
}
