import React from 'react';

import './information.css'

const information = () => {
    return (
        <div>
            <h3>Información importante:</h3>
            <p className="text-info">Cuando se haya concedido un permiso telefónicamente por causa de enfermedad o incapacidad, se diligenciará este formulario cuando regrese la persona a su trabajo y se adjuntar a la certificación médica o la incapacidad para validar el permiso o licencia.</p>
            <p className="text-info">En general los permisos por corto tiempo <b>(horas media jornada y hasta un día) son remunerados, y las licencias no remuneradas se conceden para periodos más largos, hasta 60 días y suspenden el contrato de trabajo para efectos de prestaciones sociales y salario</b>. La incapacidad por maternidad tiene <b>duración de 18 semanas y durante este periodo se le continúa pagando el salario a la persona</b>, quien deberá informar al colegio tan pronto como se concedan y enviarla a la oficina de Personal junto con los documentos correspondientes.</p>
            <p className="text-info">Este formulario se archivará en la carpeta de la persona junto con la copia de la incapacidad si la hubiere.</p>
        </div>
    );
}

export default information;