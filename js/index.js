window.onload = function() {
    getAniosOptions();
};

// -------- INICIO FUNCTIONS PARA SECTION MULTIPLICACIÓN ------------

function multiply(a, b) {
    if (a == 0 || b == 0)
        return 0;

    return a / (1 / b);
}

function calcularMultiplicacion() {
    const resultadoMultiplicacion = document.getElementById(IDS.SPAN_RESULTADOMULTIPLICACION);
    resultadoMultiplicacion.innerText = multiply(parseInt(INPUTS[0].value), parseInt(INPUTS[1].value));

    resultadoMultiplicacion.innerText.length > 18 && window.innerWidth <= 480 ?
        resultadoMultiplicacion.style.fontSize = STYLES.SMALL_FONT_SIZE :
        resultadoMultiplicacion.style.fontSize = STYLES.REGULAR_FONT_SIZE;

    document.getElementById(IDS.DIV_RESULTADO_MULTIPLICACION).style.visibility = STYLES.VISIBILITY_VISIBLE
}

function isValueNumber(value) {
    return value.match(REGEX.ONLY_NUMBERS);
}

function createValidationMessageContainer(target) {
    const pErr = document.createElement(HTML_ELEMENTS.P)
    pErr.style.textAlign = STYLES.ERR_MESSAGE_ALIGNMET;
    pErr.style.color = COLORS.RED;

    pErr.innerText = target.value === "" || target.value === undefined ? VALIDATIONMESSAGES.REQUIRED :
                         !isValueNumber(target.value) ? VALIDATIONMESSAGES.NUMERIC : "";

    pErr.innerText !== "" ? target.style.border = STYLES.INPUT_ERROR_STYLE : target.style.border = STYLES.INPUT_DEFAULT;

    return pErr;
}

function checkDisabledButton() {
    const button = document.getElementById(IDS.BOTON_CALCULAR)
    const a = INPUTS[0].value;
    const b = INPUTS[1].value;
    if (a != "" && isValueNumber(a) && b != "" && isValueNumber(b)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function numerosOnChange($event) {
    const div = $event.target.nextElementSibling;
    div.innerText = "";
    const pErr = createValidationMessageContainer($event.target)
    div.append(pErr);

    checkDisabledButton()
}

//-------- FIN FUNCTIONS PARA MULTIPLICACIÓN ------------

//-------- INICIO FUNCTIONS PARA FERIADOS ------------

function getAnioOpitionFromValue(value) {
    let option = document.createElement(HTML_ELEMENTS.OPTION);
    option.text = value;
    option.value = value;
    anios.append(option);
}

function getAniosOptions() {
    getAnioOpitionFromValue("-");
    ANIOS.forEach(anio => {
        getAnioOpitionFromValue(anio);
});
}

function filterFeriados(feriados) {
    return feriados.filter( feriado => isFeriadoInamovibleNoLaborableOrTrasladable(feriado.tipo));
}

function getFeriadosInamovibles(feriados) {
    return feriados.filter(feriado => feriado.tipo == TIPO_FERIADO.INAMOVIBLE)
}

function isFeriadoInamovibleNoLaborableOrTrasladable(tipo) {
    return tipo == TIPO_FERIADO.INAMOVIBLE ||
            tipo == TIPO_FERIADO.NO_LABORABLE ||
            tipo == TIPO_FERIADO.TRASLADABLE;
}

function getFormattedDate(dia, mes, anio) {
    dia = dia.toString().length < 2 ? `0${dia}` : dia;
    mes = mes.toString().length < 2 ? `0${mes}` : mes;

    return `${dia}/${mes}/${anio}`;
}

async function feriadosResultsOnChange($event) {
    resetResultsAndMessages();
    const anio = $event.target.value;

    if (anio === "-") return;


    const totalFeriados = await getFeriadosByAnio(anio);

    if (totalFeriados.ERROR) {
        createErrorMessageFromService(totalFeriados.ERROR)
        return;
    }

    const feriadosFiltered = filterFeriados(totalFeriados);
    setCantidadFeriados(feriadosFiltered.length);
    setDiasInamoviblesList(getFeriadosInamovibles(feriadosFiltered), anio);
    document.getElementById(IDS.DIV_RESULTADOSFERIADOS).style.visibility = STYLES.VISIBILITY_VISIBLE;
}

function resetResultsAndMessages() {
    document.getElementById(IDS.DIV_RESULTADOSFERIADOS).style.visibility = STYLES.VISIBILITY_HIDDEN;
    document.getElementById(IDS.UL_DIASINAMOVIBLES).innerText = "";
    document.getElementById(IDS.DIV_ERROR_SERVICE).innerText = "";
}


function createErrorMessageFromService(message) {
    const span = document.createElement(HTML_ELEMENTS.SPAN)
    span.innerText = message;
    document.getElementById(IDS.DIV_ERROR_SERVICE).append(span);
}

function setCantidadFeriados(cantidad) {
    document.getElementById(IDS.SPAN_CANTIDADFERIADOS).innerText = cantidad;
}

function setDiasInamoviblesList(feriadosInamovibles, anio) {
    feriadosInamovibles.forEach(feriado => {
        document
            .getElementById(IDS.UL_DIASINAMOVIBLES)
                .append(getNewLiFeriadoInamovible(feriado, anio));
    });
}

function getNewLiFeriadoInamovible(feriado, anio) {
    const li = document.createElement(HTML_ELEMENTS.LI);
    const dia = document.createElement(HTML_ELEMENTS.P);
    const span = document.createElement(HTML_ELEMENTS.SPAN)
    span.style.color = COLORS.PURPLE;
    span.innerText = `${getFormattedDate(feriado.dia, feriado.mes, anio)}:`;
    li.append(span);
    dia.innerText = feriado.motivo;
    dia.style.color = COLORS.WHITE;
    dia.style.margin = STYLES.MARGIN_DIA_INAMOVIBLE;
    li.append(dia);

    return li;
}
//-------- FIN FUNCTIONS PARA MULTIPLICACIÓN ------------
