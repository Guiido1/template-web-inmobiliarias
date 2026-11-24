import { brand } from "@/config/brand";

export const metadata = { title: "Política de privacidad" };

// Texto base para cumplir con la Ley 25.326 de Protección de Datos
// Personales. Es genérico a propósito: revisarlo con el cliente (y su
// asesor legal si tiene) antes de entregar, sobre todo si se suma algún
// formulario con backend propio o una herramienta de marketing nueva.
export default function PrivacidadPage() {
  const { email } = brand.contacto;

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Política de privacidad
      </h1>
      <div className="prose prose-slate mt-8 max-w-none">
        <p>
          {brand.nombre} respeta la privacidad de quienes visitan este sitio.
          Esta política explica qué datos se recolectan y para qué.
        </p>
        <h2>Qué datos recolectamos</h2>
        <p>
          Los formularios de contacto y el asistente virtual arman un mensaje
          que se envía <strong>desde tu propio WhatsApp</strong>: este sitio no
          guarda tu nombre, teléfono ni consulta en ninguna base de datos. Tus
          propiedades favoritas se guardan solo en tu navegador.
        </p>
        <p>
          Si el sitio tiene activada la analítica (Google Analytics), se
          registran datos de navegación anónimos y agregados (páginas
          visitadas, origen de la visita, tipo de dispositivo) para mejorar el
          sitio.
        </p>
        <h2>Para qué los usamos</h2>
        <p>
          Únicamente para responder tu consulta y ofrecerte propiedades acordes
          a lo que buscás. No vendemos ni cedemos tus datos a terceros.
        </p>
        <h2>Tus derechos</h2>
        <p>
          Podés pedir acceso, rectificación o eliminación de tus datos
          escribiendo a <a href={`mailto:${email}`}>{email}</a>. La Agencia de
          Acceso a la Información Pública, órgano de control de la Ley 25.326,
          atiende denuncias y reclamos relacionados con el incumplimiento de
          las normas de protección de datos personales.
        </p>
        <h2>Responsable</h2>
        <p>
          {brand.nombre} — {brand.contacto.direccion}. Corredor responsable:{" "}
          {brand.matricula.corredor}, {brand.matricula.numero}.
        </p>
      </div>
    </main>
  );
}
