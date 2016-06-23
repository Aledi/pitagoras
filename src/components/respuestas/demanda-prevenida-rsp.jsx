'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Demanda Prevenida Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaPrevenidaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>¿Desahogar?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.desahogar)}</span>
                </div>
                {this.renderFecha()}
            </div>
        );
    },
    renderFecha: function () {
        if (!this.props.accion.respuestas.desahogar) {
            return;
        }

        return (
            <div className='respuestas-wrapper'>
                <span className='bold'>Desahogar el: </span>
                <span>{this.props.accion.respuestas.fecha}</span>
            </div>
        );
    }
});

module.exports = DemandaPrevenidaRespuestas;
