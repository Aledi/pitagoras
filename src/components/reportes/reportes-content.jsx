'use strict';

require('./reportes-content.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ReportesExtrajudiciales = require('./reportes-extrajudiciales');
var ReportesTabla = require('./reportes-tabla');

// -----------------------------------------------------------------------------------------------
// ReportesContent
// -----------------------------------------------------------------------------------------------

var ReportesContent = React.createClass({
    getInitialState: function () {
        return {showingReportesGenerales: true};
    },
    render: function () {
        return (
            <div className='reportes-content'>
                <div className='buttons-wrapper'>
                    <button className='right-button' onClick={this.toggleReportes}>
                        {'Mostrar Reporte' + (this.state.showingReportesGenerales ? ' Extrajudiciales' : ' Generales')}
                    </button>
                    <button type='button' className='right-button export' onClick={this.exportTable}>Exportar Reportes</button>
                </div>
                {this.renderReportes()}
            </div>
        );
    },
    renderReportes: function () {
        if (this.state.showingReportesGenerales) {
            return (<ReportesTabla reportes={this.props.reportes} />);
        }

        return (<ReportesExtrajudiciales reportes={this.props.reportes} />);
    },
    toggleReportes: function () {
        this.setState({showingReportesGenerales: !this.state.showingReportesGenerales});
    },
    exportTable: function () {
        var tipoReportes = this.state.showingReportesGenerales ? 'reportes' : 'extrajudiciales';
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var table = document.getElementById(tipoReportes);
        var ctx = {
            worksheet: tipoReportes,
            table: table.innerHTML
        };

        while (ctx.table.indexOf('á') !== -1) {
            ctx.table = ctx.table.replace('á', '&aacute;');
        }

        while (ctx.table.indexOf('é') !== -1) {
            ctx.table = ctx.table.replace('é', '&eacute;');
        }

        while (ctx.table.indexOf('í') !== -1) {
            ctx.table = ctx.table.replace('í', '&iacute;');
        }

        while (ctx.table.indexOf('ó') !== -1) {
            ctx.table = ctx.table.replace('ó', '&oacute;');
        }

        while (ctx.table.indexOf('ú') !== -1) {
            ctx.table = ctx.table.replace('ú', '&uacute;');
        }

        while (ctx.table.indexOf('ü') !== -1) {
            ctx.table = ctx.table.replace('ü', '&uuml;');
        }

        while (ctx.table.indexOf('ñ') !== -1) {
            ctx.table = ctx.table.replace('ñ', '&ntilde;');
        }

        document.getElementById('dlink').href = uri + this.base64(this.format(template, ctx));
        document.getElementById('dlink').download = tipoReportes + '.xls';
        document.getElementById('dlink').click();
    },
    base64: function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    },
    format: function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    }
});

module.exports = ReportesContent;
