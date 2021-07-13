const TIPO_FERIADO = {
    INAMOVIBLE: "inamovible",
    NO_LABORABLE: "nolaborable",
    TRASLADABLE: "trasladable"
};

const ANIOS = getAnios(2011, 2031);

const COLORS = {
    RED: "#ff443e",
    WHITE: "white",
    PURPLE: "#9984D4",
}

const VALIDATIONMESSAGES = {
    NUMERIC: "El valor debe ser numérico",
    REQUIRED: "Debe ingresar un valor",
    ERROR_SERVICIO: "Ha ocurrido un error al consultar con el servicio.",
    ERROR_CONSULTA: "Se ha producido un error. Vuelva a intentarlo."
}

const SERVICEENDPOINT = {
    URL: "http://nolaborables.com.ar/api/v2/feriados/",
    OPTIONS: "?incluir=opcional"
}

function getAnios(from, to) {
    let anios = [];
    for (let i = from; i <= to; i++) {
        anios.push(i);
    }

    return anios;
}

const IDS = {
    SPAN_RESULTADOMULTIPLICACION: "resultadoMultiplicacion",
    BOTON_CALCULAR: "calcular",
    DIV_RESULTADOSFERIADOS: "resultadosFeriados",
    SPAN_CANTIDADFERIADOS: "cantidadFeriados",
    UL_DIASINAMOVIBLES: "diasInamovibles",
    FORM_FERIADOSFORM: "feriadosForm",
    DIV_ERROR_SERVICE: "errorService",
    DIV_RESULTADO_MULTIPLICACION: "resultado"
}

const INPUTS = document.getElementsByTagName("input");

const HTML_ELEMENTS = {
    LI: "li",
    P: "p",
    SPAN: "span",
    OPTION: "option"
}

const STYLES = {
    SMALL_FONT_SIZE: "13px",
    REGULAR_FONT_SIZE: "inherit",
    ERR_MESSAGE_ALIGNMET: "center",
    INPUT_ERROR_STYLE: `2px solid ${COLORS.RED}`,
    INPUT_DEFAULT: "none",
    VISIBILITY_VISIBLE: "visible",
    VISIBILITY_HIDDEN: "hidden",
    MARGIN_DIA_INAMOVIBLE: "5px 0"
}

const REGEX = {
    ONLY_NUMBERS: /^[0-9]*$/
}
