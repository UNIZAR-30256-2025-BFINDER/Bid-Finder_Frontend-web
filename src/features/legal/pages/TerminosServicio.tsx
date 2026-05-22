/**
 * @fileoverview Vista estática que renderiza el Aviso Legal y Términos de Servicio de BidFinder.
 * Adaptado a la LSSI-CE 34/2002, el RGPD (UE) 2016/679 y la LOPDGDD 3/2018.
 * Incluye cláusulas específicas de exención por uso de IA y datos del BOE.
 */

import React from 'react';

export const TerminosServicio: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-12 px-6 md:px-16 flex justify-center">
      <div className="w-full max-w-4xl rounded-2xl border border-yellow-400/20 bg-[#050816]/95 p-8 md:p-12 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-yellow-400">
          Aviso Legal y Términos de Servicio
        </h1>
        <p className="mb-8 text-sm text-gray-400">Última actualización: 21 de mayo de 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              I. Información General e Identificación del Titular
            </h2>
            <p>
              En cumplimiento con el deber de información dispuesto en el Art. 10 de la Ley 34/2002,
              de 11 de julio, de Servicios de la Sociedad de la Información y el Comercio
              Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del
              titular del sitio web:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2 text-gray-400">
              <li>
                <strong className="text-white">Denominación:</strong> BidFinder
              </li>
              <li>
                <strong className="text-white">Naturaleza:</strong> Equipo de desarrollo (proyecto
                independiente)
              </li>
              <li>
                <strong className="text-white">Correo electrónico:</strong>{' '}
                bidfinder.legal@gmail.com
              </li>
              <li>
                <strong className="text-white">Sitio web:</strong>{' '}
                https://bid-finder-frontend-web.vercel.app/
              </li>
            </ul>
            <p>
              La utilización del Portal atribuye la condición de usuario (en adelante,{' '}
              <strong className="text-white">«Usuario»</strong>) e implica la aceptación plena y sin
              reservas de todas y cada una de las disposiciones incluidas en el presente Aviso Legal
              y Términos de Servicio. Se recomienda al Usuario leer detenidamente este documento en
              cada visita, dado que puede ser modificado.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              II. Descripción del Servicio y Naturaleza del Portal
            </h2>
            <p>
              BidFinder es una plataforma tecnológica que actúa como{' '}
              <strong className="text-white">
                mero agregador e indexador de información pública
              </strong>
              . El sistema recopila, estructura y procesa de forma automatizada los edictos de
              subastas judiciales y notariales publicados en el{' '}
              <strong className="text-white">Boletín Oficial del Estado (BOE)</strong> de España.
              Dicha información se reutiliza al amparo de las condiciones de reutilización de la
              Agencia Estatal BOE (aprobadas por Resolución de 27 de junio de 2024, conforme a la
              Ley 37/2007 sobre reutilización de la información del sector público), que autorizan
              expresamente la modificación y combinación de documentos para la creación de productos
              y servicios de valor añadido, incluso con fines comerciales.
            </p>
            <p>
              El Portal hace uso de tecnologías de Inteligencia Artificial (modelos de lenguaje de
              gran escala) para extraer y estructurar la información contenida en los textos legales
              del BOE. Este procesamiento automatizado puede generar{' '}
              <strong className="text-white">inexactitudes, errores u omisiones</strong> inherentes
              a la naturaleza probabilística de dichos sistemas.
            </p>
            <p>
              BidFinder <strong className="text-white">no es</strong> un portal de subastas, no
              intermedia en ninguna puja ni transacción, y no ostenta relación jurídica alguna con
              los organismos convocantes de las subastas publicadas. La fuente oficial y vinculante
              es el{' '}
              <a
                href="https://subastas.boe.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                Portal de Subastas del BOE
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              III. Exención de Responsabilidad — Precisión de los Datos
            </h2>

            <div className="rounded-lg border border-red-500/20 bg-red-900/10 p-4 mb-2">
              <p className="text-gray-300 font-medium">
                ⚠️ <strong className="text-white">Aviso importante:</strong> La información mostrada
                en BidFinder es generada mediante Inteligencia Artificial a partir de fuentes
                públicas y puede contener errores. Verifique siempre los datos en la fuente oficial
                antes de tomar ninguna decisión.
              </p>
            </div>

            <p>BidFinder excluye expresamente toda responsabilidad por:</p>
            <ul className="list-inside list-disc space-y-2 pl-2 text-gray-400">
              <li>
                <strong className="text-white">Inexactitud o incompletitud de los datos:</strong> La
                información es procesada mediante sistemas de IA y puede contener errores de
                extracción, hallazgos desactualizados o interpretaciones incorrectas del texto
                jurídico original. BidFinder no garantiza la exactitud, exhaustividad ni vigencia de
                los datos mostrados.
              </li>
              <li>
                <strong className="text-white">Carácter meramente informativo:</strong> Ningún
                contenido publicado en el Portal constituye asesoramiento legal, financiero, fiscal,
                de inversión ni de ninguna otra índole profesional. El Usuario debe consultar con
                profesionales cualificados antes de adoptar cualquier decisión basada en la
                información del Portal.
              </li>
              <li>
                <strong className="text-white">Decisiones del Usuario:</strong> BidFinder no asume
                ninguna responsabilidad por los daños y perjuicios, directos o indirectos, pérdidas
                de capital, pérdidas de oportunidad de negocio, lucro cesante ni por cualquier otra
                consecuencia patrimonial o no patrimonial que pudiera sufrir el Usuario como
                resultado de decisiones adoptadas sobre la base de la información obtenida a través
                del Portal.
              </li>
              <li>
                <strong className="text-white">Divergencias con la fuente oficial:</strong> En caso
                de discrepancia entre los datos mostrados en BidFinder y los publicados en el BOE o
                en el Portal de Subastas oficial, prevalecerá siempre la fuente oficial. BidFinder
                no se responsabiliza de los perjuicios derivados de tales discrepancias.
              </li>
              <li>
                <strong className="text-white">
                  Subastas canceladas, modificadas o adjudicadas:
                </strong>{' '}
                El estado de una subasta puede cambiar en cualquier momento. BidFinder no garantiza
                la actualización en tiempo real del estado de los procesos de subasta.
              </li>
            </ul>
          </section>

          {/* IV */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              IV. Exención de Responsabilidad — Disponibilidad del Servicio
            </h2>
            <p>
              BidFinder no garantiza la disponibilidad, continuidad ni infalibilidad del
              funcionamiento del Portal. El Responsable realizará los esfuerzos razonables para
              mantener el servicio operativo, pero queda expresamente exento de responsabilidad por:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 text-gray-400">
              <li>
                <strong className="text-white">Interrupciones del servicio:</strong> caídas,
                mantenimientos programados o no programados, tiempos de inactividad derivados de la
                infraestructura de terceros (servidores, proveedor de base de datos, red de
                distribución de contenidos), o hibernación de instancias en capas gratuitas de
                infraestructura cloud.
              </li>
              <li>
                <strong className="text-white">Fallos de terceros:</strong> interrupciones
                ocasionadas por los proveedores de infraestructura (MongoDB Atlas, Render, Vercel) o
                por los proveedores de IA (Google Gemini API, Groq), cuyo funcionamiento escapa al
                control de BidFinder.
              </li>
              <li>
                <strong className="text-white">Ataques externos:</strong> daños provocados por
                virus, malware, ataques de denegación de servicio (DDoS) u otras intrusiones de
                terceros malintencionados.
              </li>
              <li>
                <strong className="text-white">Pérdida de datos:</strong> en supuestos de fuerza
                mayor o catástrofes técnicas imprevisibles, siempre que BidFinder haya adoptado
                medidas de seguridad razonables.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              V. Exención de Responsabilidad — Brechas de Seguridad y Contingencias Externas
            </h2>
            <p>
              BidFinder aplica medidas de seguridad técnicas razonables (cifrado de contraseñas,
              HTTPS, control de acceso por roles, tokens de sesión). Sin embargo, dado que ningún
              sistema conectado a internet puede garantizar una seguridad absoluta, el Responsable
              queda exento de toda responsabilidad frente al Usuario por:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 text-gray-400">
              <li>
                Accesos no autorizados a los sistemas de información debidos a ataques sofisticados,
                vulnerabilidades de día cero en software de terceros, o fallos de seguridad de los
                subencargados de tratamiento, siempre que BidFinder haya obrado con la diligencia
                debida.
              </li>
              <li>
                Daños derivados de la divulgación de datos ocasionada por el propio Usuario al
                compartir sus credenciales de acceso o al utilizar redes no seguras.
              </li>
              <li>
                Contingencias legales, administrativas o regulatorias externas (cambios normativos,
                resoluciones de autoridades de control) que afecten al servicio de forma sobrevenida
                y ajena a la voluntad del Responsable.
              </li>
              <li>
                Daños indirectos, lucro cesante o pérdida de datos del Usuario derivados de una
                brecha de seguridad, salvo en los casos en que medie dolo o culpa grave imputable
                exclusivamente a BidFinder.
              </li>
            </ul>
            <p>
              En cualquier caso, la responsabilidad máxima de BidFinder frente al Usuario quedará
              limitada, en la medida permitida por la legislación española aplicable, al importe
              efectivamente abonado por el Usuario a BidFinder durante los doce meses anteriores al
              hecho causante del daño.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              VI. Condiciones de Acceso y Registro de Usuario
            </h2>
            <p>
              El acceso a ciertas funcionalidades del Portal (guardar favoritos, publicar
              comentarios) requiere el registro previo del Usuario. El registro es gratuito y está
              sujeto a las siguientes condiciones:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 text-gray-400">
              <li>
                <strong className="text-white">Mayoría de edad:</strong> el Usuario declara ser
                mayor de 18 años o, en su caso, mayor de 14 años con el consentimiento de sus
                tutores legales.
              </li>
              <li>
                <strong className="text-white">Veracidad de los datos:</strong> el Usuario se
                compromete a proporcionar datos verídicos y a mantenerlos actualizados.
              </li>
              <li>
                <strong className="text-white">Confidencialidad de credenciales:</strong> el Usuario
                es el único responsable de la custodia de su contraseña. Deberá notificar a
                BidFinder de inmediato cualquier uso no autorizado de su cuenta.
              </li>
              <li>
                <strong className="text-white">Una cuenta por persona:</strong> se prohíbe la
                creación de múltiples cuentas por un mismo usuario.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              VII. Conducta del Usuario y Uso Aceptable
            </h2>
            <p>
              El Usuario se compromete a utilizar el Portal, los servicios y los contenidos de
              conformidad con la ley, la moral y el orden público. Queda expresamente prohibido:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 text-gray-400">
              <li>
                Publicar comentarios que vulneren derechos fundamentales, sean discriminatorios,
                difamatorios, obscenos, amenazantes o que constituyan spam.
              </li>
              <li>
                Realizar extracción masiva de datos (scraping) del Portal de forma automatizada sin
                autorización expresa y por escrito del Responsable.
              </li>
              <li>
                Intentar acceder a zonas restringidas del sistema o comprometer la seguridad del
                Portal.
              </li>
              <li>Suplantar la identidad de otros usuarios o de BidFinder.</li>
              <li>Utilizar el Portal para fines ilegales o contrarios a los presentes Términos.</li>
            </ul>
            <p>
              BidFinder se reserva el derecho de retirar cualquier comentario que incumpla las
              normas anteriores y de suspender o cancelar permanentemente la cuenta del Usuario
              infractor, sin previo aviso y sin que ello genere derecho a indemnización alguna.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              VIII. Propiedad Intelectual e Industrial
            </h2>
            <p>
              BidFinder, o sus licenciantes en su caso, es titular de todos los derechos de
              propiedad intelectual e industrial del Portal y de sus elementos propios (diseño,
              código fuente, logotipos, textos propios, estructura de navegación, algoritmos de
              búsqueda y ponderación, software de extracción y procesamiento). Quedan expresamente
              prohibidas la reproducción, distribución, comunicación pública o transformación de
              dichos elementos sin autorización previa y escrita del Responsable.
            </p>
            <p>
              La información bruta procedente del Boletín Oficial del Estado se reutiliza al amparo
              de las condiciones de reutilización aprobadas por la Agencia Estatal BOE (Resolución
              de 27 de junio de 2024, vigentes desde el 28 de junio de 2024), conforme a la Ley
              37/2007, de 16 de noviembre, sobre reutilización de la información del sector público.
              La elaboración, estructuración, indexación, enriquecimiento mediante IA y presentación
              de dichos datos realizada por BidFinder constituye una obra derivada de valor añadido
              protegida por los derechos de propiedad intelectual del Responsable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              VIII bis. Atribución de Fuente y Condiciones de Reutilización del BOE
            </h2>
            <p>
              Los datos sobre subastas públicas mostrados en BidFinder están{' '}
              <strong className="text-white">
                basados en datos de la{' '}
                <a
                  href="https://www.boe.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 underline hover:text-yellow-300"
                >
                  Agencia Estatal Boletín Oficial del Estado
                </a>
              </strong>
              . BidFinder no tiene ninguna relación jurídica, comercial ni de patrocinio con la
              Agencia Estatal BOE, y esta no participa, patrocina ni apoya este servicio.
            </p>
            <p>
              La información mostrada en BidFinder ha sido modificada, adaptada y combinada mediante
              procesamiento automatizado e Inteligencia Artificial para crear un servicio de valor
              añadido.{' '}
              <strong className="text-white">
                En ningún caso debe interpretarse como información oficial o auténtica.
              </strong>{' '}
              Los únicos textos con carácter oficial y auténtico son los publicados en la edición
              electrónica del Boletín Oficial del Estado en{' '}
              <a
                href="https://www.boe.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                www.boe.es
              </a>
              , conforme al Real Decreto 181/2008.
            </p>
            <p>
              Las fechas de publicación de los edictos originales se conservan y se muestran en la
              ficha de cada subasta cuando están disponibles en el documento fuente, de acuerdo con
              las condiciones de reutilización del BOE.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              IX. Política de Enlaces a Sitios de Terceros
            </h2>
            <p>
              El Portal puede contener enlaces a sitios web de terceros (BOE, Portal de Subastas
              oficial, u otros recursos informativos). BidFinder no controla ni es responsable del
              contenido, la política de privacidad ni las prácticas de dichos sitios. La inclusión
              de un enlace no implica recomendación ni relación comercial alguna con el sitio
              enlazado.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              X. Modificaciones del Servicio y de los Términos
            </h2>
            <p>
              BidFinder se reserva el derecho de modificar, suspender o discontinuar, de forma
              temporal o permanente, cualquier aspecto o funcionalidad del Portal, así como los
              presentes Términos de Servicio, en cualquier momento y sin previo aviso. Los cambios
              entrarán en vigor desde su publicación en el Portal. El uso continuado del servicio
              tras la publicación de cambios implica la aceptación de los mismos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              XI. Legislación Aplicable y Jurisdicción
            </h2>
            <p>
              Los presentes Términos de Servicio y Aviso Legal se rigen íntegramente por la
              legislación española. Para la resolución de cualquier controversia que pudiera
              derivarse del acceso o uso del Portal, las partes se someten expresamente a la
              jurisdicción de los Juzgados y Tribunales competentes conforme a la normativa procesal
              española vigente, con renuncia expresa a cualquier otro fuero que pudiera
              corresponderles.
            </p>
            <p>
              En los casos en que el Usuario ostente la condición de consumidor, serán de aplicación
              las normas imperativas de protección de consumidores y usuarios establecidas por la
              legislación española y europea, incluido el Texto Refundido de la Ley General para la
              Defensa de los Consumidores y Usuarios (TRLGDCU).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TerminosServicio;
