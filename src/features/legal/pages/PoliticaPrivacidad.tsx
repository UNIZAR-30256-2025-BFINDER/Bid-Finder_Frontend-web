/**
 * @fileoverview Vista estática que renderiza la Política de Privacidad de BidFinder.
 * Adaptada al RGPD (UE) 2016/679, la LOPDGDD 3/2018 y la LSSI-CE 34/2002.
 * Cubre el uso de IA, transferencias internacionales y subencargados de tratamiento.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PoliticaPrivacidad: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-12 px-6 md:px-16 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6 flex justify-start">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors font-medium group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver al inicio</span>
        </Link>
      </div>
      <div className="w-full max-w-4xl rounded-2xl border border-yellow-400/20 bg-[#050816]/95 p-8 md:p-12 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-yellow-400">Política de Privacidad</h1>
        <p className="mb-8 text-sm text-gray-400">Última actualización: 21 de mayo de 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              1. Responsable del Tratamiento
            </h2>
            <p>
              En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de
              27 de abril de 2016, relativo a la protección de las personas físicas en lo que
              respecta al tratamiento de datos personales (en adelante,{' '}
              <strong className="text-white">RGPD</strong>), y de la Ley Orgánica 3/2018, de 5 de
              diciembre, de Protección de Datos Personales y garantía de los derechos digitales (en
              adelante, <strong className="text-white">LOPDGDD</strong>), se informa al usuario de
              los siguientes datos del responsable del tratamiento:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2 text-gray-400">
              <li>
                <strong className="text-white">Denominación:</strong> BidFinder (equipo de
                desarrollo)
              </li>
              <li>
                <strong className="text-white">Correo electrónico de contacto:</strong>{' '}
                bidfinder.legal@gmail.com
              </li>
              <li>
                <strong className="text-white">Sitio web:</strong>{' '}
                https://bid-finder-frontend-web.vercel.app/
              </li>
            </ul>
            <p>
              Para cualquier cuestión relativa al tratamiento de sus datos personales puede
              dirigirse al Responsable a través del correo electrónico indicado.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">2. Normativa Aplicable</h2>
            <p>
              La presente Política de Privacidad se adapta a la normativa española y europea vigente
              en materia de protección de datos, en particular:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2 text-gray-400">
              <li>Reglamento (UE) 2016/679 (RGPD).</li>
              <li>Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).</li>
              <li>
                Real Decreto 1720/2007 (Reglamento de desarrollo de la LOPD, en lo que resulte de
                aplicación).
              </li>
              <li>
                Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico (LSSI-CE).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              3. Datos Personales Recabados, Finalidades y Base Jurídica
            </h2>
            <p>
              BidFinder recaba únicamente los datos personales estrictamente necesarios para las
              siguientes finalidades:
            </p>

            <div className="space-y-4 mt-2">
              <div className="rounded-lg border border-yellow-400/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white mb-1">
                  a) Registro y gestión de cuenta de usuario
                </h3>
                <p className="text-gray-400">
                  <strong className="text-gray-300">Datos:</strong> alias público, dirección de
                  correo electrónico y contraseña (almacenada en forma de hash bcrypt irreversible,
                  nunca en texto plano).
                  <br />
                  <strong className="text-gray-300">Finalidad:</strong> creación y gestión de la
                  cuenta, autenticación mediante tokens JWT y gestión de sesión.
                  <br />
                  <strong className="text-gray-300">Base jurídica:</strong> ejecución de un contrato
                  (Art. 6.1.b RGPD) y consentimiento expreso del usuario al marcar las casillas de
                  verificación durante el registro (Art. 6.1.a RGPD).
                </p>
              </div>

              <div className="rounded-lg border border-yellow-400/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white mb-1">
                  b) Participación en la comunidad (comentarios)
                </h3>
                <p className="text-gray-400">
                  <strong className="text-gray-300">Datos:</strong> alias público asociado a los
                  comentarios publicados en la plataforma.
                  <br />
                  <strong className="text-gray-300">Finalidad:</strong> permitir la interacción
                  pública entre usuarios en los hilos de discusión de cada subasta.
                  <br />
                  <strong className="text-gray-300">Base jurídica:</strong> ejecución del contrato
                  de uso del servicio (Art. 6.1.b RGPD).
                </p>
              </div>

              <div className="rounded-lg border border-yellow-400/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white mb-1">c) Gestión de favoritos</h3>
                <p className="text-gray-400">
                  <strong className="text-gray-300">Datos:</strong> identificador de usuario
                  asociado a los identificadores de subastas guardadas.
                  <br />
                  <strong className="text-gray-300">Finalidad:</strong> permitir al usuario guardar
                  y consultar subastas de su interés.
                  <br />
                  <strong className="text-gray-300">Base jurídica:</strong> ejecución del contrato
                  de uso del servicio (Art. 6.1.b RGPD).
                </p>
              </div>

              <div className="rounded-lg border border-yellow-400/10 bg-white/5 p-4">
                <h3 className="font-semibold text-white mb-1">
                  d) Estadísticas y métricas de administración
                </h3>
                <p className="text-gray-400">
                  <strong className="text-gray-300">Datos:</strong> métricas agregadas de uso
                  (número de comentarios, favoritos) vinculadas al identificador de usuario.
                  <br />
                  <strong className="text-gray-300">Finalidad:</strong> administración interna de la
                  plataforma y detección de abusos o incumplimientos.
                  <br />
                  <strong className="text-gray-300">Base jurídica:</strong> interés legítimo del
                  Responsable (Art. 6.1.f RGPD).
                </p>
              </div>
            </div>

            <p className="mt-2">
              BidFinder{' '}
              <strong className="text-white">no recaba categorías especiales de datos</strong> en el
              sentido del Art. 9 del RGPD (datos de salud, origen racial, convicciones religiosas,
              etc.).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              4. Tratamiento Automatizado mediante Inteligencia Artificial
            </h2>
            <p>
              BidFinder emplea sistemas de Inteligencia Artificial (modelos de lenguaje de gran
              escala, LLMs) para el procesamiento automatizado de los textos de los edictos
              publicados en el Boletín Oficial del Estado (BOE), con el fin de extraer datos
              estructurados sobre subastas públicas (precio, tasación, ubicación, cargas, etc.).
              Este procesamiento se realiza al amparo de las condiciones de reutilización de la
              Agencia Estatal BOE (Resolución de 27 de junio de 2024, conforme a la Ley 37/2007
              sobre reutilización de la información del sector público). BidFinder no tiene relación
              alguna con la Agencia Estatal BOE, que no participa ni patrocina este servicio.
            </p>
            <p>
              Este procesamiento{' '}
              <strong className="text-white">
                no afecta a datos personales de los usuarios registrados
              </strong>
              . Los textos procesados por la IA son documentos de carácter público procedentes del
              BOE y no contienen datos personales de los usuarios de la plataforma.
            </p>
            <p>
              En ningún caso se somete al usuario a decisiones individuales automatizadas con
              efectos jurídicos ni similares sobre la base de un tratamiento automatizado de sus
              datos personales (Art. 22 RGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              5. Plazo de Conservación de los Datos
            </h2>
            <p>
              Los datos personales se conservarán mientras el usuario mantenga su cuenta activa en
              la plataforma.
            </p>
            <p>
              Si la cuenta permanece inactiva durante un período superior a{' '}
              <strong className="text-white">5 años</strong>, o si el usuario solicita la baja del
              servicio, sus datos de identificación serán suprimidos de forma segura de los sistemas
              de almacenamiento.
            </p>
            <p>
              Con el fin de preservar la integridad técnica de los hilos de discusión, los
              comentarios públicos publicados por el usuario no serán eliminados, sino sometidos a
              un proceso de <strong className="text-white">anonimización irreversible</strong>: el
              identificador de usuario será sustituido por el valor genérico «Usuario Eliminado»,
              imposibilitando cualquier reidentificación por terceros. Este tratamiento está
              amparado en el interés legítimo de mantener la coherencia de los contenidos
              comunitarios (Art. 6.1.f RGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              6. Destinatarios y Transferencias Internacionales de Datos
            </h2>
            <p>
              BidFinder no cede ni vende los datos personales de sus usuarios a terceros con fines
              comerciales. No obstante, para la prestación del servicio, se recurre a los siguientes{' '}
              <strong className="text-white">subencargados de tratamiento</strong>, quienes actúan
              bajo las instrucciones del Responsable y con las garantías adecuadas:
            </p>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-yellow-400/20">
                    <th className="text-left py-2 pr-4 text-yellow-400 font-semibold">Proveedor</th>
                    <th className="text-left py-2 pr-4 text-yellow-400 font-semibold">Finalidad</th>
                    <th className="text-left py-2 pr-4 text-yellow-400 font-semibold">País</th>
                    <th className="text-left py-2 text-yellow-400 font-semibold">Garantía</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">MongoDB Atlas (MongoDB, Inc.)</td>
                    <td className="py-2 pr-4">Almacenamiento de base de datos</td>
                    <td className="py-2 pr-4">EE. UU.</td>
                    <td className="py-2">Cláusulas Contractuales Tipo UE (SCCs)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">Render (Render Services, Inc.)</td>
                    <td className="py-2 pr-4">Hosting del servidor API</td>
                    <td className="py-2 pr-4">EE. UU.</td>
                    <td className="py-2">Cláusulas Contractuales Tipo UE (SCCs)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">Vercel, Inc.</td>
                    <td className="py-2 pr-4">Hosting del frontend</td>
                    <td className="py-2 pr-4">EE. UU.</td>
                    <td className="py-2">Cláusulas Contractuales Tipo UE (SCCs)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white">Google LLC (Gemini API)</td>
                    <td className="py-2 pr-4">
                      Procesamiento IA de textos del BOE (no datos de usuario)
                    </td>
                    <td className="py-2 pr-4">EE. UU.</td>
                    <td className="py-2">Cláusulas Contractuales Tipo UE (SCCs)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-2">
              Todos los proveedores indicados cumplen con las Cláusulas Contractuales Tipo adoptadas
              por la Comisión Europea, que constituyen una garantía adecuada para las transferencias
              internacionales de datos en el sentido del Capítulo V del RGPD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">7. Medidas de Seguridad</h2>
            <p>
              BidFinder aplica las medidas técnicas y organizativas adecuadas al nivel de riesgo de
              los datos tratados, entre ellas:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2 text-gray-400">
              <li>
                Cifrado de contraseñas mediante <strong className="text-white">bcrypt</strong> (hash
                criptográfico unidireccional); las contraseñas nunca se almacenan en texto plano.
              </li>
              <li>
                Autenticación mediante <strong className="text-white">tokens JWT</strong> de corta
                duración, renovados mediante Refresh Tokens almacenados en base de datos.
              </li>
              <li>
                Comunicaciones cifradas mediante <strong className="text-white">TLS/HTTPS</strong>{' '}
                en todos los extremos de la plataforma.
              </li>
              <li>Control de acceso basado en roles (usuario / administrador).</li>
              <li>
                Infraestructura alojada en proveedores con certificaciones de seguridad reconocidas
                (SOC 2, ISO 27001).
              </li>
            </ul>
            <p>
              No obstante, BidFinder no puede garantizar la seguridad absoluta de las comunicaciones
              en internet. En caso de producirse una violación de la seguridad de los datos
              personales que entrañe un alto riesgo para los derechos y libertades de los usuarios,
              el Responsable lo comunicará sin dilación indebida, conforme al Art. 34 del RGPD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">8. Derechos del Usuario</h2>
            <p>
              El usuario puede ejercer en cualquier momento los siguientes derechos reconocidos en
              el RGPD y la LOPDGDD, enviando una comunicación escrita al correo electrónico{' '}
              <strong className="text-white">bidfinder.legal@gmail.com</strong> con el asunto
              «Ejercicio de Derechos RGPD», acompañada de una copia de su documento identificativo:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 text-gray-400">
              <li>
                <strong className="text-white">Acceso (Art. 15 RGPD):</strong> conocer qué datos
                personales trata el Responsable.
              </li>
              <li>
                <strong className="text-white">Rectificación (Art. 16 RGPD):</strong> solicitar la
                corrección de datos inexactos o incompletos.
              </li>
              <li>
                <strong className="text-white">
                  Supresión / Derecho al olvido (Art. 17 RGPD):
                </strong>{' '}
                solicitar la eliminación de sus datos cuando ya no sean necesarios para los fines
                para los que fueron recabados.
              </li>
              <li>
                <strong className="text-white">Limitación del tratamiento (Art. 18 RGPD):</strong>{' '}
                solicitar la suspensión del tratamiento en determinadas circunstancias.
              </li>
              <li>
                <strong className="text-white">Portabilidad (Art. 20 RGPD):</strong> recibir sus
                datos en formato estructurado y de lectura mecánica.
              </li>
              <li>
                <strong className="text-white">Oposición (Art. 21 RGPD):</strong> oponerse al
                tratamiento basado en el interés legítimo del Responsable.
              </li>
              <li>
                <strong className="text-white">
                  No ser objeto de decisiones automatizadas (Art. 22 RGPD).
                </strong>
              </li>
              <li>
                <strong className="text-white">Retirada del consentimiento:</strong> en cualquier
                momento y sin que ello afecte a la licitud del tratamiento previo.
              </li>
            </ul>
            <p>
              El Responsable responderá a la solicitud en el plazo máximo de{' '}
              <strong className="text-white">un mes</strong> desde su recepción, prorrogable en dos
              meses adicionales en casos de especial complejidad (Art. 12 RGPD).
            </p>
            <p>
              Asimismo, el usuario tiene derecho a presentar una reclamación ante la{' '}
              <strong className="text-white">Agencia Española de Protección de Datos (AEPD)</strong>
              , a través de su sede electrónica en{' '}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                www.aepd.es
              </a>
              , si considera que el tratamiento de sus datos no se ajusta a la normativa vigente.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">9. Menores de Edad</h2>
            <p>
              De conformidad con el Art. 7 de la LOPDGDD, los menores de{' '}
              <strong className="text-white">14 años</strong> no pueden prestar su consentimiento de
              forma autónoma para el tratamiento de sus datos personales. BidFinder no recaba ni
              trata conscientemente datos de menores de dicha edad. Si el Responsable tiene
              conocimiento de que un menor de 14 años ha facilitado datos sin el consentimiento de
              sus tutores legales, procederá a su supresión inmediata.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              10. Cookies y Tecnologías de Rastreo
            </h2>
            <p>
              BidFinder utiliza cookies técnicas de sesión estrictamente necesarias para el
              funcionamiento de la plataforma (autenticación y gestión de sesión). No se emplean
              cookies de rastreo, publicitarias ni de terceros con fines analíticos o comerciales.
              Para más información, consulte nuestra{' '}
              <strong className="text-white">Política de Cookies</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              11. Modificaciones de la Política de Privacidad
            </h2>
            <p>
              BidFinder se reserva el derecho a modificar la presente Política de Privacidad para
              adaptarla a cambios legislativos, jurisprudenciales o doctrinales de la AEPD. Las
              modificaciones significativas serán notificadas a los usuarios registrados mediante
              correo electrónico o mediante un aviso destacado en la plataforma. Se recomienda
              revisar periódicamente este documento. La fecha de la última actualización figura en
              el encabezado.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
