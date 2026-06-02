import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos del sitio web Citalia. RGPD compliant.',
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-[#0f0e0d] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#c9a96e] text-sm hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-semibold text-[#f5f0e8] mb-2">Política de Privacidad</h1>
        <p className="text-[#6b6258] text-sm mb-10">Última actualización: mayo de 2026</p>

        <div className="space-y-8 text-[#9a9080] text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">1. Responsable del tratamiento</h2>
            <ul className="space-y-1">
              <li><strong className="text-[#e8dcc8]">Responsable:</strong> Marcos Muñoz (persona física)</li>
              <li><strong className="text-[#e8dcc8]">Email de contacto:</strong> hola@citaliaapp.com</li>
              <li><strong className="text-[#e8dcc8]">Sitio web:</strong> https://citaliaapp.com</li>
            </ul>
            <p className="mt-3 text-[#6b6258]">
              Citalia se encuentra actualmente en fase de validación de producto. Esta
              política se aplica a los datos personales tratados a través del formulario
              de contacto del sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">2. Datos que recopilamos</h2>
            <p>
              A través del formulario de solicitud de demo recogemos los siguientes datos:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nombre y apellidos</li>
              <li>Nombre de la clínica</li>
              <li>Número de teléfono (WhatsApp)</li>
              <li>Dirección de email</li>
              <li>Ciudad</li>
              <li>Volumen aproximado de consultas mensuales</li>
            </ul>
            <p className="mt-3 text-[#6b6258]">
              No instalamos cookies de seguimiento, no usamos herramientas de analítica
              (Google Analytics u otras) y no compartimos datos con terceros para
              publicidad. Ver{' '}
              <Link href="/cookies" className="text-[#c9a96e] hover:underline">Política de Cookies</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">3. Finalidad y base jurídica</h2>
            <p>
              Los datos recabados se utilizan exclusivamente para:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Contactar al interesado en relación con la solicitud de demostración del servicio Citalia.</li>
              <li>Recoger feedback sobre el producto durante la fase de validación.</li>
            </ul>
            <p className="mt-3">
              <strong className="text-[#e8dcc8]">Base jurídica:</strong> ejecución de medidas
              precontractuales a petición del interesado (art. 6.1.b RGPD) y, en su caso,
              consentimiento del interesado (art. 6.1.a RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">4. Conservación de los datos</h2>
            <p>
              Los datos se conservan durante el tiempo necesario para gestionar la
              solicitud y mantener el contacto comercial. Si finalmente no hay relación
              comercial, los datos se eliminan a los 12 meses del último contacto, salvo
              que el interesado solicite su supresión anticipada.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">5. Encargados del tratamiento</h2>
            <p>
              Para el funcionamiento del sitio y la gestión de las solicitudes, los datos
              son procesados por los siguientes proveedores:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-[#e8dcc8]">Cloudflare, Inc.</strong> — alojamiento del sitio web y de la función de recepción del formulario.</li>
              <li><strong className="text-[#e8dcc8]">Telegram FZ-LLC</strong> — canal interno por el que el responsable recibe las notificaciones de cada solicitud.</li>
            </ul>
            <p className="mt-3 text-[#6b6258]">
              Ambos proveedores cumplen con el RGPD y, en el caso de Cloudflare, con las
              cláusulas contractuales tipo aprobadas por la Comisión Europea para
              transferencias internacionales de datos.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">6. Derechos del interesado</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a hola@citaliaapp.com:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Acceso a tus datos personales</li>
              <li>Rectificación de datos inexactos</li>
              <li>Supresión ("derecho al olvido")</li>
              <li>Oposición al tratamiento</li>
              <li>Limitación del tratamiento</li>
              <li>Portabilidad de los datos</li>
              <li>Revocación del consentimiento prestado</li>
            </ul>
            <p className="mt-3">
              Si consideras que el tratamiento no se ajusta a la normativa, puedes
              presentar una reclamación ante la Agencia Española de Protección de Datos
              (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#c9a96e] hover:underline">www.aepd.es</a>).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">7. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas para proteger los datos:
              conexión HTTPS forzada, validación server-side de todos los formularios,
              cabeceras de seguridad estrictas, y almacenamiento mínimo (los datos no se
              guardan en base de datos; se reenvían directamente al canal interno y se
              descartan tras el envío).
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
