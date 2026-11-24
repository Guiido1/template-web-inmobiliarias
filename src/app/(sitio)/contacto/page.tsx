import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/config/brand";

export const metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Hablemos
      </h1>
      <p className="mt-2 text-slate-500">
        Dejanos tu consulta y te respondemos por WhatsApp.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
      <p className="mt-6 text-sm text-slate-400">
        {brand.contacto.direccion} · {brand.contacto.telefono}
      </p>
    </main>
  );
}
